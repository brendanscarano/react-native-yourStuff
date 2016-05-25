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
import Toolbar from '../common/Toolbar';

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
    console.log(date);
    this.setState({startDate: date});
  },

  selectEndDate() {
    this.props.navigator.push({
      name: 'endDate',
      passProps: {
        contactName: this.props.contactName,
        contactNumber: this.props.contactNumber,
        startDate: this.state.startDate
      }
    });
  },

  setMaxDate() {
    var d = new Date();
    console.log(d.setDate(d.getDate() - 1))
    return d.setDate(d.getDate() - 1);
  },

  render() {
    return (
      <View style={styles.container}>
        <Toolbar
          title='Start Date'
          leftButtonTitle='Back'
          route={this.props.route}
          navigator={this.props.navigator}
        />
        <View style={styles.dateContainer}>
          <Text>Hey {this.props.contactName}! I would like your Camera Roll pictures and videos from...</Text>
          <Text>Start Date: {moment(this.state.startDate).format('dddd MMMM Do YYYY')}</Text>
          <DatePickerIOS
            date={this.state.startDate}
            mode="date"
            // maximumData={this.setMaxDate()}
            maximumDate={new Date()}
            onDateChange={this.startDateChange}
          />
          <Button text={'Select End Date'} onPress={this.selectEndDate} />
        </View>

      </View>
    );
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 2,
    borderColor: 'red',
    backgroundColor: '#F5FCFF',
  },
  dateContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

module.exports = StartDate;