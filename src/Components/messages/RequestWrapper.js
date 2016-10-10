'use strict';
import React, {
  View,
  Text,
  StyleSheet,
  TouchableHighlight
} from 'react-native';

import RequestItem from './RequestItem';

export default function RequestWrapper(props) {
    return (
        <View style={styles.container}>
            {props.requests ? renderRequests({...props}) : <Text>Loading...</Text>}
        </View>
    )
}

function renderRequests({requests, route, navigator}) {
    return Object.keys(requests).map((req, index) => (
        <RequestItem
            key={index}
            route={route}
            navigator={navigator}
            id={req}
            request={requests[req]}
        />
    ))
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 2,
    borderColor: 'orange',
    alignSelf: 'stretch',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  }
});
