'use strict';

import React, {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableHighlight
} from 'react-native';

const Contacts = React.createClass({

  requestMedia(name, number) {

    const flatNum = number.replace(/-/g, '');
    const ref = new Firebase('https://gimmie.firebaseio.com/users');

    ref.orderByChild('phoneNumber').equalTo(flatNum).on('value', (snapshot) => {

      const contact = snapshot.val();

      if (contact) {
        const contactId = Object.keys(contact)[0];
        const phoneNumber = contact[contactId].phoneNumber;
        console.log(phoneNumber);
      } else {
        console.log('No user with this phone number!');
      }

    })

    // this.props.navigator.push({
    //   name: 'dates',
    //   passProps: {
    //     contactName: name
    //   }
    // });
  },

  displayContacts() {
    console.log('displaying contacts')
    return this.props.contacts.map((contact, index) => {
      const contactName = `${contact.givenName} ${contact.familyName}`;
      return (
        <View key={index}>
          <TouchableHighlight
            onPress={() => this.requestMedia(contact.givenName, contact.phoneNumbers[0].number)}
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