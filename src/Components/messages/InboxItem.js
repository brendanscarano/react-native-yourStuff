'use strict';

import React, {
  View,
  Text,
  StyleSheet,
  TouchableHighlight
} from 'react-native';

const InboxItem = React.createClass({

  componentDidMount() {
    console.log(this.props);
  },

  render() {
    return (
      <View style={styles.inboxItem}>
        <Text>{this.props.request.yourName} requested your Camera Roll</Text>
      </View>
    )
  }
});

const styles = StyleSheet.create({
  inboxItem: {
    height: 50,
    borderWidth: 2,
    borderColor: 'orange',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  }
});

module.exports = InboxItem;