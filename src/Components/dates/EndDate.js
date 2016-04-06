'use strict';

import React, {
  DatePickerIOS,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import moment from 'moment';

const EndDate = React.createClass({

  getDefaultProps() {
    return {
      endDate: new Date()
    }
  },

  getInitialState() {
    return {
      endDate: this.props.endDate
    }
  },

  endDateChange(date) {
    this.setState({endDate: date});
  },

  requestCameraRoll() {
    this.state.firebase.push({
      requester: this.state.user,
      requestedUser: this.props.contactName,
      startDate: 'April 5th 2016',
      endDate: 'April 6th 2016'
    })
  },

  render() {
    return (
      <View style={styles.container}>
        <Text>*** End Date ***</Text>
        <Text>{this.props.endDate ? moment(this.props.endDate).format('MMMM Do YYYY') : null}</Text>
        <DatePickerIOS
          date={this.props.endDate}
          mode="date"
          onDateChange={this.endDateChange}
        />
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