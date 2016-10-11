import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  View,
  ToolbarAndroid,
  TouchableOpacity,
  AppRegistry,
  Image,
  ScrollView,
  ViewPagerAndroid,
  Navigator
  } from 'react-native';

var _navigator;

class DetailPage extends Component {

    constructor(props)
    {
      super(props);
    }

	render () {
		_navigator = this.props.navigator;
		return (
			<View style={styles.parentContainer}>
				<ToolbarAndroid
					title='Details'
					navIcon={require('./images/back_arrow.png')}
					onIconClicked={() => this.props.navigator.pop()}
          style={styles.toolbar}
          titleColor='white'
        />
				<View style={styles.container}>
          <ScrollView>
              <View style={styles.container}>
                  <Text style={styles.titleStyle}>
                    {this.props.jsoncontent.title}</Text>
                    <View style={styles.container}>
                      <Text style={styles.content_style}>
                              {this.props.jsoncontent.content}
                      </Text>
                    </View>
              </View>
           </ScrollView>
	      </View>
			</View>
		)
	}
}

var styles = StyleSheet.create({
	parentContainer: {
		flex: 1,
	},
	container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: '#F5FCFF',
  },
  toolbar: {
  	height: 56,
    backgroundColor: '#000000',
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 44,
    width: 200,
    backgroundColor: '#4883da',
    alignSelf: 'center',
    justifyContent: 'center'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  thumb: {
    width: 32,
    height: 32,
  },
  row:{
   flex:1,
   flexDirection:'row',
   padding:5,
   borderBottomWidth: 1,
   borderColor: '#d7d7d7',
 },
 selectionText:{
   fontSize:15,
   paddingTop:3,
   color:'#000000',
   textAlign:'right'
 },
 separator: {
   flex: 1,
   height: StyleSheet.hairlineWidth,
   backgroundColor: '#000000',
 },
 titleStyle: {
   fontSize:12,
   color: '#FF0000',
   fontSize:20

 },
 textStyle: {
   fontSize:12,
   color: '#FF0000',
   paddingTop:50,
   fontSize:36

 },
 content_style:
 {
   fontSize:10,
   color: '#000000',
   fontFamily:'merriweather_regular',
   textAlign: "justify"
 }

});




// ;
// class DetailPage extends Component
// {
//   constructor(props)
//   {
//     super(props);
//   }
//
//
//   render() {
//     return (
//       <Navigator
//           renderScene={this.renderScene.bind(this)}
//           navigator={this.props.navigator}
//           navigationBar={
//             <Navigator.NavigationBar style={styles.navbarstyle}
//                 routeMapper={NavigationBarRouteMapper} />
//           }
//            />
//    );
//
// }

//   );
// }
// }
//
// var NavigationBarRouteMapper = {
//   LeftButton(route, navigator, index, navState) {
//     return (
//       <TouchableOpacity style={{flex: 1, justifyContent: 'center'}}
//           onPress={() => navigator.parentNavigator.pop()}>
//         <Text style={{color: 'white', margin: 10,}}>
//           back
//         </Text>
//       </TouchableOpacity>
//     );
//   },
//   RightButton(route, navigator, index, navState) {
//     return null;
//   },
//   Title(route, navigator, index, navState) {
//     return (
//       <TouchableOpacity style={{flex: 1, justifyContent: 'center'}}>
//         <Text style={{color: '#FFFFFF', margin: 10, fontSize: 16}}>
//           List Detail Page
//         </Text>
//       </TouchableOpacity>
//     );
//   }
// };
//
//
//
// const styles = StyleSheet.create({
//   container: {
// flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#FFFFFF',
//   },

// });
module.exports=DetailPage;
