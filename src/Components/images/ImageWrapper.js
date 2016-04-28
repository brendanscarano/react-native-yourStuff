'use strict';

import React, {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image
} from 'react-native';

import _ from 'lodash';
import moment from 'moment';
import Toolbar from '../common/Toolbar';

const ImageWrapper = React.createClass({

  componentDidMount() {
    console.log(this.props);
  },

  displayPhotos() {
    return this.props.images.map((img, index) => {

      const URL = `https://s3.amazonaws.com/gimme-photo-test/`;
      console.log(img);

      return (
        <View key={index}>
          <Image
            style={styles.image}
            source={{uri: `${URL}${img.Key}`}}
          />
        </View>
      )
    })
  },

  render() {
    return (
      <View style={styles.container}>
        <Toolbar
          title='Image Wrapper'
          leftButtonTitle='Back'
          route={this.props.route}
          navigator={this.props.navigator}
        />
        <ScrollView contentContainerStyle={styles.imageGrid}>
          {this.props.images ? this.displayPhotos() : null}
        </ScrollView>
      </View>
    );
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 2,
    borderColor: 'yellow',
    backgroundColor: '#F5FCFF',
  },
  imageGrid: {
    flex: 1,
    flexDirection: 'row',
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