'use strict';

import React, {
  DatePickerIOS,
  StyleSheet,
  Text,
  View
} from 'react-native';

const StartDate = React.createClass({

  onDateChange: function(date) {
    this.props.onStartDateChange(date);
  },

  render() {
    return (
      <View style={styles.container}>
        <Text>*** Start Date ***</Text>
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
    flex: 3,
    marginTop: 20,
    borderWidth: 2,
    borderColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});

module.exports = StartDate;