'use strict';
import React, { Component } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  AsyncStorage
} from 'react-native';

import Firebase from 'firebase';
import Emoji from 'react-native-emoji';
import Button from './Button';

export default class PhoneNumberLoginWrapper extends Component {
  state = {
      firebase: new Firebase('https://gimmie.firebaseio.com/users'),
      phoneNumber: ''
  };

  componentDidMount() {
    AsyncStorage.getItem('user').then((value) => console.log(value));
  }

  onSignUpPress = () => {
    if (this.state.phoneNumber !== '') {
      const strippedNum = this.state.phoneNumber.replace(/-|\s|\(|\)/g,"");
      console.log('strippedNum', strippedNum);

      const ranNum = randomNumber(4);

      fetch(`http://localhost:3000/message/1${strippedNum}/${this.props.name}/${ranNum}`)
        .then((res) => {
          console.log(res);
            this.state.firebase.push({
                name: this.props.name,
                phoneNumber: this.state.phoneNumber,
                verificationCode: ranNum,
                created_at: new Date()
            });

            this.props.navigator.push({
                name: 'verificationCode',
                passProps: {
                    code: ranNum
            }
            });
        })
        .then((resJSON) => {
          console.log(resJSON);
        });
    }
  };

  render() {
        return (
            <PhoneNumberLogin
                name={this.props.name}
                phoneNumber={this.state.phoneNumber}
                onSignUpPress={this.onSignUpPress}
                onChangeText={(text) => this.setState({phoneNumber: text})}
            />
        );
    }
}

function PhoneNumberLogin(props) {
    return (
        <View style={styles.container}>
          <Text><Emoji name='wave'/> Hi {props.name}!</Text>
          <Text>What Is Your Phone Number</Text>
          <Text>We promise we'll never spam you! This just makes it easy for you to use your contacts list, and request photos/videos that way.</Text>
          <View style={styles.numberInputWrapper}>
            <Text style={styles.flag}><Emoji name='flag-us'/> +1</Text>
            <TextInput
              style={styles.input}
              autoFocus={true}
              value={props.phoneNumber}
              keyboardType='phone-pad'
              placeholder='5551235678'
              maxLength={10}
              onChangeText={props.onChangeText}
              />
          </View>

          {/* <Text style={styles.label}>{this.state.errorMessage}</Text> */}
          <Button text={'Send Code'} onPress={props.onSignUpPress} />
        </View>
    )
}

function randomNumber(numberOfDigits) {
    let verificationCode = '';

    for (let i = 0; i < numberOfDigits; i++) {
        verificationCode += Math.floor((Math.random() * 9) + 1).toString();
    }

    return verificationCode;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  numberInputWrapper: {
    alignItems: 'stretch',
    flexDirection: 'row'
  },
  flag: {
    marginTop: 6,
    fontSize: 18
  },
  input: {
    padding: 4,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    margin: 5,
    width: 200,
    alignSelf: 'center'
  },
  label: {
    fontSize: 18
  }
})

module.exports = PhoneNumberLoginWrapper;