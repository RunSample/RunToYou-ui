import React from 'react';
import { StyleSheet, Text, View, Button, Alert, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

function DetailsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Details!</Text>
      <Button
        title="Logout"
        onPress={() => navigation.navigate('Home')}
      />
    </View>
  );
}

function HomeScreen({ navigation }) {
  let session = false;

  function loginCheck (value) {
    if(value == 'admin'){
      return true;
      
    }else{
      return false;
    }
  }
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>ID</Text>
      <TextInput
        maxLength = {10}
        placeholder = {'아이디를 입력하세요'}
        onChangeText={(value) => {
          session = loginCheck(value)
        }}
      ></TextInput>
      <Text>PW</Text>
      <TextInput
        maxLength = {10}
        placeholder = {'비밀번호를 입력하세요'}
        textContentType = {"password"}
      ></TextInput>
      <Button
        title="Login"
        onPress={() => {
          session 
            ? (navigation.navigate('Details'))
            : (navigation.navigate('Home'))
          }
        }
      />
    </View>
  );
}

function SettingsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
      />
    </View>
  );
}

const HomeStack = createStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen name="Details" component={DetailsScreen} />
    </HomeStack.Navigator>
  );
}

const SettingsStack = createStackNavigator();

function SettingsStackScreen() {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen name="Settings" component={SettingsScreen} />
      <SettingsStack.Screen name="Details" component={DetailsScreen} />
    </SettingsStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeStackScreen} />
        <Tab.Screen name="Settings" component={SettingsStackScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}