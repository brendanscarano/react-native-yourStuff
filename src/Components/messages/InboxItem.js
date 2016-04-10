'use strict';

import React, {
  View,
  Text,
  StyleSheet,
  Switch
} from 'react-native';

import Emoji from 'react-native-emoji';

const InboxItem = React.createClass({

  getInitialState() {
    return {
      trueSwitchIsOn: false
    }
  },

  componentDidMount() {
    console.log(this.props);
    if(this.props.request.accepted) {
      this.setState({trueSwitchIsOn: true})
    } else {
      this.setState({trueSwitchIsOn: false})
    }
  },

  changeValue(value) {
    console.log(value);
    this.setState({trueSwitchIsOn: value})

    // new Firebase('https://gimmie.firebaseio.com/requests/-KEdD0ahhPR-EAXec0sE').once('value', function(snap) {
    //    console.log(snap.val());
    // });

    if(value) {
      new Firebase('https://gimmie.firebaseio.com/requests/-KEdD0ahhPR-EAXec0sE').child('accepted').set(true);
    } else {
      new Firebase('https://gimmie.firebaseio.com/requests/-KEdD0ahhPR-EAXec0sE').child('accepted').set(false);
    }
  },

  render() {
    return (
      <View style={styles.inboxItem}>
        <Text>{this.props.request.yourName} requested your Camera Roll</Text>
        <View>
          <Emoji name='-1'/>
          <Switch
            onValueChange={
              (value) => {
                this.changeValue(value);
              }
            }
            style={{marginBottom: 10}}
            value={this.state.trueSwitchIsOn} />
          <Emoji name='+1'/>
        </View>
      </View>
    )
  }
});

const styles = StyleSheet.create({
  inboxItem: {
    height: 50,
    borderWidth: 2,
    borderColor: 'orange',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  }
});

module.exports = InboxItem;