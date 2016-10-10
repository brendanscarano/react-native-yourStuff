'use strict';
import React, {
  View,
  Text,
  StyleSheet,
  TouchableHighlight
} from 'react-native';

import InboxItem from './InboxItem';

export default function InboxWrapper(props) {
    return (
        <View style={styles.container}>
            {props.inbox ? renderInboxRequests(props.inbox) : <Text>Loading...</Text>}
        </View>
    )
}

function renderInboxRequests(inboxObj) {
    return Object.keys(inboxObj).map((req, index) => (
        <InboxItem
            key={index}
            id={req}
            request={inboxObj[req]}
        />
    ))
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderWidth: 2,
        borderColor: 'orange',
        alignItems: 'center',
        alignSelf: 'stretch',
        backgroundColor: '#F5FCFF'
    }
});
