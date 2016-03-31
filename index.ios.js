// https://facebook.github.io/react-native/docs/linking-libraries-ios.html#content

'use strict';

import React, {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  CameraRoll,
  Navigator
} from 'react-native';

import Main from './src/Main';
import PhoneLoginName from './src/Components/authentication/phoneLoginName';
import PhoneLoginNumber from './src/Components/authentication/phoneLoginNumber';

const ROUTES = {
  main: Main,
  phoneLoginName: PhoneLoginName,
  phoneLoginNumber: PhoneLoginNumber
}

const youPics = React.createClass({

  getInitialState() {
    return {
      images: null
    }
  },

  componentDidMount() {
    CameraRoll.getPhotos({first: 25})
      .then((data) => {
        this.setState({
          images: data.edges
        });
      })
  },

  renderScene(route, navigator) {
    console.log(route);
    console.log(navigator);
    const Component = ROUTES[route.name];
    return (
      <View style={styles.container}>
        <Component
          route={route}
          navigator={navigator}
          topNavigator={navigator} />
      </View>
    )
  },

  render() {
    return (
      <Navigator
        style={styles.container}
        initialRoute={{name: 'phoneLoginName'}}
        renderScene={this.renderScene}
        configureScene={() => { return Navigator.SceneConfigs.FloatFromRight;}}
      />
    );
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 2,
    borderColor: 'blue'
  }
});

AppRegistry.registerComponent('youPics', () => youPics);

    // const Component = ROUTES[route.name];
    // if(route.name === 'main') {
    //   return (
    //     <Component
    //       route={route}
    //       navigator={navigator}
    //     />
    //   )
    // } else {
    //   return (
    //     <Component
    //       route={route}
    //       navigator={navigator}
    //       {...route.passProps}
    //     />
    //   )
    // }