// https://facebook.github.io/react-native/docs/linking-libraries-ios.html#content

'use strict';

import React, {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  CameraRoll,
  Navigator,
  AsyncStorage
} from 'react-native';

import ContactList from './src/Components/contacts/ContactList';
import Messages from './src/Components/messages/Messages';
import StartDate from './src/Components/dates/StartDate';
import EndDate from './src/Components/dates/EndDate';
import PhoneLoginName from './src/Components/authentication/phoneLoginName';
import PhoneLoginNumber from './src/Components/authentication/phoneLoginNumber';
import VerificationCode from './src/Components/authentication/verificationCode';

const ROUTES = {
  contacts: ContactList,
  messages: Messages,
  startDate: StartDate,
  endDate: EndDate,
  phoneLoginName: PhoneLoginName,
  phoneLoginNumber: PhoneLoginNumber,
  verificationCode: VerificationCode
}

const youPics = React.createClass({

  getInitialState() {
    return {
      images: null,
      currentUser: null
    }
  },

  componentDidMount() {

    AsyncStorage.getItem('user').then((value) => {
      console.log(value);
      this.setState({
        currentUser: value
      })
    });

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
          {...route.passProps}
          />
      </View>
    )
  },

  loadInitialRoute() {
    // if (this.state.user !== null) {
    //   return {name: 'phoneLoginName'};
    // } else {
    //   return {name: 'startDate'};
    // }

    // return {name: 'phoneLoginName'};
    return {name: 'messages'};
  },

  render() {
    return (
      <Navigator
        style={styles.container}
        initialRoute={this.loadInitialRoute()}
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