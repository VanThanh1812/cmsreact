async function getAllCommentByPost(idPost) {
	return await fetch ('http://api.cms.mobilelab.vn/api/v1/post/'+idPost+'/comment',{
		method:'GET',
		headers:{
			'Accept':'application/json',
		}
	}).then((response)=>{
		if (response.status == 200){
			return response;
		}
		return null;
	})
}

export default getAllCommentByPost;