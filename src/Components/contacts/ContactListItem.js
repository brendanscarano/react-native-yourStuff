'use strict';

import React, {
    View,
    Text,
    StyleSheet,
    TouchableHighlight
} from 'react-native';

export default function ContactListItem(props) {
    return (
        <View>
            <TouchableHighlight
                onPress={() => requestMedia(props.name, props.phoneNumber, props.navigator)}
                underlayColor='red'
                style={styles.contact}
            >
                <Text>{props.name} {props.phoneNumber}</Text>
            </TouchableHighlight>
        </View>
    )
};

function requestMedia(contactName, contactNumber, navigator) {
    const flatNum = contactNumber.replace(/-/g, '');
    const ref = new Firebase('https://gimmie.firebaseio.com/users');

    ref.orderByChild('phoneNumber').equalTo(flatNum).on('value', (snapshot) => {
        const contact = snapshot.val();

        console.log('contactName', contactName);
        if (contact === null || !contact) {
            navigator.push({
                name: 'noContactsError',
                passProps: {
                    contactName,
                    contactNumber
                }
            });
            return;
        }

        console.log('contactName', contactName);
        console.log('contactNumber', contactNumber);
        const contactId = Object.keys(contact)[0];
        const name = contact[contactId].name;
        const phoneNumber = contact[contactId].phoneNumber;

        console.log('name', name);
        console.log('phoneNumber', phoneNumber);

        navigator.push({
            name: 'startDate',
            passProps: {
                contactName: name,
                contactNumber: phoneNumber
            }
        });
    });
}

const styles = StyleSheet.create({
    contact: {
        height: 50,
        paddingTop: 15,
        paddingLeft: 10,
        marginBottom: 10,
        borderBottomWidth: 1,
        borderRadius: 5,
        borderBottomColor: '#ccc',
        position: 'relative'
    }
});