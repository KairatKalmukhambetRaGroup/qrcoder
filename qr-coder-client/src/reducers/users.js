import { AUTH, CHANGE_EMAIL, CHANGE_PASSWORD, CLEAR_USER_STATUS, GOOGLE_AUTH, LOGOUT, REGISTER, RESET_PASSWORD, RESTORE_ACCOUNT, USER_ACTIVATION } from "../constants/actionTypes";

const userReducers = (state = {updateType: null, restorationStatus: null, googleAuthData: null, authData: null, authStatus: null, registrationStatus: null, activationStatus: null}, action) => {
    switch (action.type) {
        case CLEAR_USER_STATUS: 
            return {...state, authStatus: null, registrationStatus: null, activationStatus: null, restorationStatus: null, updateType: null};
        case LOGOUT:
            localStorage.removeItem('profile');
            return {...state, authData: null};
        case AUTH:
        case CHANGE_EMAIL:
        case CHANGE_PASSWORD:
        case RESET_PASSWORD:
            if(!!action.payload && !!action.payload.data && action.payload.status === 200){
                localStorage.setItem('profile', JSON.stringify({...action.payload.data}));
                return {...state, authData: action.payload.data, authStatus: action.payload.status, updateType: action.payload?.type};
            }
            
            return {...state, authData: null, authStatus: action.payload.status, updateType: action.payload?.type}; 

        case REGISTER:
            return {...state, authData: null, authStatus: null, registrationStatus: action.payload.status};    
        
        case RESTORE_ACCOUNT:
            return {...state, restorationStatus: action.payload.status};
    
        case USER_ACTIVATION: 
            if(!!action.payload && !!action.payload.data && action.payload.status === 200){
                localStorage.setItem('profile', JSON.stringify({...action.payload.data}));
                return {...state, authData: action.payload.data, activationStatus: action.payload.status}; 
            }
            return {...state, activationStatus: action.payload.status};
        
        case GOOGLE_AUTH: 
            console.log(action?.data);
            return state;
        default:
            return state;
    }
}

export default userReducers