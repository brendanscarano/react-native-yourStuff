'use strict';

import React, {
  TabBarIOS,
  Component,
  View,
  Text,
  Navigator,
  StyleSheet
} from 'react-native';

import ContactsAPI from 'react-native-contacts';
import Contacts from './Components/contacts/ContactList';
import Dates from './Components/dates/Dates';

const ROUTES = {
  main: Main,
  contacts: Contacts,
  dates: Dates
}

const Main = React.createClass({

  getInitialState() {
    return {
      selectedTab: 'contacts',
      contacts: null
    }
  },

  componentDidMount() {
    ContactsAPI.getAll((err, contacts) => {
      this.setState({
        contacts: contacts
      });
    });
  },

  setTab(tabItem) {
    this.setState({
      selectedTab: tabItem
    });
  },

  renderScene(route, navigator) {
    const Component = ROUTES[route.name];
    return (
      <View style={styles.container}>
        <Component
          route={route}
          navigator={navigator}
          contacts={this.state.contacts}
          {...route.passProps}/>
      </View>
    )
  },

  renderContacts() {
    return (
      <Navigator
      style={styles.container}
      initialRoute={{name: 'contacts'}}
      renderScene={this.renderScene}
      configureScene={() => { return Navigator.SceneConfigs.FloatFromRight;}}
      />
    )
  },

  render() {
    return (
      <TabBarIOS
        tintColor="blue"
        barTintColor="red">
        <TabBarIOS.Item
          systemIcon="contacts"
          onPress={() => this.setTab('contacts')}
          selected={this.state.selectedTab === 'contacts'}>
          {this.renderContacts()}
        </TabBarIOS.Item>
        <TabBarIOS.Item
          systemIcon="history"
          onPress={() => this.setTab('history')}
          selected={this.state.selectedTab === 'history'}
          >
          <View style={styles.tabContent}>
            <Text style={styles.tabText}>Tab 2</Text>
          </View>
        </TabBarIOS.Item>
      </TabBarIOS>
    );
  }
});

const styles = StyleSheet.create({
  contacts: {
    borderColor: 'blue',
    borderWidth: 2
  },
  tabContent: {
    flex: 1,
    alignItems: 'center'
  },
  tabText: {
    margin: 50,
    fontSize: 45
  }
});

module.exports = Main;