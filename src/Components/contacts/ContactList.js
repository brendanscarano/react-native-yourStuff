'use strict';

import React, {
  View,
  Text,
  ScrollView,
  StyleSheet
} from 'react-native';

import ContactsAPI from 'react-native-contacts';
import ContactListItem from './ContactListItem';

const Contacts = React.createClass({

  getInitialState() {
    return {
      contacts: null
    }
  },

  componentDidMount() {
    ContactsAPI.getAll((err, contacts) => {
      this.setState({
        contacts: contacts
      });
    });
  },

  displayContacts() {
    return this.state.contacts.map((contact, index) => {
      const contactName = `${contact.givenName} ${contact.familyName}`;
      return (
        <ContactListItem
          route={this.props.route}
          navigator={this.props.navigator}
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
          {this.state.contacts ? this.displayContacts() : null}
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