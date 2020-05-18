import * as React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { Text, View, StyleSheet, Image } from 'react-native';

const styles = StyleSheet.create({
top: {
    //flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    height: '70%'
},
bottom: {
    //flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: '10%'
},
footer:{
  alignItems: 'center',
  justifyContent: 'flex-start',
  height: '20%'
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
},
linearGradient: {
  paddingLeft: 15,
  paddingRight: 15,
  width:350,
  height:50,
  borderRadius: 30
},
buttonText: {
  fontSize: 25,
  textAlign: 'center',
  margin: 10,
  color: '#ffffff',
  backgroundColor: 'transparent',
},
backPage:{
  flex: 1,
  height:'100%'
},

});

export default function FirstPage() {
  return (
    <View style={styles.backPage}>
      <LinearGradient colors={['#24243e', '#3c1053']} style={styles.container}>
        <View style={styles.top}>
          <Image
            style={{
              resizeMode: "stretch",
              height: 380,
              width: 280,
            }}
            source={require("./resources/images/runtoyou_logo_1.png")}
          />
        </View>
        <View style={styles.bottom}></View>
        <View style={styles.footer}>
          <LinearGradient
            start={{x: 0, y: 0}} 
            end={{x: 1, y: 0}} 
            colors={['#61045F', '#ee0979']}
            style={styles.linearGradient}
            >
            <Text style={styles.buttonText}>
              LET'S RUNNING
            </Text>
          </LinearGradient>
        </View>
      </LinearGradient> 
    </View>
  );
}
