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

const Img = React.createClass({

  componentDidMount() {
    console.log(this.props.image);
  },

  saveImage(uri) {
    console.log('selecting image to save')
    console.log(uri);
  },

  render() {
    const URL = `https://s3.amazonaws.com/gimme-photo-test/`;

    const dataFront = 'data:image/png;base64,';

    return (
      <TouchableHighlight onPress={this.saveImage.bind(null, this.props.image)}>
          <Image
            style={styles.image}
            source={{uri: `${dataFront}${this.props.image.image}`}}
          />
      </TouchableHighlight>
    );
  }
});

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
    margin: 10,
  },
});

module.exports = Img;