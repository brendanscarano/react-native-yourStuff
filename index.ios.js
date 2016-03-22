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

import StartDate from './src/StartDate';
import EndDate from './src/EndDate';
import ImageWrapper from './src/ImageWrapper';
import Contacts from './src/Contacts';

const ROUTES = {
  contacts: Contacts,
  startDate: StartDate
}

const youPics = React.createClass({

  getDefaultProps() {
    return {
      startDate: new Date(),
      endDate: new Date()
    }
  },

  getInitialState() {
    return {
      startDate: this.props.startDate,
      endDate: this.props.endDate,
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

/**
render() {
  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>
        youPics
      </Text>

      <StartDate
        onStartDateChange={this.onStartDateChange}
        startDate={this.state.startDate}
      />

      <EndDate
        onEndDateChange={this.onEndDateChange}
        endDate={this.state.endDate}
      />

      <ImageWrapper
        images={this.state.images}
        startDate={this.state.startDate}
        endDate={this.state.endDate}
      />
    </View>
  );
}


*/