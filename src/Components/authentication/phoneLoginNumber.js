'use strict';
import React, {
  View,
  Text,
  StyleSheet,
  TextInput,
  AsyncStorage
} from 'react-native';

import Firebase from 'firebase';
import Button from './Button';

const PhoneLoginNumber = React.createClass({

  getInitialState() {
    return {
      firebase: new Firebase('https://gimmie.firebaseio.com/users'),
      phoneNumber: ''
    }
  },

  componentDidMount() {
    AsyncStorage.getItem('user').then((value) => {
      console.log(value);
    });
  },

  randomNumber(numberOfDigits) {
    let verificationCode = '';

    for (let i = 0; i < numberOfDigits; i++) {
      verificationCode += Math.floor((Math.random() * 9) + 1).toString();
    }

    return verificationCode;
  },

  onSignUpPress() {

    if (this.state.phoneNumber !== '') {

      // const ranNum = this.randomNumber(4);
      const ranNum = 1234;

      console.log(ranNum);

      this.state.firebase.push({
        name: this.props.name,
        phoneNumber: this.state.phoneNumber,
        verificationCode: ranNum
      });

      this.props.navigator.push({
        name: 'verificationCode',
        passProps: {
          code: ranNum
        }
      });

    }

  },

  render() {
    return (
      <View style={styles.container}>
        <Text>Hi {this.props.name}!</Text>
        <Text>What Is Your Phone Number</Text>
        <Text>We promise we'll never spam you! This just makes it easy for you to use your contacts list, and request photos/videos that way.</Text>
        <TextInput
          style={styles.input}
          autoFocus={true}
          value={this.state.phoneNumber}
          keyboardType='phone-pad'
          placeholder='(555) 123-5678'
          onChangeText={(text) => this.setState({phoneNumber: text})}
          />

        <Text style={styles.label}>{this.state.errorMessage}</Text>
        <Button text={'Send Code'} onPress={this.onSignUpPress} />
      </View>
    );
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
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

module.exports = PhoneLoginNumber;


// FIREBASE AUTHENTICATION WITH EMAIL/PASSWORD

// this.state.firebase.createUser({
//   email: this.state.email.toLowerCase(),
//   password: this.state.password
//   // email: `testing${ranNum}@gmail.com`,
//   // password: 'testing'
// }, (error, userData) => {

//   if (error) {
//     console.log(error);
//     this.setState({errorMessage: error.message});
//   } else {
//     console.log(userData);
//     usersRef.push({
//       userId: userData.uid,
//       phoneNumber: this.state.phoneNumber
//     });
//     this.props.navigator.push({
//       name: 'main'
//     })
//     this.props.navigator.immediatelyResetRouteStack([{name: 'main'}]);
//   }
// })
