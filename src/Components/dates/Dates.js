// 'use strict';

// import React, {
//   View,
//   Text,
//   StyleSheet,
//   TouchableHighlight,
//   AsyncStorage
// } from 'react-native';

// import Firebase from 'firebase';

// import StartDate from './StartDate';
// import EndDate from './EndDate';
// import Button from '../authentication/Button';

// const Dates = React.createClass({

//   getDefaultProps() {
//     return {
//       startDate: new Date(),
//       endDate: new Date()
//     }
//   },

//   getInitialState() {
//     return {
//       firebase: new Firebase('https://gimmie.firebaseio.com/requests'),
//       user: '',
//       startDate: this.props.startDate,
//       endDate: this.props.endDate
//     }
//   },

//   componentDidMount() {
//     AsyncStorage.getItem('user').then((value) => {
//       this.setState({user: value});
//     });
//   },

//   onStartDateChange(date) {
//     this.setState({startDate: date});
//   },

//   onEndDateChange(date) {
//     this.setState({endDate: date});
//   },

//   onBack() {
//     this.props.navigator.pop();
//   },

//   requestCameraRoll() {
//     this.state.firebase.push({
//       requester: this.state.user,
//       requestedUser: this.props.contactName,
//       startDate: 'April 5th 2016',
//       endDate: 'April 6th 2016'
//     })
//   },

//   render() {
//     return (
//       <View style={styles.container}>
//         <View style={styles.header}>
//           <TouchableHighlight
//             style={styles.button}
//             onPress={this.onBack}>
//             <Text>Back</Text>
//           </TouchableHighlight>
//           <Text style={styles.headerTitle}>
//             Gimmie
//           </Text>
//         </View>
//         <Text>
//           Request Photos/Videos from {this.props.contactName}
//         </Text>
//         <StartDate
//           style={styles.startDate}
//           onStartDateChange={this.onStartDateChange}
//           startDate={this.state.startDate}
//         />

//         <Button text={'Request Camera Roll'} onPress={this.requestCameraRoll} />
//       </View>
//     );
//   }
// });

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     borderWidth: 2,
//     borderColor: 'green',
//     justifyContent: 'center',
//     backgroundColor: '#F5FCFF'
//   },
//   header: {
//     backgroundColor:'#81c04d',
//     paddingTop: 30,
//     paddingBottom: 10,
//     flexDirection: 'row',
//   },
//   headerTitle: {
//     flex: 1,
//     textAlign: 'center',
//     fontWeight: 'bold'
//   },
//   button: {
//     width: 50
//   },
//   startDate: {
//     flex: 5
//   },
//   endDate: {
//     flex: 2
//   }
// });

// module.exports = Dates;

// // <ImageWrapper
// //   images={this.state.images}
// //   startDate={this.state.startDate}
// //   endDate={this.state.endDate}
// // />

// // <EndDate
// //   style={styles.endDate}
// //   onEndDateChange={this.onEndDateChange}
// //   endDate={this.state.endDate}
// // />