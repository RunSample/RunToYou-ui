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
      { key: 'friends', title: 'Friends', icon: 'queue-music' },
      { key: 'albums', title: 'Albums', icon: 'album' },
      { key: 'boards', title: 'Boards', icon: 'history' },
      { key: 'setup', title: 'Setup', icon: 'setup' },
    ],
  };

  _handleIndexChange = index => this.setState({ index });

  _renderScene = BottomNavigation.SceneMap({
    friends: FriendsRoute,
    albums: MapViewRoute,
    boards: BoardRoute,
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