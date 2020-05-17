import * as React from 'react';
import { Linking, SafeAreaView, ScrollView, TouchableHighlight, StyleSheet, View, Text, Platform, Alert } from 'react-native';
//import { Button } from 'react-native-paper';
//import { Container} from 'native-base';
import moment from "moment";
import * as Location from 'expo-location';
import * as TaskManager from 'expo-task-manager';
import { TouchableOpacity } from 'react-native-gesture-handler';

const LOCATION_TASK_NAME = "background-location-task";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#372D45"
  },
  innerContainer: {
    marginVertical: 30
  },
  title: {
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold"
  },
  repoLink: {
    textAlign: "center",
    fontSize: 12,
    fontWeight: "bold",
    color: "#0000CC",
    textDecorationLine: "underline"
  },
  row: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginTop: 5,
    marginBottom: 5
  },
  detailBox: {
    padding: 15,
    justifyContent: "center"
  },
  button: {
    flex: 1,
    marginHorizontal: 10,
    marginTop: 15,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    padding: 10
  },
  stopButton: {
    width: 100,
    //flexDirection: 'row',
    backgroundColor: 'rgba(0,0,0,1)',
    paddingHorizontal: 15,
    paddingVertical: 20,
    borderRadius: 50,
    //bottom:10,
    //top:Dimensions.get('window').height*(3/4),
    justifyContent: 'flex-end',
    
    alignItems: 'center',
    //alignContent: 'center',
    //zIndex:100,
    //position:'absolute',
  },
  stopButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
  },
  buttonText: {
    fontSize: 30,
    color: "#FFFFFF"
  },
  valueTitle: {
    //fontFamily: "Futura",
    fontSize: 12
  },
  detail: {
    fontSize: 15,
    fontWeight: "bold"
  },
  largeDetail: {
    fontSize: 20
  },
  json: {
    fontSize: 12,
    //fontFamily: "Courier",
    textAlign: "center",
    fontWeight: "bold"
  },
  full: {
    width: "100%"
  },
  half: {
    width: "50%"
  },
  third: {
    width: "33%"
  }
});

TaskManager.defineTask(LOCATION_TASK_NAME, ({ data, error }) => {
  if (error) {
    // Error occurred - check `error.message` for more details.
    return;
  }
  if (data) {
    const { locations } = data;

    const { latitude, longitude, heading, accuracy, speed } = locations[0].coords;
    const timestamp = locations[0].timestamp;
    locationService.setLocation({
      latitude,
      longitude,
      heading,
      accuracy,
      speed,
      timestamp
    })
  }
});

/* PUBLISHER */
const LocationService = () => {
  let subscribers = []
  let location = {
    latitude: 0,
    longitude: 0,
    heading: 0,
    accuracy: 0,
    speed: 0,
    timestamp: 0,
  }

  return {
    subscribe: (sub) => subscribers.push(sub),
    setLocation: (coords) => {
      location = coords
      subscribers.forEach((sub) => sub(location))
    },
    unsubscribe: (sub) => {
      subscribers = subscribers.filter((_sub) => _sub !== sub)
    }
  }
}

export const locationService = LocationService()

export default class BoardPage extends React.Component {
  constructor() {
    super();
    this.state = {
      location: null
    };
  }

  componentDidMount() {
    // RNLocation.configure({
    //   distanceFilter: 5.0
    // });
    
    // RNLocation.requestPermission({
    //   ios: "whenInUse",
    //   android: {
    //     detail: "fine",
    //     rationale: {
    //       title: "Location permission",
    //       message: "We use your location to demo the library",
    //       buttonPositive: "OK",
    //       buttonNegative: "Cancel"
    //     }
    //   }
    // }).then(granted => {
    //   if (granted) {
    //     this._startUpdatingLocation();
    //   }
    // });

    this.getLocation();
  }

  componentWillUnmount = () => {
    locationService.unsubscribe(this.onLocationUpdate);
  }

