async function saveAsPost(sessionKey, id, post) {
	console.log(post);
	return await fetch('http://api.cms.mobilelab.vn/api/v1/draft/'+id+'/save-as-post', {
		method:'POST',
		headers:{
			'Accept':'application/json',
			'Content-Type':'application/json',
			sessionKey
		},
		body: JSON.stringify(post)
	}).then((response)=>{
		console.log(response);
		if (response.status == 200){
			return true;
		}
		return false;
	})
}

export default saveAsPost;