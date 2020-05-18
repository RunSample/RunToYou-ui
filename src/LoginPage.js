import * as React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { Text, View, TouchableHighlight, StyleSheet, Image, ImageBackground, TextInput, Button } from 'react-native';
import { CheckBox } from 'react-native-elements';
import { checkBox } from 'react-native-check-box';

const styles = StyleSheet.create({
  header: {
    height:'33%',
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
    height: '33%' ,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  backPage:{
   height: '100%'
  },
  middlePage:{
    height: '34%',
    width: '40%',
    marginLeft : '15%'
  },
  buttonBox:{
    marginRight:40,
    marginLeft:40,
    marginTop: 10,
    paddingTop:10,
    paddingBottom:10,
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
  },
  inputBox : {
    borderBottomWidth: 2,
    width:300,
    borderColor: 'gray',
    height:20,
    marginTop: 5
  },
  idPwBox : {
    marginLeft: '30%',
  },
  buttonText: {
    fontSize: 15,
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
  linearGradient: {
    paddingLeft: 15,
    paddingRight: 15,
    width:300,
    height:40,
    borderRadius: 30,
    marginTop : '2%'
  },
  infoSaveBtn: {
    backgroundColor : '#00ff0000'
  }
});



function IdTextInput(props) {
  return (
    <TextInput
      style={styles.inputBox}
      {...props} 
      editable
      maxLength={15}
    />
  );
}

function PwTextInput(props) {
  return (
    <TextInput
      secureTextEntry={true}
      style={[styles.inputBox]}
      {...props} 
      editable
      maxLength={15}
    />
  );
}

export default function LoginPage() {
  const [ checked , setChecked ] = React.useState(false);

  return (
    <View style={styles.backPage} >
        
        <ImageBackground 
          style={styles.bgImage} 
          source={require("./resources/images/KakaoTalk_20200426_121712515.jpg")}
          resizeMode="cover" 
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
              <View 
              style={{ marginTop : '40%'}}
              >
                <Text style={{fontWeight : 'bold'}}>아이디</Text>
                <IdTextInput
                  // onChangeText={text => onIdChangeText(text)}
                  // value={value}
                />
                <Text style={{fontWeight : 'bold', marginTop : 10}}>비밀번호</Text>
                <PwTextInput
                  //onChangeText={text => onPwChangeText(text)}
                  //value={value}
                />
                <View style={{marginLeft : '20%'}}>
                  <CheckBox
                    right
                    title='정보저장'
                    checked={checked}
                    checkedColor={'purple'}
                    onPress={() => checked ? setChecked(false) :  setChecked(true) }
                    //style={styles.infoSaveBtn}
                    containerStyle={styles.infoSaveBtn}
                  />
                </View>
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
