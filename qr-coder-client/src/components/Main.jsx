import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {useNavigate, useParams} from 'react-router-dom';
import { getQRs } from "../actions/qr.js";

import '../styles/mainPage.scss';
import Pagination from "./Pagination.jsx";
import QRItem from "./QR/QRItem.jsx";

const Main = () => {
    const {t} = useTranslation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [profile, setProfile] = useState(JSON.parse(localStorage.getItem('profile')));
    const [user, setUser] = useState(null);
    const {qrs, total, count} = useSelector((state)=>state.qr);

    const maxQRCount = 10;

    const {page} = useParams();

    useEffect(()=>{
        if(profile && profile.user){
            setUser(profile.user)
        }else{
            navigate('/');
        }
    }, [profile]);

    useEffect(()=>{
        dispatch(getQRs(page));
    }, [page]);

    return (
        <div id="mainPage">
            <div className="container">
                <div className="content">
                    <div className="heading">
                        <div className="heading">{t("qr.main.heading")}</div>
                        <div className="progress">
                            {t("qr.main.progress", {val: maxQRCount})}
                            <div className="progressbar">
                                <div className="bar">
                                    <span style={{maxWidth: '240px', width: `${count/10 * 240}px` }}></span>
                                </div>
                                <div className="text">{count} / {maxQRCount}</div>
                            </div>
                        </div>
                    </div>
                    <div className="qrs">
                        {qrs && qrs.map((qr, key)=> (
                            <QRItem qrValue={`${process.env.REACT_APP_URL}qr/${qr.link}`} qr={qr} key={key} />
                        ))}
                    </div>
                    <Pagination page={page} total={total} route="main" /> 
                </div>
            </div>
        </div>    
    );
};

export default Main;