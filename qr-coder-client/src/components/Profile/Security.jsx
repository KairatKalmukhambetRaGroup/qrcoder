import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { EmailInput, PasswordInput } from "../Input";

const initEmailData = {new_email: '', new_email_re: ''};
const initPasswordData = {old_password: '', new_password: '', new_password_re: ''};

const Security = () => {
    const {t} = useTranslation();
    const profile = JSON.parse(localStorage.getItem('profile'));
    const [user, setUser] = useState(profile?.user);
    const navigate = useNavigate();
    
    const [emailData, setEmailData] = useState(initEmailData);
    const [passwordData, setPasswordData] = useState(initPasswordData);

    useState(()=>{
        if(!profile || !user){
            navigate('/');
        }
    }, [user]);

    const handleEmailChange = (name, value) => {
        setEmailData({...emailData, [name]: value});
    }
    const handleEmailSubmit = (e) => {
        e.preventDefault();
    }

    const handlePasswordChange = (name, value) => {
        setPasswordData({...passwordData, [name]: value});
    }
    const handlePasswordSubmit = (e) => {
        e.preventDefault();
    }


    return (
        <div id="security">
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
                </div>
                <div className="btn48" onClick={handlePasswordSubmit}>{t("profile.inputs.changePassword")}</div>
            </div>
        </div>
    )
};

export default Security;