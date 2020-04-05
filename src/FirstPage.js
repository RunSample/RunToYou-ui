import * as React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { Text, View, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
top: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end'
},
bottom: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start'
},
main: {
    fontSize: 50,
    marginBottom:10,
    fontWeight: '600'
},
temp: {
    fontSize: 30
},
container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    },
    text: {
    fontSize:50,
    color: 'white'
    }
});

export default function FirstPage() {
  return (
    <LinearGradient colors={['#24243e', '#3c1053']} style={styles.container}>
      <View style={styles.top}>
      </View>
      <View style={styles.bottom}>
        <LinearGradient
          colors={['#a80077', '#ee0979']}
          style={{ padding: 15, alignItems: 'center', borderRadius: 30 }}>
          <Text
            style={{
              backgroundColor: 'transparent',
              fontSize: 15,
              color: '#fff',
            }}>
            LET'S RUNNING
          </Text>
        </LinearGradient>
      </View>
    </LinearGradient> 
  );
}
