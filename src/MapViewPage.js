import * as React from 'react';
import { StyleSheet, View, Text, Image, Dimensions, Linking, Platform, PermissionsAndroid } from 'react-native';
import { Button } from 'react-native-paper';
import * as Google from 'expo-google-app-auth';
import * as AppAuth from 'expo-app-auth';
import MapView, {Marker} from 'react-native-maps';
import data from "./resources/config/data.json"
import { TouchableOpacity, BorderlessButton } from 'react-native-gesture-handler';
import MyLocationMapMarker from './components/MyLocationMapMarker';
import Geolocation from 'react-native-geolocation-service'
import * as Location from 'expo-location';
//import { GoogleSigninButton } from '@react-native-community/google-signin';

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    //backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height*(5/5),
  },
  mapMarker: {
    zIndex: 1000,
  },
  markerContainer: {
    width: HEADING_BOX_SIZE,
    height: HEADING_BOX_SIZE,
  },
  markerHalo: {
    position: 'absolute',
    backgroundColor: 'white',
    top: 0,
    left: 0,
    width: HALO_SIZE,
    height: HALO_SIZE,
    borderRadius: Math.ceil(HALO_SIZE / 2),
    margin: (HEADING_BOX_SIZE - HALO_SIZE) / 2,
    shadowColor: 'black',
    shadowOpacity: 0.25,
    shadowRadius: 2,
    shadowOffset: {
      height: 0,
      width: 0,
    },
  },
  marker: {
    justifyContent: 'center',
    backgroundColor: colorOfmyLocationMapMarker,
    width: SIZE,
    height: SIZE,
    borderRadius: Math.ceil(SIZE / 2),
    margin: (HEADING_BOX_SIZE - SIZE) / 2,
  },
  markerText: { 
    width: 0, height: 0 
  },
  heading: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: HEADING_BOX_SIZE,
    height: HEADING_BOX_SIZE,
    alignItems: 'center',
  },
  headingPointer: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderTopWidth: 0,
    borderRightWidth: ARROW_SIZE * 0.75,
    borderBottomWidth: ARROW_SIZE,
    borderLeftWidth: ARROW_SIZE * 0.75,
    borderTopColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: colorOfmyLocationMapMarker,
    borderLeftColor: 'transparent',
  },
  button: {
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
  bubble: {
    backgroundColor: 'rgba(0,0,0,1)',
    paddingHorizontal: 20,
    paddingVertical: 25,
    borderRadius: 60,
  },
  buttonContainer: {
    position:'absolute',
    top:'88%',
    flexDirection: 'row',
    // marginVertical: 20,
    // backgroundColor: 'transparent',
  },
  text: {
    color: '#D42A7B',
    fontSize: 20,
  }
});

const {width, height} = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 37.543162;
const LONGITUDE = 127.016427;
const LATITUDE_DELTA = 0.0122;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const SIZE = 35;
const HALO_RADIUS = 6;
const ARROW_SIZE = 7;
const ARROW_DISTANCE = 6;
const HALO_SIZE = SIZE + HALO_RADIUS;
const HEADING_BOX_SIZE = HALO_SIZE + ARROW_SIZE + ARROW_DISTANCE;
const ANCHOR = { x: 0.5, y: 0.5 };
const colorOfmyLocationMapMarker = 'blue';
let id = 0;

function randomColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6,0)}`;
}

export default class MapViewPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSigninInProgress: false,
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
      markers: [],
      coordinate: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        
      },
      amount: 0,
      heading: 10,
      enableHack: false,
    }
  }
  
  onMapPress = (e) => {
    this.setState({
      markers: [
      ...this.state.markers,
      {
        coordinate: e.nativeEvent.coordinate,
        key: id++,
        color: randomColor(),
      },
    ],
    });
  }

  getLocation = async () => {
    const hasLocationPermission = await this.hasLocationPermission();
    if (!hasLocationPermission) return;
    let { status } = await Location.requestPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
    }

    let {coords, timestamp} = await Location.getCurrentPositionAsync({});
    console.log(coords);
    this.setState({
      coordinate : {
        latitude: coords.latitude,
        longitude: coords.longitude,
        
      },
      heading: coords.heading,
    })
  }

  hasLocationPermission = async () => {
    if (Platform.OS === 'android' && Platform.Version <30) {
      return true;
    }
  }

  componentDidMount = () => {
    // if (Platform.OS === 'android') {
    //   //Location.requestPermissionsAsync();
    //   PermissionsAndroid.requestPermission(
    //     PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    //   ).then(granted => {
    //     if (granted) {
    //       Geolocation.getCurrentPosition(
    //         (position) => {
    //           console.log(position);
              
    //         },
    //         (error) => {alert('position');
    //           console.log(error.code, error.message);
    //         },
    //         {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000}
    //       )
    //     }
    //   });
    // }
    this.getLocation();
    //GoogleSignin.configure();
  }

  googleLogin = async (params) => {
    const config = {
      androidClientId: data.googleLoginConfig.clientId,
      androidStandaloneAppClientId: data.googleLoginConfig.clientId,
      clientId: data.googleLoginConfig.clientId,
      redirectUrl: `${AppAuth.OAuthRedirect}:/oauth2redirect/google`,
      scopes: ['profile', 'email'],
    }
    const { type, accessToken, user } = await Google.logInAsync(config);
    if (type === 'success') {
      // Then you can use the Google REST API
      let userInfoResponse = await fetch('https://www.googleapis.com/userinfo/v2/me', {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
    }
  }

  _callGoogleLogin = async () => {
    await fetch(data.googleLoginConfig.ec2AuthUrl).then((response)=> {
      console.log(response.user);
    });
  }

  // getInitialState() {
  //   return {
  //     region: {
  //       latitude: 37.543162,
  //       longitude: 127.016427,
  //       latitudeDelta: 0.0122,
  //       longitudeDelta: 0.0121,
  //     }
  //   };
  // }

  onRegionChange = (region) => {
    this.setState({region});
  }
  increment() {
    this.setState((prevState) => ({ heading: prevState.heading + 10 }));
  }

  decrement() {
    this.setState((prevState) => ({ heading: prevState.heading - 10 }));
  }

  toggleHack() {
    this.setState({ enableHack: !this.state.enableHack });
  }

  render() {
    //const rotate = typeof heading === 'number' && heading >= 0 ? `${heading}deg` : null;
    return (
        <View style={styles.container}>
          {/* <Button style={styles.button} 
            raised theme={{ roundness: 3 }}
             mode="contained" onPress={this.googleLogin}>
            <Text style={styles.text}>시작</Text>
          </Button> */}
          {/* <Button style={styles.button} 
            raised theme={{ roundness: 3 }}
            icon="run-fast" mode="contained" onPress={this._callGoogleLogin}>
            Google SignIn(server)
          </Button> */}
          {/* <GoogleSigninButton
            style={{ width: 192, height: 48 }}
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Dark}
            onPress={this._signIn}
            disabled={this.state.isSigninInProgress} /> */}
          {/* <Image
            style={{
              resizeMode: "stretch",
              height: 400,
              width: 400
            }}
            source={require("./resources/images/tmpMap.png")}
          /> */}
          <MapView style={styles.mapStyle} 
            region={this.state.region}
            //onRegionChange={this.onRegionChange}
            //initialRegion={this.state.region}
            onPress={e => this.onMapPress(e)}
          >
            <MyLocationMapMarker
              coordinate={this.state.coordinate}
              heading={this.state.heading}
              enableHack={this.state.enableHack}
            />
            {this.state.markers.map(marker => (
              <Marker
                style={styles.mapMarker}
                key={marker.key}
                coordinate={marker.coordinate}
                pinColor={marker.color}
                //anchor={ANCHOR}
              >
              </Marker>
            ))}
          </MapView>
          <View style={styles.buttonContainer}>
          <TouchableOpacity
              onPress={() => this.decrement()}
              style={styles.button}
            >
              <Text style={styles.text}>-</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.setState((prevState)=>({
                markers: [],
                enableHack: !prevState.enableHack
              }))}
              style={styles.button}
            >
              <Text style={styles.text}>
                {this.state.enableHack ? 'Disable Hack' : 'Enable Hack'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.increment()}
              style={styles.button}
            >
              <Text style={styles.text}>+</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={this.googleLogin}
              style={styles.button}
            >
              <Text style={styles.text}>login</Text>
            </TouchableOpacity>
            
          </View>
        </View>
    );
  }
}