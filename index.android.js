import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
  BackAndroid
} from 'react-native';

var HomePage = require('./HomePage');
 var DetailPage = require('./DetailPage');

var _navigator;

/*
Android hardware back button handle
 */
BackAndroid.addEventListener('hardwareBackPress', () => {
  if (_navigator && _navigator.getCurrentRoutes().length > 1) {
    _navigator.pop();
    return true;
  }
  return false;
});

class App extends Component {

  _renderScene (route, navigator) {
    _navigator = navigator;
    switch (route.id) {
      case 'home':
        return (
          <HomePage navigator={navigator}/>
        )
      case 'detailview':
        return (
          <DetailPage navigator={navigator}  {...route.passProps}/>
        )
    }
  }

  render() {
    return (
      <Navigator
        initialRoute={{ id: 'home' }}
        renderScene={(route, navigator) => this._renderScene(route, navigator)}
      />
    );
  }
}

AppRegistry.registerComponent('blogapp', () => App);
