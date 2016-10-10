'use strict';
import React, { Component } from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    TouchableHighlight
} from 'react-native';

import ContactsAPI from 'react-native-contacts';
import ContactListItem from './ContactListItem';
import Toolbar from '../common/Toolbar';

/**
    MAKE THIS INTO A LIST VIEW INSTEAD OF SCROLL VIEW
    REMOVE THE CLASS IF POSSIBLE
*/

export default class ContactListWrapper extends Component {
    state = {
        contacts: []
    };

    componentDidMount() {
        ContactsAPI.getAll((err, contacts) => {
            this.setState({
                contacts: contacts
            });
        });
    }

    render() {
        return (
            <ContactList
                {...this.props}
                contacts={this.state.contacts}
            />
        );
    }
};

function ContactList(props) {
    const { route, navigator, contacts } = props;
    return (
        <View style={styles.container}>
            <Toolbar
                title='Request Media'
                rightButtonTitle='Messages'
                nextScreenTitle='messages'
                route={route}
                navigator={navigator}
            />
            <ScrollView style={styles.contactWrapper}>
                {contacts.map((contact, index) => (
                    <ContactListItem
                        key={index}
                        route={route}
                        navigator={navigator}
                        name={`${contact.givenName} ${contact.familyName}`}
                        phoneNumber={contact.phoneNumbers[0].number}
                    />
                ))}
            </ScrollView>
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
    contactWrapper: {
        flex: 9,
        borderWidth: 2,
        borderColor: 'red'
    }
});