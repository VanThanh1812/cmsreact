import {
	AsyncStorage
} from 'react-native';
import key_static from '../function/value';

function removeDataOffline() {
	 try {
      	AsyncStorage.multiRemove(['KEY_SESSION', 'KEY_USER'], (err)=>{
      		console.log(err);
      	});
      	
    } catch (error) {
      console.log(error)
    }
}

export default removeDataOffline;