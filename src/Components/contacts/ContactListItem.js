'use strict';

import React, {
  View,
  Text,
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
        const name = contact[contactId].name;
        const phoneNumber = contact[contactId].phoneNumber;

        this.props.navigator.push({
          name: 'startDate',
          passProps: {
            contactName: name,
            contactNumber: phoneNumber
          }
        });

      } else {

        this.props.navigator.push({
          name: 'noContactsError'
        });

      }

    });

  },

  render() {
    return (
      <View>
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