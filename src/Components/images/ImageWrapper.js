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

const ImageWrapper = React.createClass({

  getInitialState() {
    return {
      images: null
    }
  },

  componentDidMount() {
    console.log(`http://localhost:3000/firebaseGetImages/${this.props.requestId}`)
    fetch(`http://localhost:3000/firebaseGetImages/${this.props.requestId}`)
      .then((res) => {
        if (res._bodyInit === '') {
          this.setState({images: 'no photos'});
        } else {
          console.log(res)
          this.setState({images: res._bodyInit});
        }
      })
  },

  displayPhotos() {
    if (this.state.images === 'no photos') {
      return (
        <Text>Sorry, no photos for these dates.</Text>
      )
    }

    const parsedImages = JSON.parse(this.state.images);
    console.log(parsedImages);
    return Object.keys(parsedImages).map((key, index) => {

      const imageString = parsedImages[key].base64String;
      const extension = parsedImages[key].ext;
      const dataFront = `data:image/${extension};base64,`;

      return (
        <Image
          key={index}
          style={styles.image}
          source={{uri: `${dataFront}${imageString}`}}
        />
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
        <ScrollView style={styles.scrollView}>
          <View style={styles.imageGrid}>
            {this.state.images ? this.displayPhotos() : null}
          </View>
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