'use strict';

import React, {
  View,
  Text,
  StyleSheet,
  TouchableHighlight
} from 'react-native';

const Toolbar = React.createClass({

  render() {
    return (
      <View>
        <View style={styles.toolbar}>
          <Text style={styles.toolbarButton}>Add</Text>
          <Text style={styles.toolbarTitle}>This is the title</Text>
          <Text style={styles.toolbarButton}>Like</Text>
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
    width: 50,
    color:'#fff',
    textAlign:'center'
  },
  toolbarTitle:{
    color:'#fff',
    textAlign:'center',
    fontWeight:'bold',
    flex:1
  }
});

module.exports = Toolbar;