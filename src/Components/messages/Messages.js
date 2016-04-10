'use strict';

import React, {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  AsyncStorage
} from 'react-native';

import InboxWrapper from './InboxWrapper';
import RequestWrapper from './RequestWrapper';
import Toolbar from '../common/Toolbar';

const Messages = React.createClass({

  getInitialState() {
    return {
      firebase: new Firebase('https://gimmie.firebaseio.com/requests'),
      selectedTab: 'inbox',
      requests: null,
      inbox: null
    }
  },

  componentDidMount() {

    // this.state.firebase.on('child_added', (snapshot, prevChildKey) => {
    //   console.log(snapshot.val());
    // });
    AsyncStorage.getItem('user').then((value) => {

      const usersPhoneNumber = JSON.parse(value).phoneNumber;

      // get a users requests
      this.state.firebase
        .orderByChild('yourNumber')
        .equalTo(usersPhoneNumber)
        .once('value', (snap) => {
          // console.log(snap.val())
          this.setState({requests: snap.val()});
      })

      // get a users inbox
      this.state.firebase
        .orderByChild('requestedUserNumber')
        .equalTo(usersPhoneNumber)
        .once('value', (snap) => {
          // console.log(snap.val())
          this.setState({inbox: snap.val()});
      })
    });

  },

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
        <InboxWrapper inbox={this.state.inbox} />
      )
    } else {
      return (
        <RequestWrapper requests={this.state.requests} />
      )
    }
  },

  render() {
    return (
      <View style={styles.container}>
        <Toolbar
          title='Messages'
          leftButtonTitle='Back'
          route={this.props.route}
          navigator={this.props.navigator}
        />

        <View style={styles.messageWrapper}>
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
        </View>
    )
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 2,
    borderColor: 'yellow',
    backgroundColor: '#F5FCFF'
  },
  messageWrapper: {
    alignItems: 'center',
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