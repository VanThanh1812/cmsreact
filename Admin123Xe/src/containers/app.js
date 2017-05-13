import React, { Component } from 'react';
import {
	View, Text, Navigator,AsyncStorage,
	StatusBar,
} from 'react-native';
import MainContainer from './MainContainer';
import LoginApp from './LoginApp';
import IntroPage from './IntroPage';
import Toast from 'react-native-simple-toast';

import {key_static} from '../function/value';

export default class App extends Component {

	constructor(props) {
	  super(props);
	  this.state = {
	  	id:'maincontainer',
	  	isLoading:true,
	  	sessionKey:'',
	  	value:'',
	  };
	}

	componentWillMount(){
		try{
			AsyncStorage.multiGet([key_static.key_session, key_static.key_user], (err, stores)=>{
				
				/*if (result !== null){
					console.log(result);
					this.setState({
						id:'maincontainer',
						sessionKey:result
					})
				}else{
					this.setState({
						id:'loginapp',
					})
				}*/
				stores.map((result, i, store)=>{
					console.log(store);
					let sessionKey = store[0][1];
        			let value = store[1][1];
        			if (sessionKey !== null && value !== null){
        				
						this.setState({
							id:'maincontainer',
							sessionKey:sessionKey,
							value:value,
						})
        			}else{
        				this.setState({
							id:'loginapp',
						})
        			}
				})

				this.setState({  // stop load
					isLoading:false
				})
			});

		}catch(err){
			console.log(err)
		}
	}

	render() {

		if (this.state.isLoading){
			return <IntroPage />
		}

		return (
			<View style={{flex:1}}>
				<StatusBar
					
				/>
				<Navigator 
					initialRoute = {{id:this.state.id}}
					renderScene = {
						(route, navigator)=>
						this._renderScene(route, navigator)
					}
				/>
			</View>
		);
	}

	_renderScene(route, navigator){
		switch (route.id){
			case 'maincontainer':
				return (
					<MainContainer 
						navigatorMain = {navigator} 
						sessionKey = {this.state.sessionKey} 
						value = {this.state.value}/>
					);
			case 'loginapp':
				return (
					<LoginApp navigatorMain = {navigator} />
					);
		}
	}
}
