import * as React from 'react';
import Navigation from './Navigation';
import { Button, Appbar } from 'react-native-paper';
import { Text, View } from 'react-native';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  bottom: {
    position: 'relative',
    left: 0,
    right: 0,
    top: 0,
    height: 40,
    
    //flex: 1,
  },
  view: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  button: {
  },
  naviation: {
  },
  text: {
    justifyContent: 'center',
    alignItems: 'center',
  }
});



export default function Main() {
  function _goBack() {console.log('Went back');}

  function _handleSearch() {console.log('Searching');}

  function _handleMore() {console.log('Shown more');}

  return (
    <View style={styles.view}>
      <Appbar.Header>
        <Appbar.BackAction
          onPress={_goBack}
        />
        <Appbar.Content title="RunToYou" subtitle="Run with friends" />
        <Appbar.Action icon="magnify" onPress={_handleSearch} />
        <Appbar.Action icon="dots-vertical" onPress={_handleMore} />
      </Appbar.Header>
      <Text onTextLayout={{ x: 10, y: 10, width: 20}} >dd</Text>
      <Button style={styles.button} 
        raised theme={{ roundness: 3 }}>
        LET`S RUNNING
      </Button>
      <Navigation style={styles.naviation} />
    </View>
  );
}
