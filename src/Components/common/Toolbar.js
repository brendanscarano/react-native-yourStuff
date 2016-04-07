'use strict';

import React, {
  View,
  Text,
  StyleSheet,
  TouchableHighlight
} from 'react-native';

const Toolbar = React.createClass({

  onBackScreen() {
    this.props.navigator.pop();
  },

  onNextScreenPush() {
    this.props.navigator.push({
      name: this.props.nextScreenTitle
    });
  },

  render() {
    return (
      <View>
        <View style={styles.toolbar}>

          <TouchableHighlight
            style={styles.toolbarButton}
            underlayColor={'#81c04d'}
            activeOpacity={.6}
            onPress={this.onBackScreen}>
            <Text>{this.props.leftButtonTitle ? this.props.leftButtonTitle : ''}</Text>
          </TouchableHighlight>

          <Text style={styles.toolbarTitle}>
            {this.props.title}
          </Text>

          <TouchableHighlight
            style={styles.toolbarButton}
            underlayColor={'#81c04d'}
            activeOpacity={.6}
            onPress={this.onNextScreenPush}>
            <Text>{this.props.rightButtonTitle ? this.props.rightButtonTitle : ''}</Text>
          </TouchableHighlight>

        </View>
      </View>
    )
  }

});

const styles = StyleSheet.create({
  toolbar:{
    backgroundColor:'#81c04d',
    paddingTop: 30,
    paddingBottom: 10,
    flexDirection:'row'
  },
  toolbarButton:{
    width: 100,
  },
  toolbarTitle:{
    color:'#fff',
    textAlign:'center',
    fontWeight:'bold',
    flex:1
  }
});

module.exports = Toolbar;