'use strict';

import React, {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableHighlight
} from 'react-native';

import TabApp from './TabBar';

const Contacts = React.createClass({

  requestMedia(name) {
    this.props.navigator.push({
      name: 'dates',
      passProps: {
        contactName: name
      }
    });
  },

  displayContacts() {
    console.log('displaying contacts')
    return this.props.contacts.map((contact, index) => {
      const contactName = `${contact.givenName} ${contact.familyName}`;
      return (
        <View key={index}>
          <TouchableHighlight
            onPress={() => this.requestMedia(contact.givenName)}
            underlayColor='red'
            style={styles.contact}>
            <Text>{contactName} {contact.phoneNumbers[0].number}</Text>
          </TouchableHighlight>
        </View>
      )
    })
  },

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text>Contacts</Text>
        </View>
        <ScrollView style={styles.contactWrapper}>
          {this.props.contacts ? this.displayContacts() : null}
        </ScrollView>
      </View>
    );
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 2,
    borderColor: 'green',
    backgroundColor: '#F5FCFF'
  },
  header: {
    flex: 1,
    paddingTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#93DB70'
  },
  contactWrapper: {
    flex: 9,
    borderWidth: 2,
    borderColor: 'red'
  },
  contact: {
    height: 60,
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#47b8e0',
    position: 'relative'
  }
});

module.exports = Contacts;