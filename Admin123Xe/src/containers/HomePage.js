import React, { Component } from 'react';
import {
	View, StyleSheet, Text, Image, TouchableOpacity
} from 'react-native';
import Drawer from 'react-native-drawer';

import HeaderHomePage from '../components/HeaderHomePage';
import ContentHomePage from '../components/ContentHomePage';
import SideBar from '../components/SideBar';
import * as Progress from 'react-native-progress';
import startGetData from '../function/getPostAdmin';

export default class HomePage extends Component {
	
	constructor(props) {
	  	super(props);
		this.state={
			data:'',
			loading:false,
			opacity:1.0,
		}
	}

	async componentWillMount(){
		this.setState({
			loading:true,
		})
		console.log('start');
		data = await startGetData(this.props.sessionKey, 0, 0); // list post co chua media
		this.setState({
			loading:false,
			data:data,
		})
	}

	render() {

		closeControlPanel = () => {
  		  this._drawer.close()
  		};

  		openControlPanel = () => {
  		  this._drawer.open()
  		};

  		const {navigationMain} = this.props;

  		openNewPost = () => {
			this.props.navigator.push({id:'formpost'});
		}


  		if (this.state.loading){
  			console.log('loading');
			return (
				
				<Drawer
		        	ref={(ref) => this._drawer = ref}
				  	type="overlay"
				  	content={<SideBar 
				  				navigatorMain = {this.props.navigatorMain} 
				  				closeControlPanel = {closeControlPanel} 
				  				navigator = {this.props.navigator}
				  				infoValue = {this.props.infoValue}/>}
				  	tapToClose={true}
				  	openDrawerOffset={0.2} // 20% gap on the right side of drawer
				  	panCloseMask={0.2}
				  	closedDrawerOffset={-3}
				  	styles={drawerStyles}
				 	tweenHandler={(ratio) => ({
					    main: { opacity:(2-ratio)/2 }
					})}
				>
				    <HeaderHomePage menuClick = {openControlPanel} openNewPost = {openNewPost} />
	
				    <View style={{flex:1, backgroundColor:'#eeeeee', justifyContent:'center', alignItems:'center'}}>
					
						<Progress.Circle 
							size={30} 
							color = '#2196f3'
							radius = {10}
							direction = 'clockwise'
							animated = {true}
							//style = {{flexDirection:'row'}}
							indeterminate={true} 
						/>
					</View>
				</Drawer>
			) 
  		}

  		if (this.state.data == ''){
  			return (
  				<Drawer
	        	ref={(ref) => this._drawer = ref}
			  	type="overlay"
			  	content={<SideBar 
			  				navigatorMain = {this.props.navigatorMain} 
			  				closeControlPanel = {closeControlPanel} 
			  				navigator = {this.props.navigator}
			  				infoValue = {this.props.infoValue}/>}
			  	tapToClose={true}
			  	openDrawerOffset={0.2} // 20% gap on the right side of drawer
			  	panCloseMask={0.2}
			  	closedDrawerOffset={-3}
			  	styles={drawerStyles}
			 	tweenHandler={(ratio) => ({
				    main: { opacity:(2-ratio)/2 }
				})}
				>
				    <HeaderHomePage menuClick = {openControlPanel} openNewPost = {openNewPost} navigator = {this.props.navigator}/>
	
				    <View style={{flex:1, backgroundColor:'white', justifyContent:'center', alignItems:'center', opacity:0.85}}>
  						<Text style={{color:'black', opacity:0.85, fontSize:18}}>
  					  		Không có dữ liệu
  						</Text>
  						<TouchableOpacity style={{padding:10}}>
                    		<Text style={{fontSize:15, fontWeight:'bold', color:'#2196f3'}}>
                    		  Tải lại
                    		</Text>
                    	</TouchableOpacity>
	  				</View>
				</Drawer>
  			)
  		}

		return (
			<Drawer
	        	ref={(ref) => this._drawer = ref}
			  	type="overlay"
			  	content={<SideBar 
			  				navigatorMain = {this.props.navigatorMain} 
			  				closeControlPanel = {closeControlPanel} 
			  				navigator = {this.props.navigator} 
			  				infoValue = {this.props.infoValue}/>}
			  	tapToClose={true}
			  	openDrawerOffset={0.2} // 20% gap on the right side of drawer
			  	panCloseMask={0.2}
			  	closedDrawerOffset={-3}
			  	styles={drawerStyles}
			 	tweenHandler={(ratio) => ({
				    main: { opacity:(2-ratio)/2 }
				})}
			>
			    <HeaderHomePage menuClick = {openControlPanel} openNewPost = {openNewPost}/>
			    <ContentHomePage 
			    	sessionKey = {this.props.sessionKey}
			    	dataAdmin = {this.state.data} 
			    	navigator = {this.props.navigator}
			    	updateListData = {()=> this.updateListData()}
			    	onScrollEnd = {()=>this.onScrollEnd()}
			    	opacity = {this.state.opacity}
			    />
			</Drawer>
		);
	}

	async updateListData(){
		console.log('start');
		this.setState({opacity:0.5})
		data = await startGetData(this.props.sessionKey, 0, this.state.data.length); // list post co chua media
		this.setState({
			data:data,
			opacity:1.0
		})
	}

	async onScrollEnd(){
		console.log('scoll end');
		data = await startGetData(this.props.sessionKey, 0, this.state.data.length+10); // list post co chua media
		this.setState({
			data:data,
		})
	}
}

var styles = StyleSheet.create({

});

const drawerStyles = {
 	 	drawer: { shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 3},
	  	main: {paddingLeft: 3},
	}