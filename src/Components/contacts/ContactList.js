'use strict';

import React, {
  View,
  Text,
  ScrollView,
  StyleSheet
} from 'react-native';

import ContactListItem from './ContactListItem';

const Contacts = React.createClass({

  displayContacts() {
    return this.props.contacts.map((contact, index) => {
      const contactName = `${contact.givenName} ${contact.familyName}`;
      return (
        <ContactListItem
          key={index}
          name={contactName}
          phoneNumber={contact.phoneNumbers[0].number}
        />
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
    borderColor: 'yellow',
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
  }
});

module.exports = Contacts;