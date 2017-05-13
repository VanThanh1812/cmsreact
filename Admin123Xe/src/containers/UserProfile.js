import React, { Component } from 'react';
import {
	View, Text, TouchableOpacity, Image, StyleSheet, Dimensions
} from 'react-native';

var {height, width} = Dimensions.get('window');

export default class UserProfile extends Component {

	constructor(props) {
	  super(props);
	}

	_backNavigator(){
		this.props.navigator.pop();
	}

	render() {
		const {infoValue} = this.props;
		const obj_info = JSON.parse(infoValue);

		return (
			<View style={{flex:1,}}>
				<View
					style = {{height:50,opacity:0.90, flexDirection:'row', backgroundColor:'#007cbf'}}>

					<View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
					
        			  	<TouchableOpacity onPress={()=>this._backNavigator()}>
    						<Image
        			        	source = {require('../images/icon-arrowleft2.png')} />
						</TouchableOpacity>

					</View>
				
					<View style={styles.toolbarCenter}>
						{/*title - category*/}
						<Text style={{fontSize:18, color:'white'}}>
						  	Thông tin cá nhân
						</Text>
					</View>
				
					<View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
						
					</View>
				</View>
				{/*Content*/}
				<View style={{height: height/3,alignItems:'center', backgroundColor:'#0f7eba', justifyContent:'center'}}>
					<Image 
						source = {require('../images/ava.jpg')}
						style = {{height:3*width/8, width:3*width/8, borderRadius: 5*width/8,}}
					/>
					<Text style={{fontSize:20, fontWeight:'bold', color:'white', opacity:0.8}}>
					  {obj_info.displayName}
					</Text>

					<Text style={{fontSize:14, color:'white', opacity:0.8}}>
					  {obj_info.email} 
					</Text>

					
				</View>

				{/*Detail*/}

				
				<View style={{height:50, flexDirection:'row', alignItems:'center', padding:10}}>
						<Image
							resizeMode = 'contain'
						  	style={{height:16, width:16}}
						  	source={require('../images/username.png')}
						/>
						<Text style={{fontSize:16, opacity:0.8, color:'black',padding:10}}>
						  {obj_info.username}
						</Text>
					</View>

					<View style={{height:50,alignItems:'center', flexDirection:'row', padding:10}}>
						<Image
							resizeMode = 'contain'
						  	style={{height:16, width:16}}
						  	source={require('../images/displayname.png')}
						/>
						<Text style={{fontSize:16,color:'black', opacity:0.8, padding:10}}>
						  {obj_info.displayName}
						</Text>
					</View>
					<View style={{height:50, flexDirection:'row',alignItems:'center', padding:10}}>
						<Image
							resizeMode = 'contain'
						  	style={{height:16, width:16}}
						  	source={require('../images/phone.png')}
						/>
						<Text style={{fontSize:16, opacity:0.8,color:'black', padding:10}}>
						  {obj_info.phone}
						</Text>
					</View>
			</View>
		);
	}
}

var styles = StyleSheet.create({
	toolbarCenter:{
		flex:3, justifyContent:'center', alignItems:'center'
	},
})