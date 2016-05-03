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
    // console.log(this.props);
    fetch('http://localhost:3000/firebaseGetImages')
      .then((res) => {
        // console.log(res);
        // console.log(res._bodyInit);
        this.setState({images: res._bodyInit});

        // console.log(this.state.images);
        // _.forEach(this.state.images, (img) =>{
        //   console.log(img);
        // });
      })
  },

  displayPhotos() {

    // console.log(this.state.images);
    const parsedImages = JSON.parse(this.state.images);
    const img = parsedImages['-KGsZeeqxU2bMupysY5I'];
    // const img = this.state.images['-KGsZeeqxU2bMupysY5I'].image;

    console.log(img);

    return (
            <Img
              image={img}
            />
    );
    /**
      <Text>Hello World</Text>
            */

    // return this.state.images.map((img, index) => {
    //   console.log(img);
    //   return (
    //     <View key={index}>
    //       <Img
    //         image={img}
    //       />
    //     </View>
    //   )
    // })
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