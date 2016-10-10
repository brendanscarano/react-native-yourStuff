// https://facebook.github.io/react-native/docs/linking-libraries-ios.html#content
'use strict';
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
  AsyncStorage
} from 'react-native';

import ROUTES from './src/routes';

class youPics extends Component {
    render() {
        return (
            <Navigator
                style={styles.container}
                initialRoute={this.loadInitialRoute()}
                renderScene={this.renderScene}
                configureScene={() => {return Navigator.SceneConfigs.FloatFromRight;}}
            />
        );
    }

    renderScene(route, navigator) {
        const Component = ROUTES[route.name];
        return (
            <View style={styles.container}>
                <Component
                    route={route}
                    navigator={navigator}
                    {...route.passProps}
                />
            </View>
        )
    }

    loadInitialRoute() {
        const user = AsyncStorage.getItem('user').then((value) => {
            return value;
        });

        // if (user) {
        //   return {name: 'contacts'};
        // } else {
        //   return {name: 'phoneLoginName'};
        // }

        // return {name: 'phoneLoginName'};
        return {name: 'messages'};
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderWidth: 2,
        borderColor: 'blue'
    }
});

AppRegistry.registerComponent('youPics', () => youPics);