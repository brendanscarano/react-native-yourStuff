'use strict';
import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  AsyncStorage
} from 'react-native';

import InboxWrapper from './InboxWrapper';
import RequestWrapper from './RequestWrapper';
import Toolbar from '../common/Toolbar';

export default class Messages extends Component {
    state = {
        firebase: new Firebase('https://gimmie.firebaseio.com/requests'),
        selectedTab: 'inbox',
        requests: null,
        inbox: null
    };

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
    };

    renderMessageSection() {
        return this.state.selectedTab === 'inbox'
            ? <InboxWrapper inbox={this.state.inbox} />
            : <RequestWrapper
                  route={this.props.route}
                  navigator={this.props.navigator}
                  requests={this.state.requests}
                />
    };

    updateTab = (tab) => {
        this.setState({selectedTab: tab})
    };

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
                    {this.renderMessageSection()}
                </View>

                <BottomBar
                    selectedTab={this.state.selectedTab}
                    updateTab={this.updateTab}
                />
            </View>
        )
    }
};

function BottomBar(props) {
    return (
        <View style={styles.buttonWrapper}>
            <TouchableHighlight
                onPress={() => props.updateTab('inbox')}
                underlayColor='red'
                style={[styles.button, props.selectedTab === 'inbox' ? styles.activeButton : null]}>
                <Text style={styles.buttonText}>Inbox</Text>
            </TouchableHighlight>

            <TouchableHighlight
                onPress={() => props.updateTab('requests')}
                underlayColor='red'
                style={[styles.button, props.selectedTab === 'requests' ? styles.activeButton : null]}>
                <Text style={styles.buttonText}>Requests</Text>
            </TouchableHighlight>
        </View>
    )
}

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
