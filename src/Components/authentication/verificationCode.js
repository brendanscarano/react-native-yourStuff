'use strict';
import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  AsyncStorage
} from 'react-native';

import Firebase from 'firebase';
import Button from './Button';

export default class VerificationCode extends Component {
    state = {
        verificationCode: '',
        errorMessage: ''
    };

    onSignUpPress = () => {
        if (this.state.verificationCode == this.props.code) {
            AsyncStorage.setItem('user', JSON.stringify({
                userName: 'Brendan',
                phoneNumber: '15163187361'
            }));

            this.props.navigator.immediatelyResetRouteStack([{name: 'contacts'}]);
        } else {
            this.setState({errorMessage: 'Whoops, that\'s not the right code!'});
        }
    };

    render() {
        return (
            <View style={styles.container}>
                <Text>You're almost done!</Text>
                <Text>Just enter the verification code we just texted you, that way we know it's you...</Text>
                <TextInput
                  style={styles.input}
                  autoFocus={true}
                  placeholder='4-digit Verification Code'
                  value={this.state.verificationCode}
                  keyboardType='numeric'
                  onChangeText={(text) => {this.setState({verificationCode: text})}}
                  />

                <Text style={styles.label}>{this.state.errorMessage}</Text>
                <Button text={'Sign Up'} onPress={this.onSignUpPress} />
            </View>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    input: {
        padding: 4,
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        margin: 5,
        width: 200,
        alignSelf: 'center'
    },
    label: {
        fontSize: 18
    }
})
