import saveData from '../function/saveData';

async function sessionKey(email, password) {
	return await fetch('http://api.cms.mobilelab.vn/api/v1/auth/email',{
		method:'POST',
		headers:{
			'Accept':'application/json',
			'Content-Type':'application/json',
		},
		body:JSON.stringify({
			'email': email,
			'password': password
		})
	}).then((response)=>{
		//console.log(response);
		var responseJson = JSON.parse(response._bodyInit) ;
		if ((response.status === 200) && (responseJson.data.sessionKey !== '')){
    			console.log("Session "+responseJson.data.sessionKey);
    			saveData(responseJson.data);
    			return responseJson.data;
    		}else{
    			console.log('null');
    			return null;
    		}
		
	}).catch((error)=>{
		console.log(error);
	})
}

export default sessionKey;