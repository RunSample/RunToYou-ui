import * as React from 'react';
import { StyleSheet, View, Image, Dimensions } from 'react-native';
import { Button } from 'react-native-paper';

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
  button: {
    flexDirection: 'row',
    width:200,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
});

export default class MapViewPage extends React.Component {

  render() {
    return (
        <View style={styles.container}>
          <Button style={styles.button} 
            raised theme={{ roundness: 3 }}
            icon="run-fast" mode="contained" onPress={()=>{alert('기대하지마요')}}>
            LET`S RUNNING
          </Button>
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