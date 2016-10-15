

import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  View,
  ToolbarAndroid,
  TouchableOpacity,
  AppRegistry,
   Image,
  ListView,
  TouchableHighlight,
  RefreshControl,

} from 'react-native';



var _navigator;
var Api = require('./RssFeedApi');
var dateFormatApi=require('./DateFormat');

class HomePage extends Component {

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
//
// /* calling google api for parsing xml before loading the component */
//
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

	_navigateToSettings () {
		this.props.navigator.push({
      id: 'detailview',
      name: 'detailview',
      passProps: {
      position:rowID,
      jsoncontent: rowData
    }
		});
	}

	_onActionSelected () {
		//this._navigateToSettings()
	}

	render () {
		_navigator = this.props.navigator;
		return (
			<View style={styles.parentContainer}>
				<ToolbarAndroid
					title='Home'
					logo={require('./images/logo.png')}
                    actions={toolbarActions}
                    style={styles.toolbar}
                       titleColor='white'
                    onActionSelected={() => this._onActionSelected()}
        />
        <View style={styles.container}>
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
			</View>
		)
	}

  renderRow(rowData, sectionID, rowID, highlightRow: (sectionID: number, rowID: number) => void){
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
          <View style={{flexDirection: 'column'}}>
              <Text  style={styles.content_date}>
               Dated : {dateFormatApi(new Date(rowData.publishedDate),"dddd, mmmm dS, yyyy")}
              </Text>
               <Text  numberOfLines={3} style={styles.content_link}>
                Read On Web : {rowData.link}
               </Text>
                 
           </View>
        </View>
      </TouchableHighlight>

    )
  }
    _pressRow(rowID,rowData)
   {
      this.props.navigator.push({
        id: 'detailview',
        name: 'detailview',
        passProps: {
        position:rowID,
        jsoncontent: rowData
      }
      });

    }

}
var toolbarActions = [
	{title: 'detailview', icon: require('./images/info.png'), show: 'always'},
];
const styles = StyleSheet.create({
	parentContainer: {
		flex: 1,
	},
	container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  category :{
    marginRight: 10,

  },
  toolbar: {
  	height: 56,
    backgroundColor: '#000000',
    justifyContent: 'center'
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
  content_link:{
    fontSize: 10,
    marginTop: 3,
    textAlign:'justify',
    fontFamily: 'merriweather_regular'
  },
  content_date:{
    fontSize: 10,
    marginTop: 3,
    textAlign:'justify',
    fontFamily: 'merriweather_regular'
  },
  content_categories:{
    fontSize: 10,
    marginTop: 3,
    textAlign:'justify',
    fontFamily: 'merriweather_regular'
  },
  content_summary:
   {
     flex: 1,
     fontWeight: '300',
     fontSize: 10,
     marginTop: 10,
     textAlign:'justify',
     fontFamily: 'merriweather_regular'
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
      fontFamily: 'merriweather_black'
    },
    navbarstyle: {
      backgroundColor: '#000000',
       alignItems: 'center',
       height:50,
    }
});
module.exports=HomePage;
