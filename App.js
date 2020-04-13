import React from 'react';
import { DefaultTheme, Button, Provider as PaperProvider } from 'react-native-paper';
import { AppRegistry } from 'react-native';
import Main from './src/Main';
import FirstPage from './src/FirstPage';

const theme = {
  ...DefaultTheme,
  roundness: 3,
  colors: {
    ...DefaultTheme.colors,
    primary: '#D42A7B',
    accent: '#4F3350',
  },
};

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <Main />
      {/* <FirstPage></FirstPage> */}
    </PaperProvider>
  );
}

AppRegistry.registerComponent('app', () => App);
