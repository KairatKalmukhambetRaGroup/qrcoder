import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import {useNavigate} from 'react-router-dom';

import '../../styles/qr.scss';
import QRForm from "../QRForm";
import { useDispatch, useSelector } from "react-redux";
import { getQRCount } from "../../actions/qr";

const Create = () => {
    const dispatch = useDispatch();
    const {qrCount} = useSelector((state)=>state.qr);
    const {t} = useTranslation();
    const navigate = useNavigate();
    useEffect(()=>{
        dispatch(getQRCount());
    }, [dispatch]);
    return (
        <div id="create">
            <div className="container">
                <div className="content">
                    <div className="back" onClick={(e)=>{e.preventDefault(); navigate(-1);}}>
                        <i></i> {t("goBack")}
                    </div>
                    <div className="heading">{t("qr.newQr")}</div>
                    {Number(qrCount) < 10 ? (
                        <QRForm authorized={true} />            
                    ) : (
                        <div>
                            NULL
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Create;