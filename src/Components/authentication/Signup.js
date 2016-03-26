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
      password: '',
      passwordConfirmation: '',
      errorMessage: ''
    }
  },

  onSignUpPress() {
    // if (this.state.password !== this.state.passwordConfirmation) {
    //   return this.setState({errorMessage: 'Your password do not match'});
    // }
    // if (this.state.username !== '' && (this.state.password === this.state.passwordConfirmation)) {
    //   this.props.navigator.immediatelyResetRouteStack([{name: 'home'}]);
    // }
    this.state.firebase.push({
      phoneNumber: this.state.phoneNumber,
      password: this.state.password
    })
  },

  onSigninPress() {
    this.props.navigator.pop();
  },

  render() {
    return (
      <View style={styles.container}>
        <Text>Sign Up</Text>

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

