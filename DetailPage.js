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
  
  import Hr from './Hr';

var _navigator;
var dateFormatApi=require('./DateFormat');


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
				    <Hr lineColor='#b3b3b3'/> 
					 <View style={{flexDirection: 'row'}}>
                      <Image source={require('./images/img_like.png')} />
					  <Image source={require('./images/img_comment.png')} />
					  <Image source={require('./images/img_share.png')} />
                    </View>
              
                    <View style={{flexDirection: 'column'}}>
							<Text  style={styles.content_date}>
								Dated : {dateFormatApi(new Date(this.props.jsoncontent.publishedDate),"dddd, mmmm dS, yyyy")}
							</Text>
						  <Text style={styles.content_style}>
								  {this.props.jsoncontent.content}
						  </Text>
						    <Hr lineColor='#b3b3b3'/> 
						  <Text style={styles.content_categories}>
								  {this.props.jsoncontent.categories}
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
      fontSize:20,
      textAlign:'left',
      color: '#000000',
	  marginTop:10,
	  marginBottom:5,
      fontFamily: 'merriweather_black'
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
   textAlign: "justify",
   marginBottom:10
 },
 content_categories:{
    fontSize: 10,
    marginTop: 10,
    textAlign:'justify',
    fontFamily: 'merriweather_regular'
  },
 content_date:{
    fontSize: 10,
    marginTop: 5,
	marginBottom: 5,
    textAlign:'justify',
    fontFamily: 'merriweather_regular'
  }

});

module.exports=DetailPage;
