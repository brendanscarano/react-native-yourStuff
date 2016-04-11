'use strict';

import React, {
  View,
  Text,
  StyleSheet,
  TouchableHighlight
} from 'react-native';

import InboxItem from './InboxItem';

const InboxWrapper = React.createClass({

  renderInboxRequests() {
    const inboxRequestsObj = this.props.inbox;

    return Object.keys(inboxRequestsObj).map((req, index) => {
      return (
        <InboxItem
          id={req}
          request={inboxRequestsObj[req]}
          key={index}
        />
      )
    })
  },

  render() {
    return (
      <View style={styles.container}>
        <Text>InboxWrapper Section</Text>
        {this.props.inbox ? this.renderInboxRequests() : null}
      </View>
    )
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 2,
    borderColor: 'orange',
    alignItems: 'center',
    alignSelf: 'stretch',
    backgroundColor: '#F5FCFF'
  }
});

module.exports = InboxWrapper;