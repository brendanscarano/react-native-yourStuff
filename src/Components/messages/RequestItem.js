'use strict';

import React, {
  View,
  Text,
  StyleSheet,
  TouchableHighlight
} from 'react-native';

const RequestItem = React.createClass({

  componentDidMount() {
    console.log(this.props);
  },

  seeImages() {
    console.log('hitting this!')
    this.props.navigator.push({
      name: 'images'
    })
  },

  render() {
    return (
      <View style={styles.requestItem}>
        <Text>{this.props.request.yourName}</Text>
        <Text>Requested {this.props.request.requestedUserName}'s Camera Roll</Text>
        <Text>{this.props.request.accepted ? 'Accepted' : 'Not Accepted'}</Text>

        <TouchableHighlight
          onPress={this.seeImages}
          underlayColor='red'>
          <Text>Test Button</Text>
        </TouchableHighlight>
      </View>
    )
  }
});

const styles = StyleSheet.create({
  requestItem: {
    height: 50,
    borderWidth: 2,
    borderColor: 'orange',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  }
});

module.exports = RequestItem;