import React, { Component } from 'react';
import {
	View, 
	Text, 
	ScrollView, 
	Image, 
	TouchableOpacity, 
	StyleSheet ,
	StatusBar,
	Dimensions, ListView, InteractionManager
} from 'react-native';
import HTMLView from 'react-native-htmlview';
import BodyPost from '../components/BodyPost.js';
import Tags from 'react-native-tags';
import * as Progress from 'react-native-progress';
import getPostById from '../function/getPostById';
import renderHtml from '../function/renderHtml';
import getAllCommentByPost from '../function/getAllCommentByPost';

var deviceWidth = Dimensions.get('window').width;
var deviceHeight = Dimensions.get('window').height;

export default class PostDetailById extends Component {
	
	constructor(props) {
	  super(props);
	  this.state={
	  	renderPlaceholderOnly:false,
	  }
	}

	_convertTime(time){
		var d = new Date(time*1000);
		return d.toString();
	}

	componentWillReceiveProps(nextProps){
		
	}

	_gotoEditForm(){
		var fromComponent = {
			fromHome:false,
			fromDetail:true,
		}
		this.props.navigator.push({id:'editform', post:this.props.post, isDraft:false, fromComponent:fromComponent});
	}

	componentDidMount() {
		console.log('den day');
		this.setState({renderPlaceholderOnly: false});
    	InteractionManager.runAfterInteractions(() => {
      		this.setState({renderPlaceholderOnly: false});
    	});
    	
    }

	render() {

		console.log('post detail render');

		if (this.state.renderPlaceholderOnly){
			return (
				<View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
	   				<Text style = {{fontSize:16, color:'black'}}>Loading...</Text>
				</View>
			)
		}

		var dataItem = this.props.post;
		var thumbnail = (dataItem.medias !== null) ? {uri:dataItem.medias[0].href} : require('../images/no-image.jpg') ;
		var body = dataItem.body;
		var bodyRender = renderHtml(body, dataItem.medias, deviceWidth);
		var listTags = (dataItem.tags !== null)? dataItem.tags : [];
		var category = dataItem.categoriesDetail;

		return (
			<View style={{flex:1, }}>
				
				<StatusBar
					hidden
   				/>
				{/*header*/}
			  	<View
			  		style = {{height:45,opacity:0.90, flexDirection:'row', backgroundColor:'#000'}}>
				
				<View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
					
                  	<TouchableOpacity onPress={()=>this._backNavigator()}>
    					<Image
                  			source = {require('../images/icon-arrowleft2.png')} />
					</TouchableOpacity>
				</View>
				
				<View style={styles.toolbarCenter}>
					{/*title - category*/}
					<Text style={{fontSize:18, color:'white'}}>
					  123Xe - Admin
					</Text>
				</View>
				
				<View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
					<TouchableOpacity
						onPress = {()=>this._gotoEditForm()}
					>
						<Image
	                  		source = {require('../images/icon-edit.png')} />
					</TouchableOpacity>
				</View>
				</View>

			{/*content backgroundColor:'red'*/} 

				<ScrollView style={{flex:1, }}>
					{/*thumbnail*/}
					<Image
						style = {{width:deviceWidth,height:deviceHeight*3/8}}
						source = {thumbnail}
					/>
					{/* Title */}
					<Text style = {{color:'black',fontSize:28,paddingLeft:10}}>
					  {dataItem.title}
					</Text>
					{/*abstraction*/}
					<Text style = {{color:'black',fontSize:18,paddingLeft:15, paddingRight:10}}>
					  {dataItem.abstraction}
					</Text>
					{/*Category*/}
					<Text style = {{color:'#007cbf', padding:10}}>
					  {category[0].name}
					</Text>
					{/*createTime*/}
					<Text style = {{color:'black',fontSize:12,opacity:0.75, padding:10}}>
					  {this._convertTime(dataItem.createAt)}
					</Text>
					{/*Body*/}
					<HTMLView
						stylesheet = {styleHtml}
						style = {{paddingLeft:10, paddingRight:10}}
						value = {bodyRender}
					/>
					<Text style={{fontSize:14, padding:10}}>
					  Tags:
					</Text>
					<Tags 
  						initialText=""
  						initialTags={listTags}
  						onChangeTags={() => noop}
  						onTagPress = {()=> null}
  						inputStyle={{ backgroundColor: 'white' }}
					/>	

									
				</ScrollView>

			</View>
		);
	}

	_backNavigator(){
		this.props.navigator.pop();
	}

	shouldComponentUpdate(nextProps, nextState){
		if (nextProps.post !== this.props.post){
			return true;
		}
		return false;
	}

}
var styles = StyleSheet.create({
	toolbarCenter:{
		flex:3, justifyContent:'center', alignItems:'center'
	},

});

var styleHtml = StyleSheet.create({
	a:{
		fontWeight:'300',
		color:'#ff3366'
	},
	p:{
		color:'black',
		fontSize:16,
	}
})

