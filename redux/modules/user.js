// 유저의 프로필을 저장한다.

// Imports

import { API_URL } from '../../constants';
import { AsyncStorage } from 'react-native';

// Actions

const LOG_IN = "LOG_IN";
const LOG_OUT = "LOG_OUT";
const SET_USER = "SET_USER";
const SET_PROFILE = "SET_PROFILE";

// Action Creators

function setLogIn(token){
  return{
    type : LOG_IN,
    token : token
  }
}

function setUser(User){
  return{
    type : SET_USER,
    User: User,
  }
}

function logOut(){
  return {
    type: LOG_OUT
  }
}

function setProfile(){
  return{
    type: SET_PROFILE
  }
}


// API Actions
function login(email,password){
  return dispatch =>{
    return fetch(`${API_URL}/login`,{
      method: "POST",
      headers:{
        "Content-Type" : "application/json"
      },
      body: JSON.stringify({
        email:email,
        password:password
      })
    })
    .then(response => response.json())
    .then(json => {
      if(json.token && json.User){
        if(json.User.nick){
          dispatch(setProfile());
        }
        dispatch(setLogIn(json.token));
        dispatch(setUser(json.User));
        return true;
      }else{
        return false;
      }
    });
  }
}
// Initial State

const initialState = {
    isLoggedIn: false,
    makeProfile: false,
    confirmUniv: false,
  };
  
  // Reducer
  
  function reducer(state = initialState, action) {
    switch (action.type) {
      case LOG_IN:
        return applyLogIn(state,action);
      case LOG_OUT:
        return applyLogOut(state,action);
      case SET_USER:
        return applySetUser(state,action);
      case SET_PROFILE:
        return applySetProfile(state,action);
      default:
        return state;
    }
  }
  
  // Reducer Functions
  
  function applyLogIn(state,action){
    const { token } = action;
    return {
      ...state,
      isLoggedIn: true,
      token: token,
    }
  }
  async function applyLogOut(state,action){
    await AsyncStorage.clear();
    return {
      ...state,
      isLoggedIn:false,
      makeProfile:false,
      confirmUniv:false,
      token: ""
    }
  }
  function applySetUser(state,action){
    const { User } = action;
    return {
      ...state,
      profile: User,
    }
  }
  function applySetProfile(state,action){
    return {
      ...state,
      makeProfile:true,
    }
  }
  

  // Exports

  const actionCreators ={
    login
  };
  export { actionCreators };
  
  // Default Reducer Export
  
  export default reducer;