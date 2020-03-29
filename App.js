import React from 'react';
import { StyleSheet, Text, View, Button, Alert, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


const Tab = createBottomTabNavigator();

export default function App() {

  function DetailsScreen({ navigation }) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Details!</Text>
      </View>
    );
  }
    
  function HomeScreen({ navigation }) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      </View>
    );
  }

  function SettingsScreen({ navigation }) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Settings screen</Text>
      </View>
    );
  }

  function RunScreen({ navigation }) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Run screen</Text>
      </View>
    );
  }

  function FriendsScreen({ navigation }) {

    React.useLayoutEffect(() => {
      navigation.setOptions({
        headerRight: () => (
          <Button 
            title="Logout"
            onPress={() => navigation.navigate('Details')}
          />
        ),
      });
    }, [navigation]);

    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Friends</Text>
      </View>
    );
  }

  const HomeStack = createStackNavigator();
  function HomeStackScreen() {
    return (
      <HomeStack.Navigator>
        <HomeStack.Screen name="Home" component={HomeScreen} />
      </HomeStack.Navigator>
    );
  }

  const SettingsStack = createStackNavigator();
  function SettingsStackScreen() {
    return (
      <SettingsStack.Navigator>
        <SettingsStack.Screen name="Settings" component={SettingsScreen} />
      </SettingsStack.Navigator>
    );
  }

  const FriendsStack = createStackNavigator();
  function FriendsStackScreen() {
    return (
      <FriendsStack.Navigator>
        <FriendsStack.Screen name="Friends" component={FriendsScreen} />
        <FriendsStack.Screen name="Details" component={DetailsScreen} />
      </FriendsStack.Navigator>
    );
  }

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeStackScreen} />
        <Tab.Screen name="Friends" component={FriendsStackScreen} />
        <Tab.Screen name="Run" component={RunScreen} />
        <Tab.Screen name="Settings" component={SettingsStackScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}