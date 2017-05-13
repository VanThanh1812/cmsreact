async function getDraftPost(sessionKey) {
	return await fetch('http://api.cms.mobilelab.vn/api/v1/draft/',{
		method:'GET',
		headers:{
			'Accept':'application/json',
			sessionKey
		}
	}).then((response)=>{
		console.log(response);
		if (response.status == 200){
			return response
		}
		return null;
	})
}

export default getDraftPost;