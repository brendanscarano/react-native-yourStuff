'use strict';

import React, {
  View,
  Text,
  StyleSheet,
  ScrollView,
  CameraRoll,
  Image,
  NativeModules
} from 'react-native';

import _ from 'lodash';
import moment from 'moment';
import Toolbar from './Components/common/Toolbar';

const ImageWrapper = React.createClass({

  getInitialState() {
    return {
      images: null
    }
  },

  componentDidMount() {

    CameraRoll.getPhotos({first: 25})
      .then((data) => {

        const testimages = [];

        for (let i = 0; i < data.edges.length; i++) {

          const img = {
            node: data.edges[i].node
          }

          NativeModules.ReadImageData.readImage(data.edges[i].node.image.uri, (imageBase64) => {
            img.base64 = imageBase64;
          });

          testimages.push(img);

        }

        console.log(testimages);

        this.setState({
          images: testimages
        });

      })
  },

  displayPhotos() {

    console.log(this.state.images);
    console.log(this.state.images[0]);
    console.log(this.state.images[0]['base64']);

    return this.state.images.map((img, index) => {

      const photoTime = moment.unix(img.node.timestamp).format('MMM DD YYYY');
      const startTime = moment(this.props.startDate).format('MMM DD YYYY');
      const endTime = moment(this.props.endDate).format('MMM DD YYYY');

      return (
        <View key={index}>
          <Image
            style={styles.image}
            source={{uri: `data:image/png;base64,${img.base64}`, scale: 3}}
          />
          <Text>
            {moment.unix(img.node.timestamp).format('MMM DD YYYY')}
          </Text>
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

  // displayPhotos() {
  //   return this.state.images.map((img, index) => {
  //     const photoTime = moment.unix(img.node.timestamp).format('MMM DD YYYY');
  //     const startTime = moment(this.props.startDate).format('MMM DD YYYY');
  //     const endTime = moment(this.props.endDate).format('MMM DD YYYY');
  //     if (moment(photoTime).isBetween(startTime, endTime)) {
  //       return (
  //         <View key={index}>
  //           <Image
  //             style={styles.image}
  //             source={{uri: img.node.image.uri}}
  //           />
  //           <Text>
  //             {moment.unix(img.node.timestamp).format('MMM DD YYYY')}
  //           </Text>
  //         </View>
  //       )
  //     }
  //   })
  // },

// // puzzle picture
// var base64Icon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEsAAABLCAQAAACSR7JhAAADtUlEQVR4Ac3YA2Bj6QLH0XPT1Fzbtm29tW3btm3bfLZtv7e2ObZnms7d8Uw098tuetPzrxv8wiISrtVudrG2JXQZ4VOv+qUfmqCGGl1mqLhoA52oZlb0mrjsnhKpgeUNEs91Z0pd1kvihA3ULGVHiQO2narKSHKkEMulm9VgUyE60s1aWoMQUbpZOWE+kaqs4eLEjdIlZTcFZB0ndc1+lhB1lZrIuk5P2aib1NBpZaL+JaOGIt0ls47SKzLC7CqrlGF6RZ09HGoNy1lYl2aRSWL5GuzqWU1KafRdoRp0iOQEiDzgZPnG6DbldcomadViflnl/cL93tOoVbsOLVM2jylvdWjXolWX1hmfZbGR/wjypDjFLSZIRov09BgYmtUqPQPlQrPapecLgTIy0jMgPKtTeob2zWtrGH3xvjUkPCtNg/tm1rjwrMa+mdUkPd3hWbH0jArPGiU9ufCsNNWFZ40wpwn+62/66R2RUtoso1OB34tnLOcy7YB1fUdc9e0q3yru8PGM773vXsuZ5YIZX+5xmHwHGVvlrGPN6ZSiP1smOsMMde40wKv2VmwPPVXNut4sVpUreZiLBHi0qln/VQeI/LTMYXpsJtFiclUN+5HVZazim+Ky+7sAvxWnvjXrJFneVtLWLyPJu9K3cXLWeOlbMTlrIelbMDlrLenrjEQOtIF+fuI9xRp9ZBFp6+b6WT8RrxEpdK64BuvHgDk+vUy+b5hYk6zfyfs051gRoNO1usU12WWRWL73/MMEy9pMi9qIrR4ZpV16Rrvduxazmy1FSvuFXRkqTnE7m2kdb5U8xGjLw/spRr1uTov4uOgQE+0N/DvFrG/Jt7i/FzwxbA9kDanhf2w+t4V97G8lrT7wc08aA2QNUkuTfW/KimT01wdlfK4yEw030VfT0RtZbzjeMprNq8m8tnSTASrTLti64oBNdpmMQm0eEwvfPwRbUBywG5TzjPCsdwk3IeAXjQblLCoXnDVeoAz6SfJNk5TTzytCNZk/POtTSV40NwOFWzw86wNJRpubpXsn60NJFlHeqlYRbslqZm2jnEZ3qcSKgm0kTli3zZVS7y/iivZTweYXJ26Y+RTbV1zh3hYkgyFGSTKPfRVbRqWWVReaxYeSLarYv1Qqsmh1s95S7G+eEWK0f3jYKTbV6bOwepjfhtafsvUsqrQvrGC8YhmnO9cSCk3yuY984F1vesdHYhWJ5FvASlacshUsajFt2mUM9pqzvKGcyNJW0arTKN1GGGzQlH0tXwLDgQTurS8eIQAAAABJRU5ErkJggg==';

// // charzard
// var base64Icon2 = 'data:image/png;base64,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';

// // blurry star picture
// const base64Icon3 = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAwBQTFRF7c5J78kt+/Xm78lQ6stH5LI36bQh6rcf7sQp671G89ZZ8c9V8c5U9+u27MhJ/Pjv9txf8uCx57c937Ay5L1n58Nb67si8tVZ5sA68tJX/Pfr7dF58tBG9d5e8+Gc6chN6LM+7spN1pos6rYs6L8+47hE7cNG6bQc9uFj7sMn4rc17cMx3atG8duj+O7B686H7cAl7cEm7sRM26cq/vz5/v767NFY7tJM78Yq8s8y3agt9dte6sVD/vz15bY59Nlb8txY9+y86LpA5LxL67pE7L5H05Ai2Z4m58Vz89RI7dKr+/XY8Ms68dx/6sZE7sRCzIEN0YwZ67wi6rk27L4k9NZB4rAz7L0j5rM66bMb682a5sJG6LEm3asy3q0w3q026sqC8cxJ6bYd685U5a457cIn7MBJ8tZW7c1I7c5K7cQ18Msu/v3678tQ3aMq7tNe6chu6rgg79VN8tNH8c0w57Q83akq7dBb9Nld9d5g6cdC8dyb675F/v327NB6////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/LvB3QAAAMFJREFUeNpiqIcAbz0ogwFKm7GgCjgyZMihCLCkc0nkIAnIMVRw2UhDBGp5fcurGOyLfbhVtJwLdJkY8oscZCsFPBk5spiNaoTC4hnqk801Qi2zLQyD2NlcWWP5GepN5TOtSxg1QwrV01itpECG2kaLy3AYiCWxcRozQWyp9pNMDWePDI4QgVpbx5eo7a+mHFOqAxUQVeRhdrLjdFFQggqo5tqVeSS456UEQgWE4/RBboxyC4AKCEI9Wu9lUl8PEGAAV7NY4hyx8voAAAAASUVORK5CYII=';
