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

  changeValue(value) {

    this.setState({trueSwitchIsOn: value})

    // new Firebase('https://gimmie.firebaseio.com/requests/-KEdD0ahhPR-EAXec0sE').once('value', function(snap) {
    //    console.log(snap.val());
    // });

    const ref = new Firebase(`https://gimmie.firebaseio.com/requests/${this.props.id}`);

    if(value) {

      ref.child('accepted').set(true);

      CameraRoll.getPhotos({first: 3}).then((data) => {
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

            fetch('http://localhost:3000/firebaseSaveImg', obj)
              .then((res) => {
                console.log(res);
              })

          })
        }
      })

    } else {

      ref.child('accepted').set(false);

    }
  },

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