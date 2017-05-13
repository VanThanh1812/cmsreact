import Toast from 'react-native-simple-toast';

function deletePost(id, sessionKey){
	console.log(sessionKey+ '  '+id);
	return fetch('http://api.cms.mobilelab.vn/api/v1/post/'+id,{
		method:'DELETE',
		headers:{
			'Accept':'application/json',
			'sessionKey': '3251873ffe117f731cfa83b4652a042a2ae2bce90d3c249f26d32b4b29f92da1_4_15_1487920737'
		}
	}).then((response)=>{
		console.log(response);
		if (response.status == 200){
			Toast.show('Bài viết đã được xóa');
			return true;
		}else{
			Toast.show('Có một số lỗi nào đó mà chưa xóa được bài viết');
			return false;
		}
	})
}

export default deletePost;