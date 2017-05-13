import React, { Component } from 'react';
import {
	View, Image, Text
} from 'react-native';

export default class IntroPage extends Component {
	render() {
		return (
			<View style={{flex:1, backgroundColor:'#007cbf', justifyContent:'center', alignItems:'center'}}>
				<Image
					source = {require('../images/logo-08.png')}
				/>
				<Text style={{fontWeight:'bold', fontSize:28, color:'white'}}>
				  Admin
				</Text>
			</View>
		);
	}
}
