'use strict';

import React, {
  View,
  Text,
  StyleSheet
} from 'react-native';

import Emoji from 'react-native-emoji';
import Toolbar from '../common/Toolbar';

const NoContactErrorScreen = React.createClass({
  render() {
    return (
      <View style={styles.container}>
        <Toolbar
          leftButtonTitle='Back'
          route={this.props.route}
          navigator={this.props.navigator}
        />

        <View style={styles.textWrapper}>
          <Text><Emoji name='weary'/> Oh man!</Text>
          <Text>It looks like [insert name here] doesn't have Gimme</Text>
          <Text>Click the button below and well send them a text inviting them to install it!</Text>
        </View>
      </View>
    )
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 2,
    borderColor: 'yellow',
    backgroundColor: '#F5FCFF'
  },
  textWrapper: {
    backgroundColor:'#81c04d',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

module.exports = NoContactErrorScreen;