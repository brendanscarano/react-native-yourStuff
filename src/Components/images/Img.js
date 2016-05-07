/**


NOT CURRENTLY BEING USED - MAY IMPLEMENT AGAIN LATER



*/




// 'use strict';

// import React, {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   Image,
//   TouchableHighlight
// } from 'react-native';

// import _ from 'lodash';
// import moment from 'moment';
// import Toolbar from '../common/Toolbar';

// const Img = React.createClass({

//   componentDidMount() {
//     console.log(this.props.extension);
//   },

//   saveImage(uri) {
//     console.log('selecting image to save')
//     // console.log(uri);
//   },

//   render() {

//     const dataFront = `data:image/${this.props.extension};base64,`;

//     console.log(dataFront);

//     return (
//       <View>
//       <Text>Img should be here:</Text>
//       <TouchableHighlight onPress={this.saveImage.bind(null, this.props.image)}>
//           <Image
//             style={styles.image}
//             source={{uri: `${dataFront}${this.props.image}`}}
//           />
//       </TouchableHighlight>
//       </View>
//     );

//   }

// });

// const styles = StyleSheet.create({
//   image: {
//     width: 100,
//     height: 100,
//     margin: 10,
//   },
// });

// module.exports = Img;