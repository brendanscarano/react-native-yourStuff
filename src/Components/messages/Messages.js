'use strict';

import React, {
  View,
  Text,
  StyleSheet,
  TouchableHighlight
} from 'react-native';

import Inbox from './Inbox';

const Messages = React.createClass({

  getInitialState() {
    return {
      selectedTab: 'inbox'
    }
  },

  componentDidMount() {
    // get a users requests
    // get a users inbox
  }

  getInbox() {
    this.setState({
      selectedTab: 'inbox'
    });
  },

  getRequests() {
    this.setState({
      selectedTab: 'requests'
    });
  },

  renderMessageSection() {
    if(this.state.selectedTab === 'inbox') {
      return (
        <Inbox />
      )
    }
  },

  render() {
    return (
      <View style={styles.container}>
        <Text>Message Section</Text>

        <View style={styles.buttonWrapper}>
          <TouchableHighlight
            onPress={() => this.getInbox()}
            underlayColor='red'
            style={styles.contact}>
            <Text>Inbox</Text>
          </TouchableHighlight>

          <TouchableHighlight
            onPress={() => this.getRequests()}
            underlayColor='red'
            style={styles.contact}>
            <Text>Requests</Text>
          </TouchableHighlight>
        </View>

        <View style={styles.messageWrapper}>
          {this.renderMessageSection()}
        </View>
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
  },
  buttonWrapper: {
    flex: 1,
    flexDirection: 'row',
    borderWidth: 2,
    borderColor: 'red',
    alignSelf: 'stretch',
    alignItems: 'center'
  },
  messageWrapper: {
    flex: 5,
    borderWidth: 2,
    borderColor: 'green',
    alignSelf: 'stretch',
    alignItems: 'center'
  }
});

module.exports = Messages;