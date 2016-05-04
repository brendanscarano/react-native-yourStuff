'use strict';

import React, {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableHighlight
} from 'react-native';

import _ from 'lodash';
import moment from 'moment';
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

        // console.log(this.state.images);
        // _.forEach(this.state.images, (img) =>{
        //   console.log(img);
        // });
      })
  },

  displayPhotos() {

    // console.log(this.state.images);

    /**

      LOOP THROUGH ALL THE IMAGES AND HAVE THEM DISPLAY HERE PROPERLY!

    */


    const parsedImages = JSON.parse(this.state.images);
    // const img = parsedImages['-KGsZeeqxU2bMupysY5I'];

    const displayImages = [];

    /**
    _.forEach(parsedImages, (img, index) => {
      console.log(img);
      displayImages.push(
        <View key={index}>
          <Img
            image={img.image}
          />
        </View>
      );
    });
    // const img = this.state.images['-KGsZeeqxU2bMupysY5I'].image;

    console.log(img);
    return displayImages;
    */
    // return _.map(parsedImages, (img, index) => {
    //   return (
    //     <View key={index}>
    //       <Img
    //         image={img.image}
    //       />
    //     </View>
    //   )
    // })

    return Object.keys(parsedImages).map((img, index) => {

      const imageString = parsedImages[img].image;
      console.log(imageString);

      return (
        <View key={index}>
          <Img
            image={imageString}
          />
        </View>
      )
    })
  },

  /**
    return (
      <Img
        image={img}
      />
    );

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