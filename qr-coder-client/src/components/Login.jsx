import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../actions/user";
import { CLEAR_USER_STATUS } from "../constants/actionTypes";
import '../styles/login.scss';
import { EmailInput, PasswordInput } from "./Input";

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
                    setError('Вы неправильно ввели email или пароль. Проверьте еще раз');
                    break;
                default:
                    setError('Что то пошло не так. Попробуйте еще раз.')
                    break;
            }
        }
    }, [authStatus]);


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
                    {t("login.forgot_password")}
                    <Link to="" className="action">{t("login.restore")}</Link>
                </div>
                <div className="buttons">
                    <input type="submit" className="btn48 w-100" value={t("login.login_btn")} />
                    {/* <div className="or-line">
                        <span></span>
                        {t("login.or")}
                        <span></span>
                    </div>
                    <div className="btn48 btn-outline google-login w-100">
                        <i></i>
                        {t("login.with_google")}
                    </div> */}
                </div>
                <div className="qa-action">
                    {t("login.no_account")}
                    <Link to="/signup" className="action">{t("login.signup")}</Link>
                </div>
            </form>
        </div>
    );
};

export default Login;