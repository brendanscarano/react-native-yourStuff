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

import Contacts from './src/Contacts';
import Dates    from './src/Dates';

const ROUTES = {
  contacts: Contacts,
  dates: Dates
}

const youPics = React.createClass({

  getInitialState() {
    return {
      images: null,
      contacts: null
    }
  },

  componentDidMount() {
    ContactsAPI.getAll((err, contacts) => {
      this.setState({
        contacts: contacts
      });
    });

    CameraRoll.getPhotos({first: 25})
      .then((data) => {
        this.setState({
          images: data.edges
        });
      })
  },

  onStartDateChange(date) {
    this.setState({startDate: date});
  },

  onEndDateChange(date) {
    this.setState({endDate: date});
  },

  renderScene(route, navigator) {
    const Component = ROUTES[route.name];
    if(route.name === 'contacts') {
      return (
        <Component
          route={route}
          navigator={navigator}
          contacts={this.state.contacts}
        />
      )
    } else {
      return (
        <Component
          route={route}
          navigator={navigator}
          {...route.passProps}
        />
      )
    }
  },

  render() {
    return (
      <Navigator
        style={styles.container}
        initialRoute={{name: 'contacts'}}
        renderScene={this.renderScene}
        configureScene={() => { return Navigator.SceneConfigs.FloatFromRight;}}
      />
    );
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

AppRegistry.registerComponent('youPics', () => youPics);