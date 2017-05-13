import Toast from 'react-native-simple-toast';
async function updatePost(sessionKey, post, id) {
	console.log(id);
	console.log(sessionKey);
	return await fetch('http://api.cms.mobilelab.vn/api/v1/post/'+id,{
		method:'PATCH',
		headers:{
			'Accept':'application/json',
			'Content-Type':'application/json',
			sessionKey
		},
		body:JSON.stringify(
			post
		)
	}).then((response)=>{
		console.log(response);
		if (response.status == 200){
			return true;
		}
		return false;
	})
}

export default updatePost;