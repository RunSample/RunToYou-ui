import * as React from 'react';
import { View } from 'native-base';
import {StyleSheet, Image, Text, TextInput, Button, CheckBox , Alert } from 'react-native';
import axios from 'axios';
import { useRef } from 'react';
// import { Checkbox } from 'react-native-paper';

const styles = StyleSheet.create({
    page : {
        flex: 1,
        height:'100%',
        width : '100%'
    },
    top : {
        height: '5%',
        flex : 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'stretch',
    },
    middle : {
        height: '85%',
        width: '80%',
        flex : 4,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'stretch',
        alignSelf: "center",
        marginTop : '10%'
    },
    bottom : {
        height: '10%',
        flex : 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'stretch',
        marginTop : '10%'
    },
    text : {
        fontWeight : 'bold', 
        marginTop : 10
    },
    checkboxContainer: {
        flexDirection: "row",
        marginBottom: 10,
    },
    checkbox: {
        alignSelf: "center",
        marginLeft : 8
    },
    label: {
        margin: 8,
    },
    fixToText: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    inputBox: {
        borderStyle : 'solid',
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
  
function PhoneTextInput(props) {
    return (
        <TextInput
        // style={[styles.inputBox]}
        {...props} 
        editable
        maxLength={15}
        />
    );
}

function CancelClick(){
        console.log('CANCEL CLICK');
    }

export default function JoinPage(){
    //관심사
    const [isSelected1, setSelection1] = React.useState(false);
    const [isSelected2, setSelection2] = React.useState(false);
    const [isSelected3, setSelection3] = React.useState(false);
    const [isSelected4, setSelection4] = React.useState(false);

    //활동지역
    const [isSelected5, setSelection5] = React.useState(false);
    const [isSelected6, setSelection6] = React.useState(false);
    const [isSelected7, setSelection7] = React.useState(false);
    const [isSelected8, setSelection8] = React.useState(false);
    const [isSelected9, setSelection9] = React.useState(false);
    const [isSelected10, setSelection10] = React.useState(false);

    //아이디
    const [idText, setIdText] = React.useState();

    //휴대폰 번호
    const [phoneText, setPhoneText] = React.useState();

    function JoinClick(){
        console.log('JOIN IN CLICK');
        console.log(idText);
        console.log(phoneText);
    
        //axios.get
    }
    

    return(
        <View style={styles.page}>
            <View style={styles.top}>
                <Image
                    style={{
                    resizeMode: "stretch",
                    height: 230,
                    width: 150,
                    }}
                    source={require("./resources/images/runtoyou_logo_2.png")}
                />
            </View>
            <View style={styles.middle}>
                <View style={{marginBottom : '-5%' , height : '60%'}}>
                    <Image style={{
                        resizeMode: "stretch",
                        height : '60%',
                        width: '100%',
                        }}
                        source={require("./resources/images/emptyProfile.png")}
                    />
                    <Button
                        title="+ 사진등록"
                        color="#ee0979"
                        onPress={() => Alert.alert('Button with adjusted color pressed')}
                    />
                </View>
                <Text style={styles.text}>아이디</Text>
                <IdTextInput
                    value={idText}
                    onChangeText={setIdText}
                />
                <Text style={styles.text}>휴대폰번호</Text>
                <PhoneTextInput
                    onChangeText={setPhoneText}
                    value={phoneText}
                />
                <Text style={styles.text}>관심사</Text>
                <View>
                    <View style={styles.checkboxContainer}>
                        <CheckBox
                            value={isSelected1}
                            onValueChange={setSelection1}
                            style={styles.checkbox}
                        />
                        <Text style={styles.label}>달리기</Text>
                        <CheckBox
                            value={isSelected2}
                            onValueChange={setSelection2}
                            style={styles.checkbox}
                        />
                        <Text style={styles.label}>친목</Text>
                        <CheckBox
                            value={isSelected3}
                            onValueChange={setSelection3}
                            style={styles.checkbox}
                        />
                        <Text style={styles.label}>연애</Text>
                        <CheckBox
                            value={isSelected4}
                            onValueChange={setSelection4}
                            style={styles.checkbox}
                        />
                        <Text style={styles.label}>결혼</Text>
                    </View>
                </View>
                <Text style={styles.text}>활동지역</Text>
                <View>
                    <View style={styles.checkboxContainer}>
                        <CheckBox
                            value={isSelected5}
                            onValueChange={setSelection5}
                            style={styles.checkbox}
                        />
                        <Text style={styles.label}>서울</Text>
                        <CheckBox
                            value={isSelected6}
                            onValueChange={setSelection6}
                            style={styles.checkbox}
                        />
                        <Text style={styles.label}>경기</Text>
                        <CheckBox
                            value={isSelected7}
                            onValueChange={setSelection7}
                            style={styles.checkbox}
                        />
                        <Text style={styles.label}>대전</Text>
                        <CheckBox
                            value={isSelected8}
                            onValueChange={setSelection8}
                            style={styles.checkbox}
                        />
                        <Text style={styles.label}>대구</Text>
                        <CheckBox
                            value={isSelected9}
                            onValueChange={setSelection9}
                            style={styles.checkbox}
                        />
                        <Text style={styles.label}>부산</Text>
                    </View>
                </View>
                <View style={styles.bottom}>
                    <View style={styles.fixToText}>
                        <Button
                            title="JOIN IN"
                            color="#ee0979"
                            onPress={JoinClick}
                        />
                        <Button
                            title="CANCEL"
                            onPress={CancelClick}
                        />
                    </View>
                </View>
            </View>
            <View style={styles.bottom}></View>
        </View>
    );
}