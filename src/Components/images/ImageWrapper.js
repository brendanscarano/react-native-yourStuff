'use strict';

import React, {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableHighlight,
  Image
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

    console.log('loading the img wrapper');

    fetch('http://localhost:3000/firebaseGetImages')
      .then((res) => {
        this.setState({images: res._bodyInit});
      })
  },

  displayPhotos() {

    const parsedImages = JSON.parse(this.state.images);

    return Object.keys(parsedImages).map((key, index) => {

      const imageString = parsedImages[key].image;

      const extension = parsedImages[key].extension;

      console.log(extension);

      const dataFront = `data:image/${this.props.extension};base64,`;

      return (
        <Image
          key={index}
          style={styles.image}
          source={{uri: `${dataFront}${imageString}`}}
        />
      )
    })
  },

  /**
    return (
      <View key={index}>
        <Img
          image={imageString}
          extension={extension}
        />
      </View>
    )
  */

  render() {
    return (
      <View style={styles.container}>
        <Toolbar
          title='Image Wrapper'
          leftButtonTitle='Back'
          route={this.props.route}
          navigator={this.props.navigator}
        />
        <ScrollView style={styles.scrollView}>
          <View style={styles.imageGrid}>
            {this.state.images ? this.displayPhotos() : null}
          </View>
        </ScrollView>
      </View>
    );
  }
});

/**
render() {
  return (
      <ScrollView contentContainerStyle={styles.imageGrid}>
        {this.state.images ? this.displayPhotos() : null}
      </ScrollView>
    </View>
  );
}
*/

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 2,
    borderColor: 'yellow',
    backgroundColor: '#F5FCFF',
  },
  scrollView: {
    flex: 1
  },
  imageGrid: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  image: {
    width: 100,
    height: 100,
    margin: 10,
  },
});

module.exports = ImageWrapper;