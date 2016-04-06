'use strict';

import React, {
  View,
  Text,
  StyleSheet,
  TouchableHighlight
} from 'react-native';

const Inbox = React.createClass({

  render() {
    return (
      <View style={styles.container}>

      </View>
    )
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 2,
    borderColor: 'yellow',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  }
});

module.exports = Inbox;