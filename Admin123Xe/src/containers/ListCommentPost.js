import React, { Component } from 'react';
import {
	View, Text, ListView, TouchableOpacity, Image
} from 'react-native';
import CommentPost from '../components/CommentPost';
import getAllCommentByPost from '../function/getAllCommentByPost';

export default class ListCommentPost extends Component {
	
	constructor(props) {
	  super(props);
	  this.state={
	  	toggleUpdate:1,
	  	array:[],
	  	dataCommentPost:new ListView.DataSource({rowHasChanged:(r1,r2)=> r1 != r2}),
	  }
	}

	async componentWillMount(){
		console.log('will mount');
		post = this.props.post;
		var listComment = await getAllCommentByPost(post.id);
		if (listComment !== null){
			var json_comment = JSON.parse(listComment._bodyInit).data.comments;
			console.log(json_comment);
			this.setState ({
				array: json_comment,
				dataCommentPost: this.state.dataCommentPost.cloneWithRows(json_comment),
			});
		}
	}

	_backNavigator(){
		this.props.navigator.pop();
	}

	render() {
		if (this.state.array.length == 0){
			return (
				<View style={{flex:1, }}>
				<View
					style = {{height:50,opacity:0.90, flexDirection:'row', backgroundColor:'#007cbf'}}>

					<View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
					
                  		<TouchableOpacity onPress={()=>this._backNavigator()}>
    						<Image
                  				source = {require('../images/icon-arrowleft2.png')} />
						</TouchableOpacity>
					</View>
				
					<View style={{flex:3, justifyContent:'center', alignItems:'center'}}>
						{/*title - category*/}
						<Text style={{fontSize:18, color:'white'}}>
						 	Bình luận
						</Text>
					</View>
				
					<View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
					
					</View>
				</View>
				<View style={{alignItems:'center', justifyContent:'center'}}>
					<Text style={{fontSize:16, }}>
						  Không có bình luận nào
					</Text>
				</View>
			</View>
			)
		}

		return (
			<View style={{flex:1}}>
				<View
					style = {{height:50,opacity:0.90, flexDirection:'row', backgroundColor:'#007cbf'}}>

					<View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
					
                  		<TouchableOpacity onPress={()=>this._backNavigator()}>
    						<Image
                  				source = {require('../images/icon-arrowleft2.png')} />
						</TouchableOpacity>
					</View>
				
					<View style={{flex:3, justifyContent:'center', alignItems:'center'}}>
						{/*title - category*/}
						<Text style={{fontSize:18, color:'white'}}>
						 	Bình luận
						</Text>
					</View>
				
					<View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
					</View>
				</View>
				<ListView
					showsVerticalScrollIndicator = {false}
					pagingEnabled = {true}
					enableEmptySections={true}
					dataSource = {this.state.dataCommentPost}
					renderRow = {(rowData, index, id2)=> this._renderCommentPost(rowData, index, id2)}
				/>
			</View>
		);
	}

	_renderCommentPost(rowData, index, id2){
		return (
			<CommentPost comment = {rowData} reRenderParent = {()=>this._reRender(id2)} sessionKey = {this.props.sessionKey}/>
		)
	}

	async _reRender(index){
		/*console.log('change state'+index);
		this.state.array.splice(index, 1);
		console.log('length array '+this.state.array.length);
		this.setState({
        	dataCommentPost: this.state.dataCommentPost.cloneWithRows(this.state.array)
		});*/
		console.log('reload list');
		post = this.props.post;
		var listComment = await getAllCommentByPost(post.id);
		if (listComment !== null){
			var json_comment = JSON.parse(listComment._bodyInit).data.comments;
			console.log(json_comment);
			this.setState ({
				array: json_comment,
				dataCommentPost: this.state.dataCommentPost.cloneWithRows(json_comment),
			});
		}
		
	}

	shouldComponentUpdate(nextProps, nextState){
		if (this.state.dataCommentPost !== nextState.dataCommentPost){
			return true;
		}
		return false;
	}
}
