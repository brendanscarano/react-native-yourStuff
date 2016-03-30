'use strict';
import React, {
  View,
  Text,
  StyleSheet,
  TextInput
} from 'react-native';

import Firebase from 'firebase';
import Button from './Button';

const Signup = React.createClass({

  getInitialState() {
    return {
      firebase: new Firebase('https://gimmie.firebaseio.com/'),
      phoneNumber: '',
      email: '',
      password: '',
      passwordConfirmation: '',
      errorMessage: ''
    }
  },

  onSignUpPress() {

    if (this.state.password !== this.state.passwordConfirmation) {

      return this.setState({errorMessage: 'Your password do not match'});

    }

    if (this.state.username !== '' && (this.state.password === this.state.passwordConfirmation)) {

      const usersRef = new Firebase('https://gimmie.firebaseio.com/users');

      const ranNum = Math.floor((Math.random() * 1000) + 1);

      this.state.firebase.createUser({
        email: this.state.email.toLowerCase(),
        password: this.state.password
        // email: `testing${ranNum}@gmail.com`,
        // password: 'testing'
      }, (error, userData) => {

        if (error) {
          console.log(error);
          this.setState({errorMessage: error.message});
        } else {
          console.log(userData);
          usersRef.push({
            userId: userData.uid,
            phoneNumber: this.state.phoneNumber
          });
          this.props.navigator.push({
            name: 'main'
          })
          this.props.navigator.immediatelyResetRouteStack([{name: 'main'}]);
        }
      })

    }
  },

  onSigninPress() {
    this.props.navigator.pop();
  },

  render() {
    return (
      <View style={styles.container}>
        <Text>Sign Up</Text>

        <Text style={styles.label}>Email:</Text>
        <TextInput
          style={styles.input}
          value={this.state.email}
          onChangeText={(text) => this.setState({email: text})}
          />

        <Text style={styles.label}>Phone Number:</Text>
        <TextInput
          style={styles.input}
          value={this.state.phoneNumber}
          keyboardType='phone-pad'
          onChangeText={(text) => this.setState({phoneNumber: text})}
          />

        <Text style={styles.label}>Password:</Text>
        <TextInput
          secureTextEntry={true}
          style={styles.input}
          value={this.state.password}
          onChangeText={(text) => this.setState({password: text})}
          />

        <Text style={styles.label}>Confirm Password:</Text>
        <TextInput
          secureTextEntry={true}
          style={styles.input}
          value={this.state.passwordConfirmation}
          onChangeText={(text) => this.setState({passwordConfirmation: text})}
          />

        <Text style={styles.label}>{this.state.errorMessage}</Text>
        <Button text={'Sign Up'} onPress={this.onSignUpPress} />
        <Button text={'I have an account...'} onPress={this.onSigninPress} />
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

module.exports = Signup;

