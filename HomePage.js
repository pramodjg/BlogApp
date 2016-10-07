
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


var Api = require('./RssFeedApi');

class HomePage extends Component
{
  // Initialize the hardcoded data
  constructor(props)
  {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
                  ds:null,
                  dataSource: ds,
                  username:"Test User",
                  refreshing: false,
                  isLoading: false
                 };
  }

  _addFeed() {
    const url='https://lightrains.com/feed.xml';
    Api.fetchRss(url).then((res) => {
      if (res.responseStatus == 200) {
        var resFeed = res.responseData.feed;
        this.setState({dataSource:this.state.dataSource.cloneWithRows(resFeed.entries)});
        this.setState({refreshing: false});
      }
    });
  }

/* calling google api for parsing xml before loading the component */

  componentWillMount()
  {

    const url='https://lightrains.com/feed.xml';
    Api.fetchRss(url).then((res) => {
      if (res.responseStatus == 200) {
        var resFeed = res.responseData.feed;
        // this.setState({ds: resFeed.entries});
        // this.setState({dataSource:ds});
        this.setState({dataSource:this.state.dataSource.cloneWithRows(resFeed.entries)});
        this.setState({refreshing: false});
      }
    });

  }
  _onRefresh()
  {
    this.setState({refreshing: true});
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
            onRefresh={this._addFeed.bind(this)}
          />
        }
          dataSource={this.state.dataSource}
          renderRow={this.renderRow.bind(this)}
          renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator}/>}
        />
      </View>
    );
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
                {rowData.contentSnippet}
               </Text>
           </View>
        </View>
      </TouchableHighlight>

    )
  }

  _pressRow(rowID,rowData)
 {

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
