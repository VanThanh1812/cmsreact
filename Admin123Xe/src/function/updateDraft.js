/*function updateDraft(sessionKey, post, id) {
	// body...
}*/
async function updateDraft(sessionKey, post, id) {
	console.log(id);
	console.log(sessionKey);
	console.log(post);
	return await fetch('http://api.cms.mobilelab.vn/api/v1/draft/'+id,{
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

export default updateDraft;