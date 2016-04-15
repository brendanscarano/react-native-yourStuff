'use strict';

import React, {
  View,
  Text,
  StyleSheet,
  TouchableHighlight
} from 'react-native';

import RequestItem from './RequestItem';

const RequestWrapper = React.createClass({

  renderRequests() {
    const requestsObj = this.props.requests;

    return Object.keys(requestsObj).map((req, index) => {
      return (
        <RequestItem
          route={this.props.route}
          navigator={this.props.navigator}
          request={requestsObj[req]}
          key={index}
        />
      )
    })
  },

  render() {
    return (
      <View style={styles.container}>
        {this.props.requests ? this.renderRequests() : null}
      </View>
    )
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 2,
    borderColor: 'orange',
    alignSelf: 'stretch',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  }
});

module.exports = RequestWrapper;