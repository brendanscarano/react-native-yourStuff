'use strict';
import React, { Component } from 'react-native';
import React, {
  View,
  Text,
  StyleSheet,
  Switch,
  CameraRoll
} from 'react-native';

import getCameraRoll from './photoConverter';
import Emoji from 'react-native-emoji';
import NativeModules from 'NativeModules';
import _ from 'lodash';

export default class InboxItem extends Component {
    state = {
        trueSwitchIsOn: false
    };

    componentDidMount() {
        this.props.request.accepted
            ? this.setState({trueSwitchIsOn: true})
            : this.setState({trueSwitchIsOn: false});
    };

    changeValue(value) {
        this.setState({trueSwitchIsOn: value})

        getCameraRoll(value, this.props.id);
    };

    render() {
        return (
            <View style={styles.inboxItem}>
                <View style={styles.textWrapper}>
                    <Text>{this.props.request.yourName} requested your Camera Roll from:</Text>
                    <Text>{this.props.request.startDate} - {this.props.request.endDate}</Text>
                </View>
                <View style={styles.toggleWrapper}>
                    <Emoji name='-1'/>
                    <Switch
                        onValueChange={(value) => this.changeValue(value)}
                        style={{marginBottom: 10}}
                        value={this.state.trueSwitchIsOn}
                    />
                    <Emoji name='+1'/>
                </View>
            </View>
        )
    }
};

const styles = StyleSheet.create({
    inboxItem: {
        flexDirection: 'row',
        height: 70,
        borderWidth: 2,
        borderColor: 'red',
        alignSelf: 'stretch',
        backgroundColor: '#F5FCFF'
    },
    textWrapper: {
        position: 'absolute',
        left: 0
    },
    toggleWrapper: {
        flexDirection: 'row',
        position: 'absolute',
        right: 0
    }
});
