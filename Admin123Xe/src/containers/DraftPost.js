import React, { Component } from 'react';
import {
	View, TouchableOpacity, Image, Text, StyleSheet, ListView
} from 'react-native';
import ItemDraft from '../components/ItemDraft';
import getDraftPost from '../function/getDraftPost';

export default class DraftPost extends Component {

	constructor(props) {
	  super(props);
	  this.state = {
	  	 isLoading:false,
	  	 listpost:'',
	  	 dataSourcePost:  new ListView.DataSource({rowHasChanged:(r1,r2)=> r1 != r2}),
	  };
	}

	async componentWillMount(){
		var response = await getDraftPost(this.props.sessionKey);
		if (response !== null){
			var listpost = JSON.parse(response._bodyInit).data.posts;
			console.log(listpost.length);
			/*this.setState({
				dataSourcePost: this.state.dataSourcePost.cloneWithRows(listpost)
			})*/
			this.setState({
				listpost: listpost,
				dataSourcePost: this.state.dataSourcePost.cloneWithRows(listpost),
			})
		}
	}

	componentWillReceiveProps(nextProps, nextState){

	}

	_backNavigator(){
		this.props.navigator.pop();
	}

	render() {
		return (
			<View style={{flex:1}}>
					{/*header*/}
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
						  Bài viết đã lưu
						</Text>
					</View>
				
					<View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
						
					</View>
				</View>

				<ListView
					showsVerticalScrollIndicator = {false}
					style = {styles.listpost}
					pagingEnabled = {true}
					enableEmptySections={true}
					dataSource = {this.state.dataSourcePost}
					renderRow = {(rowData)=> this._renderPostbyIdCategory(rowData)}
				/>

			</View>
		);
	}
	_renderPostbyIdCategory(data){
		return (
			<TouchableOpacity  
				activeOpacity = {0.7}
				focusedOpacity = {0.7}
				onPress = {()=>this._openPostDetail(data)}
			>		
				<ItemDraft 
					dataItemListView={data} 
					navigator = {this.props.navigator} 
					sessionKey = {this.props.sessionKey}
					updateListDraft = {()=>this.updateListDraft()}
				/>
			</TouchableOpacity>
		)
	}

	_openPostDetail(post){
		console.log('open ...'+ post.title);
		this.props.navigator.push({id:'detailpost', post:post, idDraft:true});
	}

	async updateListDraft(){
		var response = await getDraftPost(this.props.sessionKey);
		if (response !== null){
			var listpost = JSON.parse(response._bodyInit).data.posts;
			console.log(listpost.length);
			this.setState({
				dataSourcePost: this.state.dataSourcePost.cloneWithRows(listpost)
			});
		}
		this.props.navigator.push({id:'homepage'});
	}
	
}

var styles = StyleSheet.create({
	listpost:{

	}
})