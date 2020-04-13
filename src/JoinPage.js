import * as React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { Text, View, TouchableHighlight, StyleSheet, Image, ImageBackground, TextInput, Button } from 'react-native';

const styles = StyleSheet.create({
  header: {
    height:'10%',
    width: '100%'
  },
  bgImage: {
    width: '100%', height: '100%'},
  top: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  bottom: {
    height: '35%' ,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  linearGradient: {
    paddingLeft: 15,
    paddingRight: 15,
    marginTop:300,
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
   height: '100%'
  },
  middlePage:{
    height: '55%'
  },

  buttonBox:{
    marginRight:40,
    marginLeft:40,
    marginTop:10,
    paddingTop:20,
    paddingBottom:20,
    backgroundColor:'#61045F',
    borderRadius:10,
    borderWidth: 1,
    width:300
  },
  buttonText:{
    textAlign:'center',
    fontWeight: 'bold'
  },
  logo:{
    width : 100,
    height: 100,
  }
});

export default function JoinPage() {
  return (
    <View style={styles.backPage} >
        
        <ImageBackground 
          style={styles.bgImage} 
          source={require("./resources/images/joinTestImg.jpg")} //이미지경로 
          resizeMode="cover" // 'cover', 'contain', 'stretch', 'repeat', 'center' 중 선택 
        >
          <View style={styles.header}>
            <Image
              style={styles.logo}
              source={require("./resources/images/runtoyou_logo_2.png")}
            />
          </View>

          <View
            style={styles.middlePage}
          >
          </View>

          <View style={styles.bottom}>

            <TouchableHighlight
              style={[styles.buttonBox, {backgroundColor :'#FFFF00'}]}
              //onPress={() => this.submitSuggestion(this.props)}
              underlayColor='#FFFF00'
            >
              <Text style={styles.buttonText}>KAKAO</Text>
            </TouchableHighlight>

            <TouchableHighlight
              style={[styles.buttonBox, {backgroundColor :'#04B404'}]}
              underlayColor='#04B404'
            >
              <Text style={styles.buttonText}>NAVER</Text>
            </TouchableHighlight>

            <TouchableHighlight
              style={[styles.buttonBox, {backgroundColor :'#FFFFFF'}]}
              underlayColor='#61045F'
            >
              <Text style={styles.buttonText}>GOOGLE</Text>
            </TouchableHighlight>

          </View>
        </ImageBackground>
    </View>
  );
}
