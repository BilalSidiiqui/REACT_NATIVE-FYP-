import axios from 'axios';
import {URL} from '../../utils/constant';
import {set_loading, set_signup_failure, set_signup_success, set_user_failure, set_user_success} from './type';

export function login(data) {
  return dispatch => {
    dispatch({type:set_loading,payload:true})
  
    return axios.post(URL.Url + 'login/', data).then(res => {
      console.log(res.data);
      dispatch({type: set_user_success, payload: res.data});
    }).catch(error=>{
      dispatch({type: set_user_failure, payload: error});
   
    })
  };
}

export function signup(data) {
  return dispatch => {
    dispatch({type:set_loading,payload:true})
    return axios.post(URL.Url + 'register/', data).then(res => {
      console.log("Success",res.data);
      dispatch({type: set_signup_success, payload: res.data});
    }).catch((error)=>{
      dispatch({type: set_signup_failure, payload: error});
      
      console.log("Failed",error);
    })
  };
  
}