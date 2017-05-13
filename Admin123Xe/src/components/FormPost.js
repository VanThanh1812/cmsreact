import React, { Component } from 'react';
import {
	View, TouchableHighlight, Text, StyleSheet, ScrollView, TouchableOpacity, Image
} from 'react-native';
import Toast from 'react-native-simple-toast';
import uploadPost from '../function/uploadPost';
import createDraft from '../function/createDraft';
import t from 'tcomb-form-native';
import _ from 'lodash';
import SnackbarComponent from 'react-native-snackbar-component';
// clone the default stylesheet

const stylesheet = _.cloneDeep(t.form.Form.stylesheet);
const stylesheetTag = _.cloneDeep(t.form.Form.stylesheet);
stylesheet.textbox.normal.height = 100;
stylesheetTag.button.width = 100;

var Form = t.form.Form;

var MediaInfo = t.struct({
	title: t.String,
	description: t.String,
	href: t.String,
	mediaType: t.Number,
	thumbnail: t.String,
});

var Post = t.struct({
  title: t.String,              // a required string
  abstraction: t.String,  // an optional string
  body: t.String,        // an optional string
  categories: t.list(t.Number),        // an optional string
  thumbnail: t.maybe(MediaInfo),
  medias:t.maybe(t.list(MediaInfo)),
  tags: t.maybe(t.list(t.String))     // an optional string
});

var options = {
	auto: 'placeholders',
	fields: {
		title:{
			label:'Tiêu đề',
			error: 'Insert a valid title',
      autoCapitalize:'words',
		},
		abstraction:{
			label:'Phần mở đầu',
			multiline : true,
			stylesheet:stylesheet,
			error: 'Insert a valid abstraction'
		},
    	body: {
    		label: 'Nội dung bài viết',
    		multiline : true,
			  error: 'Insert a valid body',
      		stylesheet: stylesheet // overriding the style of the textbox
    	},
    	categories:{
    		label:'Chủ đề (ID)',
			   error: 'Insert a valid categories'
    	},
    	tags:{
    		stylesheet:stylesheetTag,
    		label:'Thẻ',
			},
    	thumbnail:{
    		label:'Ảnh nhỏ (Thumbnail)',
    	},
    	medias:{
    		label:'Hình ảnh, Video',
    		item:{
    			fields:{
    				title:{
    					label: 'Thumbnail'
    				},
    				description:{
    					label:'Description'
    				},
    				href:{
    					label:'Link'
    				},
    				mediaType:{
    					label:'MediaType'
    				},
    				thumbnail:{
    					label:'Thumbnail'
    				}
    			}
    		}
    	}
  }
}; // optional rendering options (see documentation)


export default class FormPost extends Component {

	constructor(props) {
	  super(props);
	  this.state={

	  }
	}

	onChange(value) {
 	   this.setState({value:value});
	}

	_backNavigator(){
		this.props.navigator.pop();
	}

	async upload(value){
		
	}

	render() {
		
		onPress= ()=>{
			console.log(this.refs.form.getValue());
      if (this.refs.form.getValue() == null){
        Toast.show('Bài viết không đủ thuộc tính');
        return;
      }
    	var result = uploadPost(this.props.sessionKey, this.refs.form.getValue());
			if (result){
        this.props.navigator.push({id:'homepage', isUpdate:true});
        Toast.show('Đăng bài thành công');
      }else{
        Toast.show('Đăng bài thất bại');
      }
		}

    onPressDraft = ()=>{
        var result = createDraft(this.props.sessionKey, this.refs.form.getValue());
        if (result){
          this.props.navigator.push({id:'draftpost'});
          Toast.show('Lưu bản nháp thành công');
      }else{
        Toast.show('Lưu bản nháp thất bại');
      }
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
				
				<View style={styles.toolbarCenter}>
					{/*title - category*/}
					<Text style={{fontSize:18, color:'white'}}>
					  Thêm bài viết
					</Text>
				</View>
				
				<View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
					
				</View>
			</View>
			
			<ScrollView>
        		<View style={styles.container}>
        			<Form
       		   			ref="form"
                  type={Post}
        			  	options={options}
        			/>
        			<View style={{flexDirection:'row'}}>
        				<TouchableOpacity
        					style={styles.button} 	
        					onPress={onPressDraft} 
        					activeOpacity = {0.7}
							focusedOpacity = {0.7}
        					underlayColor='#99d9f4'>
        		  			<Text style={styles.buttonText}>Lưu bản nháp</Text>
        				</TouchableOpacity>
        				<View style={{width:4}}></View>
        				<TouchableOpacity
        					style={styles.button} 
        					onPress={onPress} 
        					activeOpacity = {0.7}
							focusedOpacity = {0.7}
        					underlayColor='#99d9f4'>
        				  	<Text style={styles.buttonText}>Tạo bài viết</Text>
        				</TouchableOpacity>		
        			</View>
        		</View>
			</ScrollView>
			</View>
		);
	}

	
}
var styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginTop: 5,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 30,
    alignSelf: 'center',
    marginBottom: 30
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
  	flex:1,
    height: 45,
    backgroundColor: '#0091ea',
    borderColor: '#0091ea',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  toolbarCenter:{
		flex:3, justifyContent:'center', alignItems:'center'
	},
});
