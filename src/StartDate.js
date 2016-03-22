'use strict';

import React, {
  DatePickerIOS,
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} from 'react-native';

const StartDate = React.createClass({

  getDefaultProps() {
    return {
      startDate: new Date()
    }
  },

  getInitialState() {
    console.log(this.state);
    console.log(this.props);
    return {
      startDate: this.props.startDate
    }
  },

  onDateChange: function(date) {
    this.props.onStartDateChange(date);
  },

  onBack() {
    this.props.navigator.pop();
  },

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableHighlight onPress={this.onBack}>
            <Text>Back</Text>
          </TouchableHighlight>
          <Text>
            Request Photos/Videos from {this.props.contactName}
          </Text>
        </View>
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
    flex: 1,
    marginTop: 20,
    borderWidth: 2,
    borderColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  header: {
    position: 'absolute',
    top: 0
  }
});

module.exports = StartDate;