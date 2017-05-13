import React, { Component } from 'react';
import {
	View, TouchableHighlight, Text, StyleSheet, ScrollView, TouchableOpacity, Image
} from 'react-native';
import Toast from 'react-native-simple-toast';
import updatePost from '../function/updatePost';
import updateDraft from '../function/updateDraft';
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
  medias: t.maybe(t.list(MediaInfo)),
  tags: t.maybe(t.list(t.String))     // an optional string
});

var options = {
  auto: 'placeholders',
  fields: {
    title:{
      label:'Tiêu đề',
      error: 'Insert a valid title'
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
              label: 'Thumbnail Item'
            },
            description:{
              
            },
            href:{
              
            },
            mediaType:{
              
            },
            thumbnail:{
              
            }
          }
        }
      }
  }
}; // optional rendering options (see documentation)


export default class EditForm extends Component {

	constructor(props) {
	  super(props);
    var snackbar = <View></View>;
	  this.state={
      snackBar: snackbar
	  }
	}

	onChange(value) {
 	   this.setState({value:value});
	}

	_backNavigator(){
		this.props.navigator.pop();
	}

	render() {
		
		onPress= ()=>{
			console.log(this.form.getValue());
      if (this.props.isDraft){
          //update Draft
          console.log(this.props.isDraft);
          var result = updateDraft(this.props.sessionKey, this.form.getValue(), this.props.post.id);
          if (!result){
            var snackbar = <SnackbarComponent visible={true} textMessage="Chỉnh sửa thất bại!" actionHandler={()=>{console.log("snackbar button clicked!")}} actionText="Thử lại"/>;
            this.setState({snackBar:snackbar});
            return;
          }
          this.props.navigator.push({id:'draftpost'});

      }else{ 
          // update Post
          console.log('update bai viet');
          var result = updatePost(this.props.sessionKey, this.form.getValue(), this.props.post.id);
          if (result){
            Toast.show('Update bài viết thành công');
            this.props.navigator.push({id:'homepage', isUpdate:true});
          }else{
            Toast.show('Update bài viết thất bại');
          }



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
					  Chỉnh sửa bài viết
					</Text>
				</View>
				
				<View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
					
				</View>
			</View>
			
			<ScrollView>
        		<View style={styles.container}>
        		    <Form
       		      		ref={(ref) => this.form = ref}
        		      	type={Post}
        		      	value = {this.props.post}
        		      	options={options}
        		    />
        		    <TouchableHighlight 
        		    	style={styles.button} 
        		    	onPress={onPress} 
        		    	underlayColor='#007cbf'>
        		        <Text style={styles.buttonText}>
                        Lưu chỉnh sửa
                    </Text>
        		    </TouchableHighlight>
        		</View>
			</ScrollView>
      {this.state.snackBar}
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
    height: 45,
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
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
