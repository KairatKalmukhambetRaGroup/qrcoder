import React, {useContext, useState} from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import decode from 'jwt-decode';
import { LOGOUT } from "../constants/actionTypes";
import { useNavigate } from "react-router-dom";

const UserContext = React.createContext();

export function useUser() {
    return useContext(UserContext);
}

export function UserProvider({children}) {
    const [user, setUser] = useState(null);
    const {authData} = useSelector((state)=>state.users);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(()=>{
        const profile = JSON.parse(localStorage.getItem('profile'));
        if(profile && profile.token && profile.user){
            const token = profile.token;
            // dispatch(getQRCount());
            if (token) {
                const decodedToken = decode(token);
                if (decodedToken.exp * 1000 < new Date().getTime())
                    dispatch({type: LOGOUT});            
                else
                    setUser(profile.user);
            } 
        }else{
            setUser(null);
            dispatch({type: LOGOUT});
        }
    },[authData])

    const logout = () => {
        setUser(null);
        navigate('/');
        dispatch({type: LOGOUT})
    }

    const value = {
        user,
        setUser,
        logout
    }

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
}