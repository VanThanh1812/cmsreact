import {key_static} from './value'; 
import{
	AsyncStorage
}from 'react-native';

function saveData(response) {
		console.log(response);
		console.log('num2 '+response.sessionKey);
		try{
			AsyncStorage.setItem(key_static.key_session, '3251873ffe117f731cfa83b4652a042a2ae2bce90d3c249f26d32b4b29f92da1_4_15_1487920737');
			AsyncStorage.setItem(key_static.key_user, JSON.stringify(response.userProfile));
			console.log(response.sessionKey);
		}catch(e){
			console.log(e);
		}finally{
			console.log('final');
		}
	
}

export default saveData;