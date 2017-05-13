import React, { Component } from 'react';
import {
	View, StyleSheet, Image, Text, TouchableOpacity,Switch
} from 'react-native'; 
import removeDataOffline from '../function/removeDataOffline';

export default class SideBarApp extends Component {
	
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	toggleSwitchMode:false,
	  	toggleSwitchHotNews:true,
	  };

	}

	

	render() {

		const {infoValue} = this.props;
		const obj_info = JSON.parse(infoValue);

		_gotoPostDraft=()=>{
			this.props.navigator.push({id:'draftpost'});
		}

		_gotoLogin = ()=> {
			removeDataOffline();
			this.props.navigatorMain.push({id:'loginapp'});
		}

		_gotoUserProfile = ()=> {
			this.props.navigator.push({id:'userprofile'});
		}

		return (
			<View overlay style={styles.container}>
				
				{/* header */}
				
				<TouchableOpacity
					activeOpacity = {0.8}
					focusedOpacity = {0.8}
					onPress = {_gotoUserProfile}
				>
					<View style={styles.drawer}>
						<Image 
							source = {require('../images/icon-default-profile.png')}
							style = {{height:80, width:80, borderRadius: 80/2,}}
						/>
						<View style = {{flex:1, justifyContent:'center', padding:10}}>
							<Text style={{fontSize:18,color:'#2a5c77', fontWeight:'bold'}}>
						  		{obj_info.displayName}
							</Text>
							
							<Text style={{fontSize:14}}>
							 		{obj_info.email}
							</Text>
							
						</View>
					</View>
				</TouchableOpacity>

			{/* Danh sach chuc nang */}
			<TouchableOpacity 
				onPress = {_gotoPostDraft}
			>
				<View style={{flexDirection:'row', height:60, alignItems:'center', padding:15}}>
						<Image
							resizeMode = 'contain' 
							source = {require('../images/icon_savepost.png')} style={{width:24}} />
						{/*
							Button tai day
						*/}
						
							<Text style={{fontSize:18, padding:10, color:'white', marginLeft:10}}>
							 	Bài viết đã lưu
							</Text>
						

					</View>
				</TouchableOpacity>

				<TouchableOpacity 
							onPress = {_gotoUserProfile}
						>
					<View style={{flexDirection:'row', height:60, alignItems:'center', padding:15}}>
						<Image
							resizeMode = 'contain'
							source = {require('../images/icon-profile.png')} style={{width:24}} />
						{/*
							Button tai day
						*/}
						<Text style={{fontSize:18, padding:10, color:'white', marginLeft:10}}>
						 	Đổi thông tin
						</Text>

					</View>
				</TouchableOpacity>

			{/* Thiet lap he thong */}
				<View style={{justifyContent:'flex-end', backgroundColor:'#007cbf', flex:1}}>

				<View style={{height:0.5, backgroundColor:'white'}}></View>
					<TouchableOpacity
						
						onPress = {_gotoLogin}
					>
					<View style={{alignItems:'flex-end',flexDirection:'row',backgroundColor:'#007cbf', height:60, alignItems:'center', padding:15}}>
						<Image
							resizeMode = 'contain' 
							source = {require('../images/icon-logout.png')} style={{width:24}} />
						{/*
							Button tai day
						*/}
						<Text style={{fontSize:18, padding:10, color:'white', marginLeft:10}}>
						 	Đăng xuất
						</Text>

					</View>
				</TouchableOpacity>
				</View>
			</View>
		);
	}
}
 
var styles = StyleSheet.create({
	container:{
		flex:1,
		backgroundColor:'#007cbf',
	},
	drawer:{
		height:120,
		backgroundColor:'#eeeeee',
		justifyContent:'center',
		alignItems: 'center',
		padding:5,
		flexDirection:'row',
	}, 
	textDrawer:{
		fontSize:18,
		padding:10,
	},
	switchRight:{

	}
});