  getLocation = async () => {
    

    // let {coords, timestamp} = await Location.getCurrentPositionAsync({});
    // console.log(coords);
    // this.setState({
    //   location : coords,
    //   heading: coords.heading,
    // })
    locationService.subscribe(this.onLocationUpdate);

    try {
      const hasLocationPermission = await this.hasLocationPermission();
      if (!hasLocationPermission) return;
      let { status } = await Location.requestPermissionsAsync();
      
      //check the location setting
      const permissionStatus = await Location.getProviderStatusAsync();
      const newStatus = permissionStatus.locationServicesEnabled;

      //if phone location is disabled
      if (!newStatus) {
        const { navigation } = this.props;
        Alert.alert(
          "Error",
          "Please Turn On you'r Location",
          [
            {
              text: "OK",
              onPress: this.openSetting
            }
          ],
          { cancelable: false }
        );
      }
      // if location setting is enabled
      else {
        //if status is granted or not
        if (status !== "granted") {
          this.setState({
            errorMessage: "Permission to access location was denied"
          });
          return;
        } else {
          await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
            accuracy: Location.Accuracy.BestForNavigation,
            timeInterval: 500,
            distanceInterval: 0
          });
        }
      }
    } catch (error) {
      let status = await Location.getProviderStatusAsync();
      if (!status.locationServiceEnabled) {
        const { navigation } = this.props;
        navigation.navigate("Site");
        // console.log(error);
      }
    }
  }

  hasLocationPermission = async () => {
    if (Platform.OS === 'android' && Platform.Version <30) {
      return true;
    }
  }

  _startUpdatingLocation = () => {
    this.locationSubscription = RNLocation.subscribeToLocationUpdates(
      locations => {
        this.setState({ location: locations[0] });
      }
    );
  };

  _stopUpdatingLocation = () => {
    //this.locationSubscription && this.locationSubscription();
    locationService.unsubscribe(this.onLocationUpdate);
    //this.setState({ location: null });
  };

  onLocationUpdate = ({ latitude, longitude, heading, accuracy, speed, timestamp }) => {
    this.setState({
      location: {
        latitude: latitude,
        longitude: longitude,
        heading: heading,
        accuracy: accuracy,
        speed: speed,
        timestamp: timestamp,
      }
    })
  }

  render() {
    const { location } = this.state;
    return (
      <ScrollView style={styles.container}>
        <SafeAreaView style={styles.innerContainer}>
        {location && (
          <View style={{ alignItems: "flex-start" }}>
            <View style={styles.row}>
              <View style={[styles.detailBox, styles.half]}>
                <Text style={styles.valueTitle}>페이스</Text>
                <Text style={styles.detail}>{location.latitude}</Text>
              </View>

              <View style={[styles.detailBox, styles.half]}>
                <Text style={styles.valueTitle}>시간</Text>
                <Text style={styles.detail}>{location.longitude}</Text>
              </View>
            </View>
          </View>
        )}
          <View style={styles.row}>
            <TouchableHighlight
              onPress={this.getLocation}
              style={[styles.button, { backgroundColor: "#126312" }]}
            >
              <Text style={styles.buttonText}>Start</Text>
            </TouchableHighlight>

            <TouchableHighlight
              onPress={this._stopUpdatingLocation}
              style={[styles.button, { backgroundColor: "#881717" }]}
            >
              <Text style={styles.buttonText}>Stop</Text>
            </TouchableHighlight>
          </View>

          {location && (
            <React.Fragment>
              <View style={styles.row}>
                <View style={[styles.detailBox, styles.third]}>
                  <Text style={styles.valueTitle}>Course</Text>
                  <Text style={[styles.detail, styles.largeDetail]}>
                    {location.course}
                  </Text>
                </View>

                <View style={[styles.detailBox, styles.third]}>
                  <Text style={styles.valueTitle}>Speed</Text>
                  <Text style={[styles.detail, styles.largeDetail]}>
                    {location.speed}
                  </Text>
                </View>

                <View style={[styles.detailBox, styles.third]}>
                  <Text style={styles.valueTitle}>Altitude</Text>
                  <Text style={[styles.detail, styles.largeDetail]}>
                    {location.altitude}
                  </Text>
                </View>
              </View>

              <View style={{ alignItems: "flex-start" }}>
                <View style={styles.row}>
                  <View style={[styles.detailBox, styles.half]}>
                    <Text style={styles.valueTitle}>Latitude</Text>
                    <Text style={styles.detail}>{location.latitude}</Text>
                  </View>

                  <View style={[styles.detailBox, styles.half]}>
                    <Text style={styles.valueTitle}>Longitude</Text>
                    <Text style={styles.detail}>{location.longitude}</Text>
                  </View>
                </View>

                <View style={styles.row}>
                  <View style={[styles.detailBox, styles.half]}>
                    <Text style={styles.valueTitle}>Accuracy</Text>
                    <Text style={styles.detail}>{location.accuracy}</Text>
                  </View>

                  <View style={[styles.detailBox, styles.half]}>
                    <Text style={styles.valueTitle}>Altitude Accuracy</Text>
                    <Text style={styles.detail}>
                      {location.altitudeAccuracy}
                    </Text>
                  </View>
                </View>

                <View style={styles.row}>
                  <View style={[styles.detailBox, styles.half]}>
                    <Text style={styles.valueTitle}>Timestamp</Text>
                    <Text style={styles.detail}>{location.timestamp}</Text>
                  </View>

                  <View style={[styles.detailBox, styles.half]}>
                    <Text style={styles.valueTitle}>Date / Time</Text>
                    <Text style={styles.detail}>
                      {moment(location.timestamp).format("MM-DD-YYYY h:mm:ss")}
                    </Text>
                  </View>
                </View>
              </View>
              <TouchableOpacity
                onPress={this._stopUpdatingLocation}
                style={styles.stopButton}
              >
                <Text style={styles.stopButtonText}>||</Text>
              </TouchableOpacity>
            </React.Fragment>
          )}
        </SafeAreaView>
      </ScrollView>
    );
  }
}