import React, { Component } from 'react';
import {
	View, StyleSheet, Text, Image, TouchableOpacity
} from 'react-native';
import {
	Toolbar, Icon
} from 'react-native-material-design';


export default class HeaderHomePage extends Component {

	constructor(props) {
	  super(props);
	}

	render() {

		const {menuClick, openNewPost} = this.props;


		return (
			<View style = {{height:50, flexDirection:'row', backgroundColor:'#007cbf'}}>
				
				<View style={{flex:1, justifyContent:'center', alignItems:'center',}}>
					
                  	<TouchableOpacity onPress={()=>menuClick()}>
    					<Image
                  			source = {require('../images/icon_menu.png')} />
					</TouchableOpacity>
				</View>
				
				<View style={styles.toolbarCenter}>
					{/*<Image
                  		source = {require('../images/logo-08.png')} />*/}
                  	<Text style={{color:'white', fontSize:20}}>
                  	  123Xe Admin
                  	</Text>
				</View>
				
				{/*<View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
					<TouchableOpacity>
						<Image
	                  		source = {require('../images/iconMagnify.png')} />
					</TouchableOpacity>
				</View>*/}
				<View style={{flex:1, justifyContent:'center', alignItems:'center',}}>
					<TouchableOpacity onPress={()=>openNewPost()}>
						<Image
							resizeMode = 'contain'
							style = {{height:24, width:24}}
	                  		source = {require('../images/icon-post.png')} />
					</TouchableOpacity>
				</View>
			</View>
		);
	}
}

var styles = StyleSheet.create({
	toolbarCenter:{
		flex:3, justifyContent:'center', alignItems:'center', 
	}
});