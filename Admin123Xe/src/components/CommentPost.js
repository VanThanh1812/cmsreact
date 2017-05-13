import React, { Component } from 'react';
import {
	View, 
	Text,
	StyleSheet ,
	StatusBar,
	Dimensions, Image, TouchableOpacity,Alert
} from 'react-native';
import Toast from 'react-native-simple-toast';
import {
	Card, Button
} from 'react-native-material-design';
import deleteComment from '../function/deleteComment';

var deviceWidth = Dimensions.get('window').width;
var deviceHeight = Dimensions.get('window').height;

export default class CommentPost extends Component {
	constructor(props) {
	  super(props);
	}

	render() {
		var {comment} = this.props;
		return (
			<View style={{backgroundColor:'#fff', flexDirection:'row', }}>
				<View style={{ flex:1, alignItems:'center',paddingTop:5}}>
					<Image
						style = {{height:deviceWidth/8, width:deviceWidth/8,}}
						resizeMode = 'contain'
						source = {require('../images/ava.jpg')}
					/>
				</View>
				<View style={{flex:6, paddingRight:5, paddingLeft:5 }}>
					<Text style={{fontSize:16, fontWeight:'bold', color:'#000', opacity:0.65}}>
					  {comment.owner.displayName}
					</Text>
					<Text style={{fontSize:14, color:'#000', opacity:0.65}}>
					  {comment.comment}
					</Text>
					<Text style={{fontSize:10, marginTop:5}}>
					  {comment.createAt}
					</Text>
					<TouchableOpacity 
						onPress = {()=>this._deleteComment(comment)}
                    	style={{padding:10, alignItems:'flex-end'}}>
                    	<Text style={{fontSize:15, fontWeight:'bold', color:'#2196f3'}}>
                    	  Xóa
                    	</Text>
                    </TouchableOpacity>
				</View>

{/*				<View style={{backgroundColor:'yellow', flex:0.7, justifyContent:'flex-end', alignItems:'center'}}>
					<TouchableOpacity 
                    	style={{padding:10}}>
                    	<Text style={{fontSize:15, fontWeight:'bold', color:'#2196f3'}}>
                    	  Xóa
                    	</Text>
                    </TouchableOpacity>						
				</View>*/}
			</View>
		);


	}

	async delete(comment){
		var result = await deleteComment(comment.id, this.props.sessionKey);
		console.log(result);
		if (result){
			this.props.reRenderParent();
		}
	}

	_deleteComment(comment){
		
		Alert.alert('Xóa bình luận', 'Bạn có chắc muốn bình luận này?',[
				{
					text:'Cancel',
					onPress:()=>{
						
					},
					style:'cancel'
				},
				{
					text:'Xóa',
					onPress:()=>{
						this.delete(comment);
					}
				}
			],{
				cancelable: false
			})
	}
}
