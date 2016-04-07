'use strict';

import React, {
  DatePickerIOS,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  AsyncStorage
} from 'react-native';

import moment from 'moment';
import Firebase from 'firebase';

import Button from '../authentication/Button';

const EndDate = React.createClass({

  getDefaultProps() {
    return {
      endDate: new Date()
    }
  },

  getInitialState() {
    return {
      firebase: new Firebase('https://gimmie.firebaseio.com/requests'),
      endDate: this.props.endDate
    }
  },

  endDateChange(date) {
    this.setState({endDate: date});
  },

  requestCameraRoll() {

    AsyncStorage.getItem('user').then((value) => {

      const user = JSON.parse(value);

      const newDate = new Date();

      this.state.firebase.push({
        yourName: user.userName,
        yourNumber: user.phoneNumber,
        requestedUserName: this.props.contactName,
        requestedUserNumber: this.props.contactNumber,
        startDate: moment(this.props.startDate).format('MMMM Do YYYY'),
        endDate: moment(this.state.endDate).format('MMMM Do YYYY'),
        created_at: moment(newDate).format('MMMM Do YYYY hh:mm:ss a')
      });

      this.props.navigator.push({
        name: 'messages'
      });

    });

  },

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableHighlight
            style={styles.button}
            onPress={this.onBack}>
            <Text>Contacts</Text>
          </TouchableHighlight>
          <Text style={styles.headerTitle}>
            Gimme
          </Text>
        </View>
        <Text>Hey {this.props.contactName}! I would like your Camera Roll pictures and videos from...</Text>
        <Text>Start Date: {moment(this.props.startDate).format('MMMM Do YYYY')}</Text>
        <Text>End Date: {moment(this.state.endDate).format('MMMM Do YYYY')}</Text>
        <DatePickerIOS
          date={this.state.endDate}
          mode="date"
          onDateChange={this.endDateChange}
        />
        <Button text={'Gimmie'} onPress={this.requestCameraRoll}/>
      </View>
    );
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 3,
    marginTop: 20,
    borderWidth: 2,
    borderColor: 'orange',
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
  }
});

module.exports = EndDate;