import getPostById from './getPostById';

async function getPostAdmin(sessionKey, fromPost, count) {
	console.log(count);
	return await fetch('http://api.cms.mobilelab.vn/api/v1/post/?fromPost='+fromPost+'&count='+count,
	{
		method:'GET',
		headers:{
			'Accept':'application/json',
			'sessionKey':sessionKey,
		},
	}).then((response)=>{
		return response;	
	}).catch((error)=>{
		console.log(error);
	})
}

async function generateListPost(response){
	console.log(response);
	var listPostById = [];
	var listPost = JSON.parse(response._bodyInit).data.posts;
	
	for ( i = 0 ; i < listPost.length; i++ ){
		var idPost = listPost[i].id;
		var responsePost = await getPostById(idPost);
		if ((responsePost !== null)&&(responsePost.status == 200)){
			listPostById.push(responsePost); // Post nay chua medias
		}
	}
	return listPostById;
}

async function startGetData(sessionKey, fromPost, count){
	data = await getPostAdmin(sessionKey, fromPost, count); // lay response ve da 
	return await generateListPost(data); // co response roi thi get post sau
}

export default startGetData;