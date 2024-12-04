import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../actions/user";
import { CLEAR_USER_STATUS } from "../constants/actionTypes";
import '../styles/login.scss';
import { EmailInput, PasswordInput } from "./Input";

import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import {auth} from '../utils/firebase';
import { googleAuth } from "../actions/googleAuth";

const initFormData = {email: '', password: ''};

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {t} = useTranslation();
    const [formData, setFormData] = useState(initFormData);
    const [error, setError] = useState('');
    const {authStatus} = useSelector((state)=>state.users);


    useEffect(()=>{
        if(authStatus){
            switch (authStatus) {
                case 200:
                    dispatch({type: CLEAR_USER_STATUS});
                    navigate('/');
                    break
                case 401:
                    setError(t("login.errors.invalid"));
                    break;
                default:
                    setError(t("login.errors.wentWrong"))
                    break;
            }
        }
    }, [authStatus]);


    // SIGN IN WITH GOOGLE
    const googleProvider = new GoogleAuthProvider();
    const GoogleLogin = async () => {
        try {
            const res = await signInWithPopup(auth, googleProvider);
            dispatch(googleAuth(res.user));
        } catch (error) {
            console.log(error)
        }
    }

    const handleChange = (name, value) => {
        setFormData({...formData, [name]: value});
        setError('');
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(login({email: formData.email, password: formData.password}))
    }
    return (
        <div id="login">
            <div className="heading">{t("login.heading")}</div>
            <form onSubmit={handleSubmit}>
                <div className="inputs">
                    <EmailInput 
                        label={t("login.inputs.email.label")} 
                        placeholder={t("login.inputs.email.placeholder")} 
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        isRequred={true}
                    />
                    <PasswordInput 
                        label={t("login.inputs.password.label")} 
                        placeholder={t("login.inputs.password.placeholder")} 
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        isRequred={true}
                    />
                    {error && (
                        <div className="error">
                            <i></i>
                            <div className="error-text">{error}</div>
                        </div>
                    )}
                </div>
                <div className="qa-action">
                    <span>
                        {t("login.forgot_password")}
                    </span>
                    <Link to="restore" className="action">{t("login.restore")}</Link>
                </div>
                <div className="buttons">
                    <input type="submit" className="btn48 w-100" value={t("login.login_btn")} />
                    <div className="or-line">
                        <span></span>
                        {t("login.or")}
                        <span></span>
                    </div>
                    <div className="btn48 btn-outline google-login w-100" onClick={GoogleLogin}>
                        <i></i>
                        {t("login.with_google")}
                    </div>
                </div>
                <div className="qa-action">
                    <span>
                        {t("login.no_account")}
                    </span>
                    <Link to="/signup" className="action">{t("login.signup")}</Link>
                </div>
            </form>
        </div>
    );
};

export default Login;