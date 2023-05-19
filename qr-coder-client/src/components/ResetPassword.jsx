import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../actions/user";

import '../styles/resetPassword.scss';
import { PasswordInput } from "./Input";
import { useNavigate, useParams } from "react-router-dom";
import { CLEAR_USER_STATUS } from "../constants/actionTypes";

const initFormData = {password: '', repeat: ''};

const ResetPassword = () => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [formData, setFormData] = useState(initFormData);
    const [error, setError] = useState('');
    const {id} = useParams();

    const {authStatus} = useSelector((state) => state.users);

    const handleChange = (name, value) => {
        setFormData({...formData, [name]: value});
        setError('');
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if(!formData.password){
            setError(t("resetPassword.errors.emptyPassword"))
        }else if(!formData.repeat){
            setError(t("resetPassword.errors.emptyRepeat"))
        }else if(formData.password !== formData.repeat){
            setError(t("resetPassword.errors.mismatch"))
        }else{
            dispatch(resetPassword({...formData, id: id}));
        }
    }

    useEffect(()=> {
        if(authStatus){
            switch (authStatus) {
                case 200:
                    dispatch({type: CLEAR_USER_STATUS});
                    navigate('/main');
                    break;
                default:
                    break;
            }
            dispatch({type: CLEAR_USER_STATUS});
        }
    }, [authStatus])

    return (
        <div id="resetPassword">
            <form onSubmit={handleSubmit}>
                <div className="description">{t("resetPassword.description")}</div>
                <div className="inputs">
                    <PasswordInput 
                        label={t("resetPassword.password.label")}  
                        placeholder={t("resetPassword.password.placeholder")}
                        name="password"
                        value={formData.password}
                        onChange={handleChange} 
                    />
                    <PasswordInput 
                        label={t("resetPassword.repeat.label")}  
                        placeholder={t("resetPassword.repeat.placeholder")}
                        name="repeat"
                        value={formData.repeat}
                        onChange={handleChange} 
                    />
                    {error && (
                        <div className="error">
                            <i></i>
                            <div className="error-text">{error}</div>
                        </div>
                    )}
                </div>
                <input type="submit" className="btn48 w-100" value={t("resetPassword.submit")} />
            </form>
        </div>
    )
}

export default ResetPassword;