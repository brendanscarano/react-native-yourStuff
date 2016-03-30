// https://facebook.github.io/react-native/docs/linking-libraries-ios.html#content

'use strict';

import React, {
  AppRegistry,
  DatePickerIOS,
  StyleSheet,
  Text,
  View,
  CameraRoll,
  Navigator
} from 'react-native';

import ContactsAPI from 'react-native-contacts';

import Main from './src/Main';
import Contacts from './src/Components/contacts/ContactList';
import Dates    from './src/Dates';
import Signup from './src/Components/authentication/Signup';

const ROUTES = {
  main: Main,
  contacts: Contacts,
  dates: Dates,
  signup: Signup
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
        initialRoute={{name: 'main'}}
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