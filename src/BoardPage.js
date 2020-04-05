import * as React from 'react';
import { StyleSheet, View, Image, Dimensions, Text, TextInput } from 'react-native';
import { Button } from 'react-native-paper';
import { Container} from 'native-base';

export default class BoardPage extends React.Component {

  render() {
    //const [value, onChangeText] = React.useState('Useless Placeholder');
    return (
      <Container>
        <View style={{paddingHorizontal:10, paddingVertical:10}}>
          <TextInput></TextInput>
          <Text style={{fontWeight:'bold'}}>dddddddd</Text>
          <Text>Lark | Computer Jock | Commercial Pilot</Text>
          <Text>www.steemit.com/@anpigon</Text>
        </View>
      </Container>
    );
  }
}