'use strict';

import React, {
  View,
  Text,
  StyleSheet,
  ScrollView
} from 'react-native';

import _ from 'lodash';
import Toolbar from '../common/Toolbar';
import Img from './Img';

const ImageWrapper = React.createClass({

  getInitialState() {
    return {
      images: null
    }
  },

  componentDidMount() {
    fetch('http://localhost:3000/firebaseGetImages')
      .then((res) => {
        this.setState({images: res._bodyInit});
      })
  },

  displayPhotos() {

    const parsedImages = JSON.parse(this.state.images);

    return Object.keys(parsedImages).map((img, index) => {

      const imageString = parsedImages[img].image;

      return (
        <View key={index}>
          <Img
            image={imageString}
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
          {this.state.images ? this.displayPhotos() : null}
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
    flexDirection: 'row'
  },
  image: {
    width: 100,
    height: 100
  },
});

module.exports = ImageWrapper;