import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getQR } from "../../actions/qr";
import QRForm from '../QRForm';
import '../../styles/qr.scss';
import { useTranslation } from "react-i18next";

const Edit = () => {
    const {t} = useTranslation();
    const {link} = useParams();
    const dispatch = useDispatch();
    const {qr} = useSelector((state)=>state.qr);
    const navigate = useNavigate();

    useEffect(()=>{
        dispatch(getQR(link));
    }, [dispatch])
    return (
        <div id="edit">
            <div className="container">
                <div className="content">
                    <div className="back" onClick={(e)=>{e.preventDefault(); navigate(-1);}}>
                        <i></i> {t("goBack")}
                    </div>
                    {qr && (
                        <QRForm qr={qr} authorized={true} name={qr.name}/>        
                    )}
                </div>
            </div>
        </div>
    )
};

export default Edit;