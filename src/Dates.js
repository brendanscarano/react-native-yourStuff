'use strict';

import React, {
  View,
  Text,
  StyleSheet,
  TouchableHighlight
} from 'react-native';

import StartDate from './StartDate';
import EndDate   from './EndDate';

const Dates = React.createClass({

  getDefaultProps() {
    return {
      startDate: new Date(),
      endDate: new Date()
    }
  },

  getInitialState() {
    console.log(this.state);
    console.log(this.props);
    return {
      startDate: this.props.startDate,
      endDate: this.props.endDate
    }
  },

  onStartDateChange(date) {
    this.setState({startDate: date});
  },

  onEndDateChange(date) {
    this.setState({endDate: date});
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
          <Text style={styles.welcome}>
            youPics
          </Text>
          <Text>
            Request Photos/Videos from {this.props.contactName}
          </Text>
        </View>
        <StartDate
          onStartDateChange={this.onStartDateChange}
          startDate={this.state.startDate}
        />
        <EndDate
          onEndDateChange={this.onEndDateChange}
          endDate={this.state.endDate}
        />
      </View>
    );
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    borderWidth: 2,
    borderColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  header: {
    flex: 4
  }
});

module.exports = Dates;

// <ImageWrapper
//   images={this.state.images}
//   startDate={this.state.startDate}
//   endDate={this.state.endDate}
// />