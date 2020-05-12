import * as React from 'react';
import { StyleSheet, View, Text, Image, Dimensions, Linking } from 'react-native';
import { Button } from 'react-native-paper';
import * as Google from 'expo-google-app-auth';
import * as AppAuth from 'expo-app-auth';
import MapView, {Marker} from 'react-native-maps';
import data from "./resources/config/data.json"
import { TouchableOpacity, BorderlessButton } from 'react-native-gesture-handler';
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
    // flexDirection: 'row',
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

  componentDidMount = () => {
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

  // onRegionChange = (region) => {
  //   this.setState({region});
  // }

  render() {
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
            onRegionChange={this.onRegionChange} 
            onPress={e => this.onMapPress(e)}
          >
            {this.state.markers.map(marker => (
              <Marker
                key={marker.key}
                coordinate={marker.coordinate}
                pinColor={marker.color}
                //title={marker.title}
                //description={marker.description}
              />
            ))}
          </MapView>
          <View style={styles.buttonContainer}>
          <TouchableOpacity
              onPress={() => this.setState({markers: []})}
              style={styles.button}
            >
              <Text style={styles.text}>시작</Text>
            </TouchableOpacity>
            
          </View>
        </View>
    );
  }
}