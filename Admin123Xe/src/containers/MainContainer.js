import React, { Component } from 'react';
import {
	Navigator, StatusBar, View
} from 'react-native';
import HomePage from './HomePage';
import LoginApp from './LoginApp';
import PostDetailById from './PostDetailById';
import FormPost from '../components/FormPost';
import EditForm from './EditForm';
import CommentPost from '../components/CommentPost';
import ListCommentPost from './ListCommentPost';
import DraftPost from './DraftPost';
import UserProfile from './UserProfile';

export default class MainContainer extends Component {
	
	constructor(props) {
	  super(props);
	}

	render() {
		return (
				<Navigator 
					initialRoute = {{id:'homepage',}}
					renderScene = {
						(route, navigator)=>
							this._renderScene(route, navigator)
					}
					configureScene = {
						(route, routeback)=>
							this._configureScene(route, routeback)
						
					}
			/>
		);
	}

	_configureScene(route, routeback){
		if (route.id == 'detailpost'){
			return Navigator.SceneConfigs.FadeAndroid;
		}
		if (route.id == 'userprofile'){
			return Navigator.SceneConfigs.FadeAndroid;
		}
		return Navigator.SceneConfigs.FloatFromBottom;
	}

	reloadHome = (navigator) =>{
		navigator.push({id:'detailpost'});
	}

	_renderScene(route, navigator){
		switch (route.id){
			case 'homepage':
				return (
					<HomePage 
						navigator = {navigator} 
						navigatorMain={this.props.navigatorMain}
						sessionKey = {this.props.sessionKey}
						infoValue = {this.props.value}
						isUpdate = {route.isUpdate}
					/>
				);
			case 'detailpost':
				return (
					<PostDetailById 
						navigator = {navigator} 
						post = {route.post}
						isUpdate = {route.isUpdate}
						/>
					)
			case 'formpost':
				return (
					<FormPost 
						navigator = {navigator} 
						sessionKey = {this.props.sessionKey}/>
					)
			case 'editform':
				return (
					<EditForm 
						navigator = {navigator} 
						sessionKey = {this.props.sessionKey} 
						post = {route.post}
						isDraft = {route.isDraft}
						fromComponent = {route.fromComponent}
						/>
					)
			case 'commentpost':
				return (
					<ListCommentPost
						navigator = {navigator} 
						sessionKey={this.props.sessionKey} 
						post = {route.post} />
					)
			case 'draftpost':
				return (
					<DraftPost 
						sessionKey = {this.props.sessionKey}
						navigator = {navigator}
					/>
					)
			case 'userprofile':
				return (
					<UserProfile
						navigator = {navigator} 
						infoValue = {this.props.value}
					/>
					)

		}
	}
}
