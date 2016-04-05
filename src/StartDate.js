'use strict';

import React, {
  DatePickerIOS,
  StyleSheet,
  Text,
  View
} from 'react-native';

import moment from 'moment';

const StartDate = React.createClass({

  onDateChange: function(date) {
    console.log(date);
    this.props.onStartDateChange(date);
  },

  render() {
    return (
      <View style={styles.container}>
        <Text>*** Start Date ***</Text>
        <Text>{this.props.startDate ? moment(this.props.startDate).format('MMMM Do YYYY') : null}</Text>
        <DatePickerIOS
          date={this.props.startDate}
          mode="date"
          onDateChange={this.onDateChange}
        />
      </View>
    );
  }
});

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    borderWidth: 2,
    borderColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});

module.exports = StartDate;