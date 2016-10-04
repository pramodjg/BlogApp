
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Image,
  Text,
  ListView,
  TouchableHighlight,
  TouchableOpacity,
  Navigator,
  RefreshControl,
  View,
} from 'react-native';

import news_items from './mock_data.json';
//var news_items = require("./mock_data.json");


class HomePage extends Component
{
  // Initialize the hardcoded data
  constructor(props)
  {
    super(props);
    this.state = {
      refreshing: false,
    };
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
                  dataSource: ds.cloneWithRows(news_items),
                  username:"Test User"

                 };
  }
  _onRefresh() {
    this.setState({refreshing: true});
    fetchData().then(() => {
      this.setState({refreshing: false});
    });
  }
  render()
  {
    return (
    <Navigator
        renderScene={this.renderScene.bind(this)}
        navigationBar={
                          <Navigator.NavigationBar style={styles.navbarstyle}
                          routeMapper={NavigationBarRouteMapper} />
                        }
      />
  );

  }
  renderScene(route, navigator) {
    return (

      <View style={{paddingTop: 22,flex:1}}>
        <ListView
         showLoadMore={true}
         initialListSize={10}
         refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh.bind(this)}
          />
        }
          dataSource={this.state.dataSource}
          renderRow={this.renderRow.bind(this)}
          renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator}/>}
        />
      </View>
    );
  }
  componentDidMount(){

       this.setState({ dataSource: this.state.dataSource.cloneWithRows(news_items) });

     }
  renderRow(rowData, sectionID, rowID, highlightRow: (sectionID: number, rowID: number) => void){
  //   var rowHash = Math.abs(hashCode(rowData));

    return (
      <TouchableHighlight
        underlayColor = '#F0F0F0'
        onPress={() => {
         this._pressRow(rowID,rowData);
        highlightRow(sectionID, rowID);
        }}
        >
        <View style ={styles.row}>
          <Text style={styles.textStyle}>{rowData.title}</Text>

          <View style={{flexDirection: 'row'}}>
               <Text numberOfLines={3} style={styles.content_summary}>
                 {rowData.description}
               </Text>
           </View>
        </View>
      </TouchableHighlight>

    )
  }

  _pressRow(rowID,rowData) {


    this.props.navigator.push({
      id: 'DetailPage',
      name: 'DetailPage',
      passProps: {
      position:rowID,
      jsoncontent: rowData

    }
    });

  }
}
var hashCode = function(str) {
  var hash = 15;
  for (var ii = str.length - 1; ii >= 0; ii--) {
    hash = ((hash << 5) - hash) + str.charCodeAt(ii);
  }
  return hash;
};


const styles = StyleSheet.create({
  container: {

    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF0000',
  },
  content_summary:
  {
    flex: 1,
    fontWeight: '300',
    fontSize: 10,
    marginTop: 10,
    textAlign:'justify',

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
   flexDirection:'column',//'row'
   padding:10,
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
 textStyle: {
   fontSize:12,
   textAlign:'left',
   color: '#000000',
 },
 navbarstyle: {
   backgroundColor: '#000000',
    alignItems: 'center',
    height:50,
 }
});
var NavigationBarRouteMapper = {
  LeftButton(route, navigator, index, navState) {
    return null;
  },
  RightButton(route, navigator, index, navState) {
    return null;
  },
  Title(route, navigator, index, navState) {
    return (
      <TouchableOpacity style={{flex: 1, justifyContent: 'center'}}>
        <Text style={{color: 'white', margin: 10, fontSize: 16}}>
          React List Demo
        </Text>
      </TouchableOpacity>
    );
  }
};

module.exports = HomePage;
