// https://facebook.github.io/react-native/docs/linking-libraries-ios.html#content

'use strict';

import React, {
  View,
  Text,
  StyleSheet,
  ScrollView,
  CameraRoll,
  Image
} from 'react-native';

import _ from 'lodash';
import moment from 'moment';

const ImageWrapper = React.createClass({

  displayPhotos() {
    return this.props.images.map((img, index) => {
      const photoTime = moment.unix(img.node.timestamp).format('MMM DD YYYY');
      const startTime = moment(this.props.startDate).format('MMM DD YYYY');
      const endTime = moment(this.props.endDate).format('MMM DD YYYY');
      if (moment(photoTime).isBetween(startTime, endTime)) {
        return (
          <View key={index}>
            <Image
              style={styles.image}
              source={{uri: img.node.image.uri}}
            />
            <Text>
              {moment.unix(img.node.timestamp).format('MMM DD YYYY')}
            </Text>
          </View>
        )
      }
    })
  },

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Image Wrapper
        </Text>
        <ScrollView contentContainerStyle={styles.imageGrid}>
          {this.props.images ? this.displayPhotos() : null}
        </ScrollView>
      </View>
    );
  }
});

const styles = StyleSheet.create({
  container: {
    width: 300,
    flex: 3,
    borderWidth: 2,
    borderColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  imageGrid: {
    flexDirection: 'column',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  image: {
    width: 100,
    height: 100,
    margin: 10,
  },
});

module.exports = ImageWrapper;
