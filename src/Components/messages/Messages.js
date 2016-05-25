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

      console.log(value);

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
        <RequestWrapper
          route={this.props.route}
          navigator={this.props.navigator}
          requests={this.state.requests}
        />
      )
    }
  },

  render() {
    return (
      <View style={styles.container}>
        <Toolbar
          title='Messages'
          leftButtonTitle='Contacts'
          route={this.props.route}
          navigator={this.props.navigator}
        />

        <View style={styles.messageWrapper}>
          <View style={styles.messageWrapper}>
            {this.renderMessageSection()}
          </View>
          <View style={styles.buttonWrapper}>
            <TouchableHighlight
              onPress={() => this.getInbox()}
              underlayColor='red'
              style={[styles.button, this.state.selectedTab === 'inbox' ? styles.activeButton : null]}>
              <Text style={styles.buttonText}>Inbox</Text>
            </TouchableHighlight>

            <TouchableHighlight
              onPress={() => this.getRequests()}
              underlayColor='red'
              style={[styles.button, this.state.selectedTab === 'requests' ? styles.activeButton : null]}>
              <Text style={styles.buttonText}>Requests</Text>
            </TouchableHighlight>
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
    justifyContent: 'space-around',
    borderWidth: 2,
    borderColor: 'purple',
    alignSelf: 'stretch'
  },
  button: {
    flex: 1,
    borderWidth: 2,
    borderColor: 'yellow',
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
  activeButton: {
    backgroundColor: 'red'
  },
  buttonText: {
    textAlign: 'center'
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