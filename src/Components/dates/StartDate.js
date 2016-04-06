'use strict';

import React, {
  DatePickerIOS,
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} from 'react-native';

import moment from 'moment';

import Button from '../authentication/Button';

const StartDate = React.createClass({

  getDefaultProps() {
    return {
      startDate: new Date()
    }
  },

  getInitialState() {
    return {
      startDate: this.props.startDate
    }
  },

  startDateChange(date) {
    this.setState({startDate: date});
  },

  selectEndDate() {

  },

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableHighlight
            style={styles.button}
            onPress={this.onBack}>
            <Text>Back</Text>
          </TouchableHighlight>
          <Text style={styles.headerTitle}>
            Gimme
          </Text>
        </View>
        <Text>*** Start Date ***</Text>
        <Text>{moment(this.state.startDate).format('MMMM Do YYYY')}</Text>
        <DatePickerIOS
          date={this.props.startDate}
          mode="date"
          onDateChange={this.startDateChange}
        />
        <Button text={'Select End Date'} onPress={this.selectEndDate} />
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
  },
  header: {
    backgroundColor:'#81c04d',
    paddingTop: 30,
    paddingBottom: 10,
    flexDirection: 'row',
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontWeight: 'bold'
  }

});

module.exports = StartDate;