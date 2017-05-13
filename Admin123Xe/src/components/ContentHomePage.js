import React, { Component } from 'react';
import {
	View, Image, ListView, StyleSheet, Dimensions,Text, ScrollView, TouchableOpacity
} from 'react-native';
import ViewPager from 'react-native-viewpager';
import ItemListPost from './ItemListPost';
import * as Progress from 'react-native-progress';

var deviceWidth = Dimensions.get('window').width;
var listItem = [];

export default class ContentHomePage extends Component {
	
	constructor(props) {
	  	super(props);

		var dataSource = new ViewPager.DataSource({
	 		pageHasChanged:(p1, p2) => p1 != p2,
		});
		
		var dataListView = new ListView.DataSource({
			rowHasChanged:(r1, r2) => r1 != r2,
		});

	  	this.state = {
	  		dataSourcePost: new ListView.DataSource({rowHasChanged:(r1,r2)=> r1 != r2}),
	  	};
	}

	componentWillMount(){
		this._createListItem();
	}

	_createListItem(){
		
		var dataAdmin = this.props.dataAdmin;
		var arr =[];
		for (i=0; i<dataAdmin.length; i++){
			var data = JSON.parse(dataAdmin[i]._bodyInit).data.post;
			arr.push(data);
		}
		this.setState ({
			dataSourcePost: this.state.dataSourcePost.cloneWithRows(arr),
		});

	}

	_openPostDetail(post){
		console.log('open ...'+typeof post);
		var fromComponent = {
			fromHome:true,
			fromDetail:false,
		}
		this.props.navigator.push({id:'detailpost', post:post, fromComponent: fromComponent})
	}

	_openEditPost(post){
		this.props.navigator.push({id:'editpost', post:post, isDraft:false })
	}

	render() {

		return (


			<ListView
				style = {{opacity:this.props.opacity}}
				pagingEnabled = {true}
				initialListSize = {5}
				enableEmptySections={true}
				dataSource = {this.state.dataSourcePost}
				renderRow = {(rowData)=> this._renderPostbyIdCategory(rowData)}
				onEndReached = {()=>{this.props.onScrollEnd()}}
				renderFooter = {()=>{
					return (
						<View style={{justifyContent:'center', alignItems:'center', backgroundColor:'#e0e0e0', padding:5}}>
							<Progress.Circle 
								size={15} 
								color = '#2196f3'
								radius = {15}
								direction = 'clockwise'
								animated = {true}
								//style = {{flexDirection:'row'}}
								indeterminate={true} 
							/>
						</View>
					)
				}}
			/>
		);
	}

	componentWillReceiveProps(nextProps){

		console.log("reload");  // update dataAdmin in HomePage, reload voi Props moi
		if (this.props.dataAdmin !== nextProps.dataAdmin){
			var dataAdmin = nextProps.dataAdmin;
			var arr =[];
			for (i=0; i<dataAdmin.length; i++){
				var data = JSON.parse(dataAdmin[i]._bodyInit).data.post;
				arr.push(data);
			}
			this.setState ( {
				dataSourcePost: this.state.dataSourcePost.cloneWithRows(arr),
			});
		}
	}

	_renderPostbyIdCategory(data){
		return (
			<TouchableOpacity  
				key={i}
				activeOpacity = {0.8}
				focusedOpacity = {0.8}
				onPress = {()=>this._openPostDetail(data)}
			>		
				<ItemListPost 
					key={i} 
					dataItemListView={data} 
					navigator = {this.props.navigator} 
					sessionKey = {this.props.sessionKey}
					updateListData = {this.props.updateListData}
					/>
			</TouchableOpacity>
		)
	}
}
var styles = StyleSheet.create({
	container:{
		flex:1,
  		
	},
	viewpager:{
		justifyContent:'center',
		paddingTop:1,
		flex:0.5,
	},
	page: {
    	flex:1,
    	height:250,
    	justifyContent:'flex-end',

  	},
  	textViewPager:{
  		fontSize:20,
  		fontWeight:'bold',
  		color:'white',
  	}
});

/*			<ScrollView>
				<View style={styles.viewpager}>
					<ViewPager
						ref = {(viewpager)=> {this.viewpager = viewpager}}
						style = {this.props.style}
						dataSource = {this.state.dataSource}
						renderPage = {(data, pageID)=>this._renderPage(data, pageID)}
						isLoop = {true}
						autoPlay = {true}
						initialPage = {0}
						>
					</ViewPager>
				</View>

				{listItem}

			</ScrollView>*/