import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import '../styles/restore.scss';
import { EmailInput } from "./Input";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { restoreAccount } from "../actions/user";
import { CLEAR_USER_STATUS } from "../constants/actionTypes";

const Restore = () => {
    const dispatch = useDispatch();
    const {t, i18n} = useTranslation();
    const [currentLang, setCurrentLang] = useState(i18n.language)

    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [status, setStatus] = useState('');
    const {restorationStatus} = useSelector((state) => state.users);

    const handleChange = (name, value) => {
        setEmail(value);
        setError('');
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if(email.length === 0){
            setError(t("restoreAccount.errors.emptyEmail"));
        }else if(!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)){
            setError(t("restoreAccount.errors.invalidEmail"));
        }else{
            dispatch(restoreAccount({email: email, lang: currentLang}));
        }
    } 

    useEffect(()=>{
        if(restorationStatus){
            switch (restorationStatus) {
                case 200:
                    setStatus('success');
                    break;
                default:
                    setStatus('error');
                    break;
            }
            dispatch({type: CLEAR_USER_STATUS});
        }
    }, [restorationStatus]);

    const sendAgain = (e) => {
        e.preventDefault();
        dispatch(restoreAccount({email: email, lang: currentLang}));
    }

    const back = (e) => {
        e.preventDefault();
        setStatus('');
    }


    return status ? (
        <div id="restore">
            <RestoreSuccess t={t} sendAgain={sendAgain} back={back} />
        </div>
    ) : (
        <div id="restore">
            <div className="heading">{t("restoreAccount.heading")}</div>
            <form onSubmit={handleSubmit}>
                <div className="description">{t("restoreAccount.description")}</div>
                <div className="inputs">
                    <EmailInput 
                        label={t("restoreAccount.email.label")}
                        placeholder={t("restoreAccount.email.placeholder")}
                        name="email"
                        value={email}
                        onChange={handleChange}
                        // isRequred={false}
                    />
                    {error && (
                        <div className="error">
                            <i></i>
                            <div className="error-text">{error}</div>
                        </div>
                    )}
                </div>
                <input type="submit" className="btn48 w-100" value={t("restoreAccount.restore")} />
                <div className="qa-action">
                    <span>
                        {t("restoreAccount.rememberPassword")}
                    </span>
                    <Link to="/login" className="action">{t("restoreAccount.login")}</Link>
                </div>
            </form>
        </div>
    )
}
export default Restore;

const RestoreSuccess = ({t, sendAgain, back}) => {
    return (
        <div className="success">
            <i></i>
            <div className="content">
                <div className="text">
                    {t("restoreAccount.success.text")}
                </div>
                <div className="btn48 w-100" onClick={sendAgain}>
                    {t("restoreAccount.success.button")}
                </div>
            </div>
            <div className="btn-back" onClick={back}>
                <i></i>
                {t("goBack")}
            </div>
        </div>
    )
}