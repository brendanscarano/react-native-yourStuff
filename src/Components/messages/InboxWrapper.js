'use strict';

import React, {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,


  CameraRoll
} from 'react-native';

import InboxItem from './InboxItem';


// DELETE
import NativeModules from 'NativeModules';
//

const InboxWrapper = React.createClass({

  componentDidMount() {

    CameraRoll.getPhotos({first: 1}).then((data) => {
      console.log(data.edges[0].node.image.uri);

      for (let i = 0; i < data.edges.length; i++) {
        console.log(data.edges[i].node.image.uri);
        NativeModules.ReadImageData.readImage(data.edges[i].node.image.uri, (imageBase64) => {

          // Using the full base64 image
          const encodeBase64data = encodeURIComponent(imageBase64);

          const obj = {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              'img': encodeBase64data
            })
          }

          // fetch('http://localhost:3000/saveImg', obj)
          //   .then((res) => {
          //     console.log(JSON.parse(res._bodyInit));
          //   })

          fetch('http://localhost:3000/firebaseSaveImg', obj)
            .then((res) => {
              console.log(res);
            })

        })
      }

    })


  },

  renderInboxRequests() {
    const inboxRequestsObj = this.props.inbox;

    return Object.keys(inboxRequestsObj).map((req, index) => {
      return (
        <InboxItem
          id={req}
          request={inboxRequestsObj[req]}
          key={index}
        />
      )
    })
  },

  render() {
    return (
      <View style={styles.container}>
        <Text>InboxWrapper Section</Text>
        {this.props.inbox ? this.renderInboxRequests() : null}
      </View>
    )
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 2,
    borderColor: 'orange',
    alignItems: 'center',
    alignSelf: 'stretch',
    backgroundColor: '#F5FCFF'
  }
});

module.exports = InboxWrapper;