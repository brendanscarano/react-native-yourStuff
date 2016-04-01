'use strict';
import React, {
  View,
  Text,
  StyleSheet,
  TextInput
} from 'react-native';

import Firebase from 'firebase';
import Button from './Button';

const verificationCode = React.createClass({

  getInitialState() {
    return {
      verificationCode: '',
      errorMessage: ''
    }
  },

  onSignUpPress() {
    console.log(this.state)
    console.log(this.props)
    if (this.state.verificationCode === this.props.code) {
      this.props.navigator.immediatelyResetRouteStack([{name: 'main'}]);
    } else {
      this.setState({errorMessage: 'Whoops, that\'s not the right code!'});
    }

  },

  render() {
    return (
      <View style={styles.container}>
        <Text>Enter verification code:</Text>
        <TextInput
          style={styles.input}
          autoFocus={true}
          value={this.state.verificationCode}
          keyboardType='numeric'
          onChangeText={(text) => this.setState({verificationCode: text})}
          />

        <Text style={styles.label}>{this.state.errorMessage}</Text>
        <Button text={'Sign Up'} onPress={this.onSignUpPress} />
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

module.exports = verificationCode;
