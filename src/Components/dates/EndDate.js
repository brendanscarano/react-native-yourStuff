'use strict';

import React, {
  DatePickerIOS,
  StyleSheet,
  Text,
  View,
  TouchableHighlight
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
    this.state.firebase.push({
      requester: 'brendan',
      requestedUser: this.props.contactName,
      startDate: 'April 5th 2016',
      endDate: 'April 6th 2016'
    })
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