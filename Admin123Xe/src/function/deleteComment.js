import Toast from 'react-native-simple-toast';

async function deleteComment(id, sessionKey){
	console.log(sessionKey+ '  '+id);
	return await fetch('http://api.cms.mobilelab.vn/api/v1/comment/'+id,{
		method:'DELETE',
		headers:{
			'Accept':'application/json',
			'sessionKey': sessionKey,
		},
	}).then((response)=>{
		console.log(response);
		if (response.status == 200){
			Toast.show('Đã xóa bình luận');
			return true;
		}else{
			return false;
		}
	})
}

export default deleteComment;