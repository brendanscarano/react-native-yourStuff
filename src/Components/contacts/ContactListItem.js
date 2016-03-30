'use strict';

import React, {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableHighlight
} from 'react-native';

const ContactListItem = React.createClass({

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

  displayContactListItem() {
    console.log('displaying contacts')
    return this.props.contacts.map((contact, index) => {
      const contactName = `${contact.givenName} ${contact.familyName}`;

    })
  },

  render() {
    return (
      <View key={this.props.index}>
        <TouchableHighlight
          onPress={() => this.requestMedia(this.props.name, this.props.phoneNumber)}
          underlayColor='red'
          style={styles.contact}>
          <Text>{this.props.name} {this.props.phoneNumber}</Text>
        </TouchableHighlight>
      </View>
    )
  }
});

const styles = StyleSheet.create({
  contact: {
    height: 60,
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#47b8e0',
    position: 'relative'
  }
});

module.exports = ContactListItem;