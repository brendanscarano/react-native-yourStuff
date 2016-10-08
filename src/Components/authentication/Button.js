'use strict';
import React, {
  Text,
  StyleSheet,
  TouchableHighlight
} from 'react-native';

export default function Button(props) {
    return (
      <TouchableHighlight
        style={styles.button}
        underlayColor={'#333'}
        onPress={props.onPress}
      >
        <Text style={styles.buttonText}>{props.text}</Text>
      </TouchableHighlight>
    );
}

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 5,
    padding: 5,
    borderColor: 'black',
    marginTop: 10
  },
  buttonText: {
    flex: 1,
    alignSelf: 'center',
    fontSize: 20
  }
})