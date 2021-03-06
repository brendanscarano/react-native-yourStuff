'use strict';
import React, {
    View,
    Text,
    StyleSheet
} from 'react-native';
import Emoji from 'react-native-emoji';
import Toolbar from '../common/Toolbar';

export default function NoContactErrorScreen(props) {
    console.log('props', props);
    const { container, textWrapper } = styles;
    return (
        <View style={container}>
            <Toolbar
              leftButtonTitle='Back'
              route={props.route}
              navigator={props.navigator}
            />

            <View style={textWrapper}>
                <Text><Emoji name='weary'/>Bummer!</Text>
                <Text>{props.contactName} doesn't have Gimme!</Text>
                <Text>Click the button below and well send them a text inviting them to install it!</Text>
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderWidth: 2,
        borderColor: 'yellow',
        backgroundColor: '#F5FCFF'
    },
    textWrapper: {
        backgroundColor:'#81c04d',
        flex: 1,
        paddingRight: 20,
        paddingLeft: 20,
        justifyContent: 'center',
        alignItems: 'center'
    }
});