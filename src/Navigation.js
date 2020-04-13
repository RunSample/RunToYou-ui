import * as React from 'react';
import { BottomNavigation, Text } from 'react-native-paper';
import { StyleSheet, View, Dimensions } from 'react-native';
import MapViewPage from './MapViewPage';
import BoardPage from './BoardPage';


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

const FriendsRoute = () => <Text>Friends List</Text>;

const MapViewRoute = () => {
  return (
    <MapViewPage />
  )
};

const BoardRoute = () => {
  return (
    <BoardPage />
  )
};

const SetupRoute = () => <Text>Setup</Text>;

export default class Navigation extends React.Component {
  state = {
    index: 0,
    routes: [
      { key: 'home', title: 'Home', icon: 'home' },
      { key: 'running', title: 'Running', icon: 'run-fast' },
      { key: 'friends', title: 'Boards', icon: 'account-multiple' },
      { key: 'setup', title: 'Setup', icon: 'account' },
    ],
  };

  _handleIndexChange = index => this.setState({ index });

  _renderScene = BottomNavigation.SceneMap({
    home: BoardRoute,
    running: MapViewRoute,
    friends: FriendsRoute,
    setup: SetupRoute,
  });

  render() {
    return (
      <BottomNavigation
        navigationState={this.state}
        onIndexChange={this._handleIndexChange}
        renderScene={this._renderScene}
        labeled={false}
      />
    );
  }
}