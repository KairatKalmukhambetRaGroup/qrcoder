import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {useDispatch, useSelector} from 'react-redux';
import { Link } from "react-router-dom";
import { sendActivationLink, signup } from "../actions/user";
import {auth} from '../utils/firebase';


import '../styles/signup.scss';

import { EmailInput, PasswordInput } from "./Input";
import { googleAuth } from "../actions/googleAuth";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const initFormData = {email: '', password: '', password_repeat: ''};

const RegistrationSuccess = ({t, sendAgain, back}) => {
    return (
        <div className="success">
            <i></i>
            <div className="content">
                <div className="text">
                    {t("signup.success.text")}
                </div>
                <div className="btn48 w-100" onClick={sendAgain}>
                    {t("signup.success.button")}
                </div>
            </div>
            <div className="btn-back" onClick={back}>
                <i></i>
                {t("goBack")}
            </div>
        </div>
    )
}

const Signup = () => {
    const {t, i18n} = useTranslation();
    const dispatch = useDispatch()

    const [currentLang, setCurrentLang] = useState(i18n.language)
    const [formData, setFormData] = useState(initFormData);
    const [error, setError] = useState('');

    const [status, setStatus] = useState('signup');

    const {registrationStatus} = useSelector((state)=>state.users);

    useEffect(()=>{
        if(registrationStatus){
            switch (registrationStatus) {
                case 200:
                    setStatus('success');
                    break;
                case 401:
                    setError(t("signup.errors.userAlreadyExist"));
                    setStatus('signup')
                    break;
                default:
                    setStatus('error');
                    break;
            }
        }
    }, [registrationStatus])

    // SIGN IN WITH GOOGLE
    const googleProvider = new GoogleAuthProvider();
    const GoogleLogin = async() => {
        try {
            const res = await signInWithPopup(auth, googleProvider);
            dispatch(googleAuth(res.user));
        } catch (error) {
            console.log(error);
        }
    }


    const handleChange = (name, value) => {
        setFormData({...formData, [name]: value});
        setError('');
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if(formData.password !== formData.password_repeat){
            setError(t("signup.errors.pass_match"));
        }else{
            dispatch(signup({...formData, lang: currentLang}));
            setStatus('loading');
        }
    }
    const sendAgain = (e) => {
        e.preventDefault();
        dispatch(sendActivationLink(formData.email, currentLang));
    }
    const back = (e) =>{
        e.preventDefault();
        setStatus('signup');
    }



    return (
        <div id="signup">
            {status === 'loading' && (
                <div className="loading"><i></i></div>
            )}
            {status === 'signup' && (
                <>
                    <div className="heading">{t("signup.heading")}</div>
                    <form onSubmit={handleSubmit}>
                        <div className="inputs">
                            <EmailInput 
                                label={t("signup.inputs.email.label")} 
                                placeholder={t("signup.inputs.email.placeholder")} 
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                isRequred={true}
                            />
                            <PasswordInput 
                                label={t("signup.inputs.password.label")} 
                                placeholder={t("signup.inputs.password.placeholder")} 
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                isRequred={true}
                            />
                            <PasswordInput 
                                label={t("signup.inputs.password_repeat.label")} 
                                placeholder={t("signup.inputs.password_repeat.placeholder")} 
                                name="password_repeat"
                                value={formData.password_repeat}
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
                        <div className="buttons">
                            <input type="submit" className="btn48 w-100" value={t("signup.next_btn")} />
                            <div className="or-line">
                                <span></span>

                                {t("signup.or")}
                                <span></span>
                            </div>
                            <div className="btn48 btn-outline google-login w-100" onClick={GoogleLogin}>
                                <i></i>
                                {t("login.with_google")}
                            </div>
                        </div>
                        <Link to="/login" className="has-account">{t("signup.has_account")}</Link>
                    </form>
                </>
            )}
            {status === 'success' && <RegistrationSuccess t={t} sendAgain={sendAgain} back={back} />}
        </div>
    );
};

export default Signup;