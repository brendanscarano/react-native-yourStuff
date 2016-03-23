'use strict';

import React, {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableHighlight
} from 'react-native';

import StartDate from './StartDate';

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
        <Text>Contacts</Text>
        <ScrollView>
          {this.props.contacts ? this.displayContacts() : null}
        </ScrollView>
      </View>
    );
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    borderWidth: 2,
    borderColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
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