/*
"post": {
      "abstraction": "23 người bị TAND tỉnh Hòa Bình tuyên án về tội mua bán, tàng trữ trái phép chất ma túy và che giấu tội phạm. Trong số này, có 9 người nhận án tử hình.",
      "body": "Ngày 21/3, sau hơn 2 tuần xét xử sơ thẩm, Tòa án nhân dân (TAND) tỉnh Hòa Bình tuyên án 23 bị cáo trong đường dây mua bán hơn 1.400 bánh heroin.<br/>Trước khi nghị án, đại diện Viện kiểm sát nhân dân (VKSND) tỉnh đề nghị Hội đồng xét xử xem xét, tuyên phạt mức án tử hình đối với 11 bị cáo, phạt chung thân 8 người và phạt 3 bị cáo 20 năm tù với tội danh Mua bán, tàng trữ trái phép chất ma túy.<br/>Trong số này, Trần Đức Duy (trùm đường dây) bị thêm tội Tàng trữ trái phép vũ khí quân dụng. Bị cáo Vũ Thị Thu Thảo bị đề nghị mức án 24-38 tháng tù giam vì Không tố giác tội phạm.<br/>Theo cáo trạng, đầu năm 2015, Cục cảnh sát điều tra tội phạm về ma túy (C47) Bộ Công an phối hợp Công an tỉnh Hòa Bình bắt quả tang Trần Đức Duy khi anh ta dùng xe bán tải vận chuyển hơn 90 bánh heroin ở huyện Cao Phong. Trên ôtô, trinh sát phát hiện khẩu súng ngắn kèm 7 viên đạn.<br/>Lập chuyên án mở rộng, C47 bắt khẩn cấp nhóm đồng phạm của Duy để điều tra về các tội danh Mua bán, tàng trữ trái phép chất ma túy, Không tố giác tội phạm, Tàng trữ trái phép vũ khí quân dụng.<br/>Kết thúc chuyên án, lực lượng chức năng thu giữ thêm súng AK, đạn và lượng lớn heroin.<br/>Ngày 8/1/2015, Cơ quan cảnh sát điều tra Bộ Công an khởi tố 23 bị can.<br/>C47 xác định, trong 3 năm, nhóm bị cáo đã hình thành đường dây ma túy từ Lào qua các tỉnh miền núi phía Bắc nước ta rồi chuyển sang Trung Quốc tiêu thụ. Theo tài liệu công tố, Duy và đồng bọn đã mua bán, vận chuyển hơn 1.400 bánh heroin, thu lợi bất chính trên 13 tỷ đồng và trên 700.000 nhân dân tệ.",
      "categories": [
        22
      ],
      "categoriesDetail": [
        {
          "description": "Pháp luật",
          "id": 22,
          "name": "Pháp luật"
        }
      ],
      "createAt": 1490151135,
      "description": "Tử hình ông trùm 8X cầm đầu đường dây ma túy xuyên quốc gia",
      "id": 139,
      "isLiked": false,
      "medias": [
        {
          "description": "Có 9 người trong số 23 bị cáo phải nhận án tử hình. Ảnh: Hoàng Lam.",
          "href": "http://znews-photo.d.za.zdn.vn/w660/Uploaded/pwivovlb/2017_03_20/DSCN4719.JPG",
          "mediaType": 1,
          "thumbnail": "http://znews-photo.d.za.zdn.vn/w660/Uploaded/pwivovlb/2017_03_20/DSCN4719.JPG",
          "title": "Có 9 người trong số 23 bị cáo phải nhận án tử hình. Ảnh: Hoàng Lam."
        },
        {
          "description": "Cảnh sát đưa các bị cáo đến phòng xét xử. Ảnh: Hoàng Lam.",
          "href": "http://znews-photo.d.za.zdn.vn/w660/Uploaded/pwivovlb/2017_03_20/IMG_7748.JPG",
          "mediaType": 1,
          "thumbnail": "http://znews-photo.d.za.zdn.vn/w660/Uploaded/pwivovlb/2017_03_20/IMG_7748.JPG",
          "title": "Cảnh sát đưa các bị cáo đến phòng xét xử. Ảnh: Hoàng Lam."
        }
      ],
      "owner": {
        "displayName": "Cấn Cát",
        "email": "cancat95@gmail.com",
        "id": 4,
        "userType": 1
      },
      "status": 1,
      "tags": [
        "Xét xử 1400 bánh heroin Hòa Bình",
        "Xét xử 1400 bánh heroin",
        "tuyên án 1400 bánh heroin",
        "tuyên án 23 bị cáo buôn bán 1400 bánh tòa án Hòa Bình"
      ],
      "thumbnail": {
        "description": "Có 9 người trong số 23 bị cáo phải nhận án tử hình. Ảnh: Hoàng Lam.",
        "href": "http://znews-photo.d.za.zdn.vn/w660/Uploaded/pwivovlb/2017_03_20/DSCN4719.JPG",
        "mediaType": 1,
        "thumbnail": "http://znews-photo.d.za.zdn.vn/w660/Uploaded/pwivovlb/2017_03_20/DSCN4719.JPG",
        "title": "Có 9 người trong số 23 bị cáo phải nhận án tử hình. Ảnh: Hoàng Lam."
      },
      "title": "Tử hình ông trùm 8X cầm đầu đường dây ma túy xuyên quốc gia",
      "updateAt": 1491622146
    }
*/