import * as React from 'react';
import { StyleSheet, View, Image, Dimensions } from 'react-native';
//import MapView from 'react-native-maps';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

export default class MapViewPage extends React.Component {

  render() {
    return (
        <View style={styles.container}>
            {/* <MapView style={styles.mapStyle} /> */}
            <Image
              style={{
                resizeMode: "stretch",
                height: 400,
                width: 400
              }}
              source={require("./resources/images/tmpMap.png")}
        />
        </View>
    );
  }
}