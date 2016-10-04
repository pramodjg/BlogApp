import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Image,
  Text,
  ListView,
  TouchableHighlight,
   TouchableOpacity,
   ScrollView,
   ViewPagerAndroid,
  Navigator,
  View
} from 'react-native';

import news_items from './mock_data.json';

class DetailPage extends Component
{
  constructor(props)
  {
    super(props);
  }
  render() {
    return (
      <Navigator
          renderScene={this.renderScene.bind(this)}
          navigator={this.props.navigator}
          navigationBar={
            <Navigator.NavigationBar style={styles.navbarstyle}
                routeMapper={NavigationBarRouteMapper} />
          }
           />
   );

}
renderScene(route, navigator) {


  return (
    <ScrollView style={{flex: 1}}>
      <View style={styles.container}>
          <Text style={styles.titleStyle}>
            {this.props.jsoncontent.title}</Text>
            <View style={styles.container}>
              <Text>
                      {this.props.jsoncontent.content}
              </Text>
            </View>
      </View>
    </ScrollView>
  );
}
}

var NavigationBarRouteMapper = {
  LeftButton(route, navigator, index, navState) {
    return (
      <TouchableOpacity style={{flex: 1, justifyContent: 'center'}}
          onPress={() => navigator.parentNavigator.pop()}>
        <Text style={{color: 'white', margin: 10,}}>
          back
        </Text>
      </TouchableOpacity>
    );
  },
  RightButton(route, navigator, index, navState) {
    return null;
  },
  Title(route, navigator, index, navState) {
    return (
      <TouchableOpacity style={{flex: 1, justifyContent: 'center'}}>
        <Text style={{color: '#FFFFFF', margin: 10, fontSize: 16}}>
          List Detail Page
        </Text>
      </TouchableOpacity>
    );
  }
};



const styles = StyleSheet.create({
  container: {
flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
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
   paddingTop:50,
   fontSize:20

 },
 textStyle: {
   fontSize:12,
   color: '#FF0000',
   paddingTop:50,
   fontSize:36

 },
 navbarstyle: {
   backgroundColor: '#000000',
    alignItems: 'center',
    height:50,
 }
});
module.exports=DetailPage;
