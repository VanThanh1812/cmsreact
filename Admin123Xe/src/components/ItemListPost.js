import React, { Component } from 'react';
import{
	TouchableOpacity, Dimensions, View, Image, Text, StyleSheet, Alert
} from 'react-native';
import {
	Card, Button
} from 'react-native-material-design';
import Toast from 'react-native-simple-toast';
import MaterialDialog from 'react-native-material-dialogs';

import deletePost from '../function/deletePost';

var deviceWidth = Dimensions.get('window').width;

/*
	{
		id:
		abstraction:
		createAt:
		owner:{
			displayName:
			email:
		}
		title:
		updateAt:
	}
*/

export default class ItemListPost extends Component {

	constructor(props) {
	  super(props);
	}

	_convertTime(time){
		var d = new Date(time*1000);
		return d.toString();
	}

	_getThumbnail(dataItemListView){
		var media = dataItemListView.medias[0];
		return media.href;
	}

	_gotoEditForm(dataItemListView){
			post = {
				title: dataItemListView.title,
				abstraction : dataItemListView.abstraction,
				tags : dataItemListView.tags,
				body: dataItemListView.body, 
				categories: dataItemListView.categories[0],
			}

			this.props.navigator.push({id:'editform', post:dataItemListView});
		}

	_deletePost(id){
		var sessionKey = this.props.sessionKey;
		Alert.alert('Xóa bài viết', 'Bạn có chắc muốn xóa bài viết này?',[
				{
					text:'Cancel',
					onPress:()=>{

					},
					style:'cancel'
				},
				{
					text:'Xóa',
					onPress:()=>{
						this.delete(id, sessionKey);
					}
				}
			],{
				cancelable: false
			})
	}

	async delete(id, sessionKey){
		var result = await deletePost(id, sessionKey);
		if (result){
			this.props.updateListData();
		}
	}

	_showCommentPost(dataItemListView){
		console.log(dataItemListView);
		if (dataItemListView.likeCount == 0){
			Toast.show('Không có bình luận nào');
			return ;
		}
		this.props.navigator.push({id:'commentpost', post:dataItemListView});
	}

	render() {
		var dataItemListView = this.props.dataItemListView;
		source = (dataItemListView.medias !== null)? {uri:this._getThumbnail(dataItemListView)} : require('../images/no-image.jpg');
		console.log(dataItemListView.likeCount);
		return (
			<View style= {{backgroundColor:'#e0e0e0'}}>
				<Card elevation = {4}>
					<Card.Media
                        image={<Image  
                        			source={source}/>}
                        overlay
                    >
                    	<Text style = {{color:'white',fontWeight:'bold', fontSize:16}}>{dataItemListView.title}</Text>
                    </Card.Media>
                    <Card.Body>
                        <Text  style={{color:'black', fontWeight:'bold', opacity:0.75, }}>{dataItemListView.abstraction}...</Text>
                        <Text  style={{fontSize:12,marginTop:10}}>{this._convertTime(dataItemListView.createAt)}</Text>
                   	    <Text  style={{fontSize:14, fontWeight:'bold', color:'black', opacity:0.60, }}>Admin {dataItemListView.owner.displayName}</Text>
                   		<Text style={{fontSize:14, color:'black', opacity: 0.60}}>
                   		  Lượt thích: {(dataItemListView.likeCount == undefined) ? 0 : dataItemListView.likeCount}
                   		</Text>
                   		<Text style={{fontSize:14, color:'black', opacity: 0.60}}>
                   		  Lượt xem: {(dataItemListView.viewCount == undefined) ? 0 : dataItemListView.likeCount}
                   		</Text>
                    </Card.Body>
                    <Card.Actions position="right">
                    	
                    	<TouchableOpacity 
                    		onPress = {()=> this._deletePost(dataItemListView.id)}
                    		style={{padding:10,}}>
                    		<Text style={{fontSize:15, fontWeight:'bold', color:'#2196f3'}}>
                    		  Xóa
                    		</Text>
                    	</TouchableOpacity>
                    	<TouchableOpacity 
                    		onPress = {()=> this._gotoEditForm(dataItemListView)}
                    		style={{padding:10}}>
                    		<Text style={{fontSize:15, fontWeight:'bold', color:'#2196f3'}}>
                    		  Chỉnh sửa
                    		</Text>
                    	</TouchableOpacity>
                    	<TouchableOpacity 
                    		onPress = {()=> this._showCommentPost(dataItemListView)}
                    		style={{padding:10}}>
                    		<Text style={{fontSize:15, fontWeight:'bold', color:'#2196f3'}}>
                    		  Xem bình luận
                    		</Text>
                    	</TouchableOpacity>
                    </Card.Actions>
					
					{/*backgroundColor*/}
                    
                    
				</Card>
			</View>
			
		);
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
    	justifyContent:'flex-end',
  	},
  	textViewPager:{
  		fontSize:20,
  		fontWeight:'bold',
  		color:'#000',
  		opacity:0.80
  	},
  	textMore:{
  		flex:0.5, 
  		fontSize:12, 
  		justifyContent:'center', 
  		textAlign:'left',
  		color:'#000',
  		opacity:0.70
  	}
});