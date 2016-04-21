'use strict';

import React, {
  View,
  Text,
  StyleSheet,
  TouchableHighlight
} from 'react-native';

const RequestItem = React.createClass({

  getInitialState() {
    return {
      images: null
    }
  },

  componentDidMount() {
    // may want to move this to the image wrapper itself
    // so there are no unnecessary API calls
    fetch('http://localhost:3000/getImages')
      .then((res) => {
        const data = JSON.parse(res._bodyInit);
        this.setState({images: data.Contents })
      })
  },

  seeImages() {
    this.props.navigator.push({
      name: 'images',
      passProps: {
        images: this.state.images
      }
    })
  },

  render() {
    return (
      <View style={styles.requestItem}>
        <Text>{this.props.request.requestedUserName}'s Camera Roll from:</Text>
        <Text>{this.props.request.startDate} - {this.props.request.endDate}</Text>
        <Text>{this.props.request.accepted ? 'Accepted' : 'Not Accepted'}</Text>

        <TouchableHighlight
          style={styles.button}
          onPress={this.seeImages}
          underlayColor='red'>
          <Text>View</Text>
        </TouchableHighlight>
      </View>
    )
  }
});

const styles = StyleSheet.create({
  requestItem: {
    height: 75,
    borderWidth: 2,
    borderColor: 'red',
    alignSelf: 'stretch',
    backgroundColor: '#F5FCFF',
    position: 'relative'
  },
  button: {
    position: 'absolute',
    width: 100,
    height: 40,
    top: 14,
    right: 14,
    borderWidth: 1,
    borderColor: 'blue',
    borderRadius: 10
  }
});

module.exports = RequestItem;