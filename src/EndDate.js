'use strict';

import React, {
  DatePickerIOS,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const EndDate = React.createClass({

  onDateChange: function(date) {
    this.props.onEndDateChange(date);
  },

  render() {
    return (
      <View style={styles.container}>
        <Text>*** End Date ***</Text>
        <DatePickerIOS
          date={this.props.endDate}
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
    borderColor: 'orange',
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
  }
});

module.exports = EndDate;