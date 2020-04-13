import React, { useState, useEffect } from 'react';
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
  const [isLoding, setIsLoding] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoding(false); // count is 0 here
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <PaperProvider theme={theme}>
      {isLoding ? <FirstPage /> : <Main />}
      
    </PaperProvider>
  );
}

AppRegistry.registerComponent('app', () => App);
