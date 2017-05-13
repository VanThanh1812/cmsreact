async function getPostById(id) {
	return await fetch('http://api.cms.mobilelab.vn/api/v1/post/'+id)
	.then((response)=>{
		//console.log(response);
		console.log('http://api.cms.mobilelab.vn/api/v1/post/'+id);
		if (response.status == 200){
			return response;	
		}
		return null;
	}).catch((error)=>{
		console.log(error);
	})
}

export default getPostById;