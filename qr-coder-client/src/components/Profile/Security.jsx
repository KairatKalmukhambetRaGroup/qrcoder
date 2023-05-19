import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { EmailInput, PasswordInput } from "../Input";
import { changeEmail, changePass } from "../../actions/user";
import SecurityModal from "./SecurityModal";
import { CLEAR_USER_STATUS } from "../../constants/actionTypes";

const initEmailData = {new_email: '', new_email_re: ''};
const initPasswordData = {old_password: '', new_password: '', new_password_re: ''};
const initError = {emailError: '', passError: ''};

const Security = () => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const profile = JSON.parse(localStorage.getItem('profile'));
    const [user, setUser] = useState(profile?.user);
    
    const [emailData, setEmailData] = useState(initEmailData);
    const [passwordData, setPasswordData] = useState(initPasswordData);
    const [error, setError] = useState(initError);

    const {authStatus, updateType} = useSelector((state)=>state.users);
    const [modal, setModal] = useState('');

    useEffect(()=>{
        if(authStatus){
            if(updateType === 'password') {
                switch (authStatus) {
                    case 200:
                        setModal('successPass');
                        setTimeout(()=>close(), 1500);
                        break;
                    case 401: 
                        setModal('invalidPass');
                        setTimeout(()=>close(), 1500);
                        break;
                    case 404: 
                        setModal('userPass');
                        setTimeout(()=>close(), 1500);
                        break;
                    default:
                        setModal('error');
                        setTimeout(()=>close(), 1500);
                        break;
                }
            }else if(updateType === 'email') {
                switch (authStatus) {
                    case 200:
                        setModal('successEmail');
                        setTimeout(()=>close(), 1500);
                        break;
                    case 404: 
                        setModal('userEmail');
                        setTimeout(()=>close(), 1500);
                        break;
                    default:
                        setModal('error');
                        setTimeout(()=>close(), 1500);
                        break;
                }
            }
        }
    }, [authStatus, updateType]);

    // useEffect(()=>{
    //     if(modal && modal !== 'loading'){
    //         console.log(modal);
    //         setTimeout(close(), 3000);
    //     }
    // },[modal])
        
    const close = () => {
        console.log('close');
        setModal('');
        dispatch({type: CLEAR_USER_STATUS});
    }

    useState(()=>{
        if(!profile || !user){
            navigate('/');
        }
    }, [user]);

    const handleEmailChange = (name, value) => {
        setEmailData({...emailData, [name]: value});
        setError({...error,emailError: ''});
    }
    const handleEmailSubmit = (e) => {
        e.preventDefault();
        console.log(emailData);
        if(!emailData.new_email || !emailData.new_email_re){
            setError({...error, emailError: t("profile.security.errors.empty")});
        }
        else if(emailData.new_email !== emailData.new_email_re){
            setError({...error, emailError: t("profile.security.errors.emailMismatch")});
        }else{
            dispatch(changeEmail(emailData));
            setModal('loading');
        }
    }

    const handlePasswordChange = (name, value) => {
        setPasswordData({...passwordData, [name]: value});
        setError({...error, passError: ''});
    }
    const handlePasswordSubmit = (e) => {
        e.preventDefault();
        if(!passwordData.old_password || !passwordData.new_password || !passwordData.new_password_re){
            setError({...error, passError: t("profile.security.errors.empty")});
        }
        else if(passwordData.new_password.length < 8){
            setError({...error, passError: t("profile.security.errors.passLength")});
        }
        else if(passwordData.new_password !== passwordData.new_password_re){
            setError({...error, passError: t("profile.security.errors.passMismatch")});
        }else{
            dispatch(changePass(passwordData));
            setModal('loading');

        }
    }


    return (
        <div id="security">
            <SecurityModal modal={modal} />
            <div className="cell email">
                <div className="text">
                    <div className="heading">{t("profile.security.email.heading")}</div>
                    <div className="description">{t("profile.security.email.description")}</div>
                </div>
                <div className="inputs">
                    <div className="row">
                        <div className="col">
                            <EmailInput label={t("profile.inputs.old_email.label")} name="old_email" value={user.email} disabled={true}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <EmailInput label={t("profile.inputs.new_email.label")} name="new_email" placeholder={t("profile.inputs.new_email.placeholder")} value={emailData.new_email} onChange={handleEmailChange}/>
                        </div>
                        <div className="col">
                            <EmailInput label={t("profile.inputs.new_email_re.label")} name="new_email_re" placeholder={t("profile.inputs.new_email_re.placeholder")} value={emailData.new_email_re} onChange={handleEmailChange}/>
                        </div>
                    </div>
                    {error && error.emailError && (
                        <div className="error">
                            <i></i>
                            <div className="error-text">{error.emailError}</div>
                        </div>
                    )}
                </div>
                <div className="btn48" onClick={handleEmailSubmit}>{t("profile.inputs.changeEmail")}</div>
            </div>
            <div className="cell password">
                <div className="text">
                    <div className="heading">{t("profile.security.password.heading")}</div>
                    <div className="description">{t("profile.security.password.description")}</div>
                </div>
                <div className="inputs">
                    <div className="row">
                        <div className="col">
                            <PasswordInput label={t("profile.inputs.old_password.label")} placeholder={t("profile.inputs.old_password.placeholder")} name="old_password" value={passwordData.old_password} onChange={handlePasswordChange}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <PasswordInput label={t("profile.inputs.new_password.label")} placeholder={t("profile.inputs.new_password.placeholder")} name="new_password" value={passwordData.new_password} onChange={handlePasswordChange}/>
                        </div>
                        <div className="col">
                            <PasswordInput label={t("profile.inputs.new_password_re.label")} placeholder={t("profile.inputs.new_password_re.placeholder")} name="new_password_re" value={passwordData.new_password_re} onChange={handlePasswordChange}/>
                        </div>
                    </div>
                    {error && error.passError && (
                        <div className="error">
                            <i></i>
                            <div className="error-text">{error.passError}</div>
                        </div>
                    )}
                </div>
                <div className="btn48" onClick={handlePasswordSubmit}>{t("profile.inputs.changePassword")}</div>
            </div>
        </div>
    )
};

export default Security;