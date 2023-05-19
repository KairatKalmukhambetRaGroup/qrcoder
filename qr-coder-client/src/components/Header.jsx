import React, { useEffect, useState } from "react";
import decode from 'jwt-decode';

import '../styles/header.scss';

import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AUTH, CLEAR_QR_STATUSES, LOGOUT } from "../constants/actionTypes";
import { addLinksToUser, addQRToUser, getQRCount } from "../actions/qr";

const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showLangs, setShowLangs] = useState(false);
    const { t, i18n } = useTranslation();
    const [currentLang, setCurrentLang] = useState(i18n.language)
    const [user, setUser] = useState(null);
    
    const languages = ['en', 'ru', 'kz'];
    const {authData} = useSelector((state)=>state.users);
    const {qrAppendStatus, qrCount} = useSelector((state)=>state.qr);

    useEffect(()=>{
        const profile = JSON.parse(localStorage.getItem('profile'));
        if(profile && profile.token && profile.user){
            const token = profile.token;
            dispatch(getQRCount());
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
    }, [authData, dispatch]);

    const appendToUser = () => {
        if(user && user._id){
            const localQR = JSON.parse(localStorage.getItem('qr'));
            if(localQR && localQR._id){
                const obj = localQR.object;
                if(obj.createdAt !== obj.updatedAt)
                    dispatch(addQRToUser(localQR._id))
            }
        }       
    }

    useEffect(()=>{
        appendToUser();
    }, [user]);
    useEffect(()=>{
        if(qrAppendStatus){
            if(qrAppendStatus === 200){
                localStorage.removeItem('qr');          
                dispatch({type: CLEAR_QR_STATUSES});  
            }
        }
    }, [qrAppendStatus]);


    const changeLanguage = (e) =>{
        e.preventDefault();
        const l = e.currentTarget.dataset.lang;
        setCurrentLang(l);
        i18n.changeLanguage(l);
        setShowLangs(false);
    }
    const logout = (e) => {
        e.preventDefault();
        setUser(null);
        navigate('/');
        dispatch({type: LOGOUT});
    }
    return (
        <div id="header">
            <div className="container">
                <div className="navbar">
                    <Link to="/" className="logo">QR Coder</Link>
                    {user && (
                        <nav>
                            <li><Link to="/main" className="link">{t("header.main")}</Link></li>
                            {Number(qrCount) < 10 ? (
                                <li><Link to="/qr/new" className="link create"><i></i> {t("header.create")}</Link></li>
                            ) : (
                                <li><div className="link create disabled"><i></i> {t("header.create")}</div></li>
                            )}
                        </nav>
                    )}
                    <nav>
                        {user ? (
                            <>
                                <li>
                                    <Link to="/profile" className="profile"><i></i></Link>
                                </li>
                                <li>
                                    <div className="btn48 btn-outline" onClick={logout}>{t("header.logout")}</div>
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <Link to="/login" className="btn48">{t('header.login')}</Link>
                                </li>
                                <li>
                                    <Link to="/signup" className="btn48 btn-outline">{t('header.signup')}</Link>
                                </li>
                            </>
                        )}
                        <li>
                            <a href="" className={`lang-btn ${showLangs ? 'active':''}`}>
                                <div className="btn">
                                    <div className="current" onClick={(e)=>{e.preventDefault(); setShowLangs(!showLangs)}}>
                                        {currentLang.toUpperCase()} <i></i>
                                    </div>
                                    <div className="dropdown">
                                        {languages.map((lang, key)=>{
                                            if(lang != currentLang){
                                                return (
                                                    <div data-lang={lang} key={key} onClick={changeLanguage}>
                                                        <span>
                                                            {lang.toUpperCase()}
                                                        </span>
                                                    </div>
                                                );
                                            }
                                        })}
                                    </div>
                                </div>
                            </a>
                        </li>
                    </nav>
                </div>
            </div>
        </div>
    );
};

export default Header;