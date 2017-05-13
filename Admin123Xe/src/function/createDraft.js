async function createDraft(sessionKey, post) {
	return await fetch ('http://api.cms.mobilelab.vn/api/v1/draft/',{
		method:'POST',
		headers:{
			'Content-Type': 'application/json',
			'Accept': 'application/json',
			sessionKey
		},
		body:JSON.stringify(post)
	}).then((response)=>{
		console.log(response);
		if(response.status == 200){
			return true
		}
		return false;
	})
}

export default createDraft;