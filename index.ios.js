// https://facebook.github.io/react-native/docs/linking-libraries-ios.html#content

'use strict';

import React, {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
  AsyncStorage
} from 'react-native';

import ContactList from './src/Components/contacts/ContactList';
import NoContactErrorScreen from './src/Components/contacts/NoContactErrorScreen';
import Messages from './src/Components/messages/Messages';
import StartDate from './src/Components/dates/StartDate';
import EndDate from './src/Components/dates/EndDate';
import PhoneLoginName from './src/Components/authentication/phoneLoginName';
import PhoneLoginNumber from './src/Components/authentication/phoneLoginNumber';
import VerificationCode from './src/Components/authentication/verificationCode';
import Images from './src/ImageWrapper';

const ROUTES = {
  contacts: ContactList,
  noContactsError: NoContactErrorScreen,
  messages: Messages,
  startDate: StartDate,
  endDate: EndDate,
  phoneLoginName: PhoneLoginName,
  phoneLoginNumber: PhoneLoginNumber,
  verificationCode: VerificationCode,
  images: Images
}

const youPics = React.createClass({

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

    const user = AsyncStorage.getItem('user')
      .then((value) => {
        return value;
      });

    // if (user) {
    //   return {name: 'contacts'};
    // } else {
    //   return {name: 'phoneLoginName'};
    // }

    // return {name: 'phoneLoginName'};
    return {name: 'images'};
  },

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
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 2,
    borderColor: 'blue'
  }
});

AppRegistry.registerComponent('youPics', () => youPics);