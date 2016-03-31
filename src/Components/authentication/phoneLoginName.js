'use strict';
import React, {
  View,
  Text,
  StyleSheet,
  TextInput
} from 'react-native';

import Button from './Button';

const PhoneLoginName = React.createClass({

  getInitialState() {
    return {
      name: ''
    }
  },

  inputName() {
    this.props.navigator.push({name: 'phoneLoginNumber'});
  },

  render() {
    return (
      <View style={styles.container}>
        <Text>What is your name?</Text>
        <TextInput
          style={styles.input}
          autoFocus={true}
          value={this.state.name}
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