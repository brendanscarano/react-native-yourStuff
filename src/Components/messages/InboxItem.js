'use strict';

import React, {
  View,
  Text,
  StyleSheet,
  Switch,
  CameraRoll
} from 'react-native';

import Emoji from 'react-native-emoji';
import NativeModules from 'NativeModules';
import _ from 'lodash';

const InboxItem = React.createClass({

  getInitialState() {
    return {
      trueSwitchIsOn: false
    }
  },

  componentDidMount() {
    if(this.props.request.accepted) {
      this.setState({trueSwitchIsOn: true})
    } else {
      this.setState({trueSwitchIsOn: false})
    }
  },

  convertPhoto(imageBase64) {
    return new Promise((resolve) => {
      const extLocation = imageBase64.search('ext=');

      // ie: 'png, jpg, etc'
      const extType = imageBase64.slice(extLocation, imageBase64.length).replace('ext=', '');

      let base64String;

      NativeModules.ReadImageData.readImage(imageBase64, (base64String) => {
        base64String = base64String;
        resolve({ext: extType, base64String: base64String});
      })

    });
  },

  changeValue(value) {
    this.setState({trueSwitchIsOn: value})

    const ref = new Firebase(`https://gimmie.firebaseio.com/requests/${this.props.id}`);

    if (value) {
      ref.child('accepted').set(true);

      CameraRoll.getPhotos({first: 2}).then((data) => {
        const allData = [];

        data.edges.forEach((dataNode, index) => {

          this.convertPhoto(dataNode.node.image.uri)
            .then((resolve) => {
              allData.push(resolve);
              if (allData.length === data.edges.length) {
                console.log(allData)
                const obj = {
                  method: 'POST',
                  headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    'imgArray': allData,
                    'requestId': this.props.id,
                  })
                }

                fetch('http://localhost:3000/firebaseSaveImg', obj)
                  .then((res) => {
                    console.log(res);
                  });
              }

            });
        });



      }); // CameraRoll.getPhotos

    } else {
      ref.child('accepted').set(false);
    }
  },

  // changeValue(value) {
  //   this.setState({trueSwitchIsOn: value})

  //   const ref = new Firebase(`https://gimmie.firebaseio.com/requests/${this.props.id}`);

  //   if (value) {
  //     ref.child('accepted').set(true);

  //     CameraRoll.getPhotos({first: 2}).then((data) => {
  //       // console.log(this.photosToBase64(data));
  //       console.log(data);

  //       return _.map(data.edges, (dataNode) => {

  //         const uri = dataNode.node.image.uri;

  //         const extLocation = uri.search('ext=');

  //         // ie: 'png, jpg, etc'
  //         const extType = uri.slice(extLocation, uri.length).replace('ext=', '');

  //         const base64String = NativeModules.ReadImageData.readImage(uri, (base64String) => {

  //           const obj = {
  //             method: 'POST',
  //             headers: {
  //               'Accept': 'application/json',
  //               'Content-Type': 'application/json',
  //             },
  //             body: JSON.stringify({
  //               'img': base64String,
  //               'extension': extType,
  //               'requestId': this.props.id,
  //             })
  //           }

  //           fetch('http://localhost:3000/firebaseSaveImg', obj)
  //             .then((res) => {
  //               console.log(res);
  //             })

  //         }) // NativeModules.ReadImageData

  //       }) // _.map

  //     }); // CameraRoll.getPhotos

  //   } else {
  //     ref.child('accepted').set(false);
  //   }
  // },

  render() {
    return (
      <View style={styles.inboxItem}>
        <View style={styles.textWrapper}>
          <Text>{this.props.request.yourName} requested your Camera Roll from:</Text>
          <Text>{this.props.request.startDate} - {this.props.request.endDate}</Text>
        </View>
        <View style={styles.toggleWrapper}>
          <Emoji name='-1'/>
          <Switch
            onValueChange={
              (value) => {
                this.changeValue(value);
              }
            }
            style={{marginBottom: 10}}
            value={this.state.trueSwitchIsOn} />
          <Emoji name='+1'/>
        </View>
      </View>
    )
  }
});

const styles = StyleSheet.create({
  inboxItem: {
    flexDirection: 'row',
    height: 70,
    borderWidth: 2,
    borderColor: 'red',
    alignSelf: 'stretch',
    backgroundColor: '#F5FCFF'
  },
  textWrapper: {
    position: 'absolute',
    left: 0
  },
  toggleWrapper: {
    flexDirection: 'row',
    position: 'absolute',
    right: 0
  }
});

module.exports = InboxItem;


    // new Firebase('https://gimmie.firebaseio.com/requests/-KEdD0ahhPR-EAXec0sE').once('value', function(snap) {
    //    console.log(snap.val());
    // });

// photosToBase64(data) {
//   // NEEDS TO RETURN base64Array AFTER EVERYTHING HAS LOOPED
//   return _.map(data.edges, (dataNode) => {
//     const imgDataString = dataNode.node.image.uri;

//     // return dataNode.node.image.uri;
//     return NativeModules.ReadImageData.readImage(imgDataString, (imageBase64) => {

//       console.log('reading base64 string');
//       const extLocation = imgDataString.search('ext=');

//       // ie: 'png, jpg, etc'
//       const extType = imgDataString.slice(extLocation, imgDataString.length).replace('ext=', '');

//       // Using the full base64 image
//       // const encodeBase64data = encodeURIComponent(imageBase64);
//       console.log({ext: extType, base64String: imageBase64});

//       return {ext: 'extType', base64String: imageBase64}
//     })
//   })
// },