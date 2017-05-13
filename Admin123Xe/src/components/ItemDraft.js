import React, { Component } from 'react';
import{
	TouchableOpacity, Dimensions, View, Image, Text, StyleSheet, Alert
} from 'react-native';
import Toast from 'react-native-simple-toast';
import {
	Card, Button
} from 'react-native-material-design';
import MaterialDialog from 'react-native-material-dialogs';

import deleteDraft from '../function/deleteDraft';
import saveAsPost from '../function/saveAsPost';

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

export default class ItemDraft extends Component {

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

			this.props.navigator.push({id:'editform', post:dataItemListView, isDraft:true});
		}

	_deleteDraft(id){
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

	_saveAsPost(id, post){
		var sessionKey = this.props.sessionKey;
		Alert.alert('Lưu thành bài viết', 'Bạn sắp lưu bản nháp thành bài viết mới. Tiếp tục?',[
				{
					text:'Hủy',
					onPress:()=>{

					},
					style:'cancel'
				},
				{
					text:'Lưu',
					onPress:()=>{
						this.saveAsNewPost(sessionKey, id, post);
					}
				}
			],{
				cancelable: false
			})
	}

	async saveAsNewPost(sessionKey, id, post){
		var result = await saveAsPost(sessionKey, id, post);
		if (result){
			this.props.updateListDraft();
			Toast.show('Đã lưu thành bài viết mới');
		}else{
			Toast.show('Lỗi, kiểm tra lại bài viết');
		}
	}

	async delete(id, sessionKey){
		var result = await deleteDraft(id, sessionKey);
		if (result){
			this.props.updateListDraft();
			Toast.show('Đã xóa');
		}else{
			Toast.show('Lỗi chưa xóa được');
		}
	}

	render() {
		var dataItemListView = this.props.dataItemListView;
		source = (dataItemListView.medias !== null)? {uri:this._getThumbnail(dataItemListView)} : require('../images/no-image.jpg');
		
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
                    </Card.Body>

                    <Card.Actions position="right">
                    	<TouchableOpacity 
                    		onPress = {()=> this._deleteDraft(dataItemListView.id)}
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
                    		onPress = {()=> this._saveAsPost(dataItemListView.id, dataItemListView)}
                    		style={{padding:10}}>
                    		<Text style={{fontSize:15, fontWeight:'bold', color:'#2196f3'}}>
                    		  Lưu thành bài viết
                    		</Text>
                    	</TouchableOpacity>
                    </Card.Actions>

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