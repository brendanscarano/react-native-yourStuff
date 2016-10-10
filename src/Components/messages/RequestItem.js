'use strict';
import React, {
  View,
  Text,
  StyleSheet,
  TouchableHighlight
} from 'react-native';

export default function RequestItem(props) {
    const { requestItem, button } = styles;
    const { requestedUserName, startDate, endDate, accepted } = props.request;

    return (
        <View style={requestItem}>
            <Text>{requestedUserName}'s Camera Roll from:</Text>
            <Text>{startDate} - {endDate}</Text>
            <Text>{accepted ? 'Accepted' : 'Not Accepted'}</Text>

            <TouchableHighlight
                style={button}
                onPress={() => seeImages(props.navigator, props.id)}
                underlayColor='red'>
                <Text>View</Text>
            </TouchableHighlight>
        </View>
    )
};

function seeImages(navigator, id) {
    navigator.push({
        name: 'images',
        passProps: {
            requestId: id,
        }
    })
}

const styles = StyleSheet.create({
    requestItem: {
        height: 75,
        borderWidth: 2,
        borderColor: 'red',
        alignSelf: 'stretch',
        backgroundColor: '#F5FCFF',
        position: 'relative'
    },
    button: {
        position: 'absolute',
        width: 100,
        height: 40,
        top: 14,
        right: 14,
        borderWidth: 1,
        borderColor: 'blue',
        borderRadius: 10
    }
});
