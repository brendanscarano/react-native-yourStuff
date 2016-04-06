'use strict';
import React, {
  View,
  Text,
  StyleSheet,
  TextInput,
  AsyncStorage
} from 'react-native';

import Button from './Button';

const PhoneLoginName = React.createClass({

  getInitialState() {
    return {
      name: ''
    }
  },

  inputName() {

    // const accountSid = 'AC943ea98df53c2f3084170fd57b251604';
    // const authToken = 'ab0ba128a02684790bc5d79b4d70f34e';

    // const client = twilio(accountSid)(authToken);
    // console.log(twilio);

    this.props.navigator.push({
      name: 'phoneLoginNumber',
      passProps: {
        name: this.state.name
      }
    });
  },

  render() {
    return (
      <View style={styles.container}>
        <Text>Welcome to Gimme!</Text>
        <Text>The best place to get your friends photos and videos they have been keeping on their Camera Roll</Text>
        <Text>Now first, what is your name?</Text>
        <TextInput
          style={styles.input}
          autoFocus={true}
          value={this.state.name}
          placeholder='Your Name'
          onChangeText={(text) => this.setState({name: text})}
          />

          <Button text={'Continue'} onPress={this.inputName} />
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

module.exports = PhoneLoginName;