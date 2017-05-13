import React, { Component } from 'react';
import {
	View, Text,TouchableOpacity, Image, StyleSheet, Dimensions
} from 'react-native';

import TextField from 'react-native-md-textinput';
import Button from 'react-native-material-design';
import sessionKey from '../function/getdata';
import Toast from 'react-native-simple-toast';
import * as Progress from 'react-native-progress';

var deviceWidth = Dimensions.get('window').width;
var count=0;

export default class LoginApp extends Component {
	
	constructor(props) {
	  super(props);
	  this.state = {
	 	email:'',
	 	password:'',
	 	toggle:false,	
	  }
	}

	async _loginClick(){
		this.setState({toggle:true,});
		
		var user = await sessionKey(this.state.email, this.state.password)

		if (user !== null){
			console.log(user);
			Toast.show(user.userProfile.displayName);
			this.props.navigatorMain.push({id:'maincontainer'})
		}else{

			this.setState({toggle:false,});
			console.log(user);
			Toast.show('Login error');			
		}
	}

	render() {
		count++;
		console.log('rerender '+count);

		if (this.state.toggle){
			console.log('on');
			return (
				<View style={{flex:1, backgroundColor:'#007cbf', justifyContent:'center', alignItems:'center'}}>
					
					<Progress.CircleSnail 
						size={30} 
						color = 'white'
						radius = {5}
						direction = 'clockwise'
						animated = {true}
						//style = {{flexDirection:'row'}}
						indeterminate={true} 
					/>
				</View>
			) 
		}else{
			console.log('off');
			return (
			<View style={{flex:1}}>
				
				<View style={{flex:1,alignItems:'center', padding:20,backgroundColor:'#007cbf'}}>
					<Image
						source = {require('../images/logo-08.png')}
					/>

					<TextField
          				label={'Tên tài khoản'}
          				height = {45}
          				textColor = '#fff'
          				autoGrow = {true}
          				labelColor = '#fff'
          				returnKeyType = 'next'
          				width = {deviceWidth*3/4}
          				highlightColor={'#00BCD4'}
          				keyboardType='email-address'
          				value = {this.state.email}
          				onChangeText = {(text)=>
          					this.state.email = text
          				}
        			/>
        			<TextField
          				label={'Mật khẩu'}
          				height = {45}
          				value = {this.state.password}
          				labelColor = '#fff'
          				textColor = '#fff'
          				autoGrow = {true}
          				width = {deviceWidth*3/4}
          				highlightColor={'#00BCD4'}
          				secureTextEntry={true}
          				returnKeyType = 'go'
        				onChangeText = {(text)=>
        					this.state.password = text
          				}
        			/>
        			<TouchableOpacity
        				onPress = {()=> this._loginClick()}
						style={styles.buttonContainer}>
						<Text style={styles.buttonText}>
							 Đăng nhập
						</Text>
					</TouchableOpacity>
					{/*Quen mat khau va Dang ky moi*/}
					<View style={{ flexDirection:'row', padding:10, width:deviceWidth*3/4}}>
						<TouchableOpacity 
							style = {{flex:1}}
						>
							<Text style={{fontSize:15, textAlign:'left', color:'white'}}>
							  Quên mật khẩu
							</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style = {{flex:1}}
						>
							<Text style={{fontSize:15, textAlign:'right', color:'white'}}>
							  Đăng ký mới
							</Text>
						</TouchableOpacity>
					</View>
					{/*------------*/}
					<View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
							{/*Google and Facebook*/}
						<View elevation={2} style={styles.loginGoogle}>
							<Image
								resizeMode = 'contain'
								style = {styles.image}
								source = {require('../images/iconGoogle.png')}
							/>
							<Text style={styles.textLoginTool}>
							  Đăng nhập với Google
							</Text>
						</View>
						{/*------------*/}
						<View elevation={2} style={styles.loginGoogle}>
							<Image
								resizeMode = 'contain'
								style = {styles.image}
								source = {require('../images/iconFacebook.png')}
							/>
							<Text style={styles.textLoginTool}>
							  Đăng nhập với Facebook
							</Text>
						</View>
					</View>
					
				</View>
			</View>
		  );
		}

		var _gotoHome = ()=>{
			this.props.navigatorMain.push({id:'maincontainer'})
		}

		
	}
}

var styles = StyleSheet.create({
	textBanner:{
		fontSize:40,
		fontWeight:'bold'
	},
	textSubBanner:{
		fontSize:20,
	},
	viewInput:{
		flex:3,
		backgroundColor:'red'
	},
	buttonContainer:{
		marginTop:50,
		backgroundColor:'#0091ea',
		borderRadius:5,
		padding:10,
		height:50,
		width:deviceWidth*3/4,

	},
	buttonText:{
		textAlign:'center',
		color:'#fff',
		fontSize:20,
	},
	loginGoogle:{
		marginTop:5,
		width: deviceWidth*3/4,
		height:50,
		flexDirection:'row',
		alignItems:'center',
		backgroundColor:'#fff',
		borderRadius: 5,
	},
	textLoginTool:{
		marginLeft:5,
		fontSize:16, 
		padding:5, 
		color:'#616161',
		fontWeight:'bold'
	},
	image:{
		marginLeft:5,
		padding:5,
		height:35,
		width:35,
	},
	blur:{
		flex:1,

	}
})