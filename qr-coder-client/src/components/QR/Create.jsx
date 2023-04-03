import React from "react";
import { useTranslation } from "react-i18next";
import {useNavigate} from 'react-router-dom';

import '../../styles/qr.scss';
import QRForm from "../QRForm";

const Create = () => {
    const {t} = useTranslation();
    const navigate = useNavigate();
    return (
        <div id="create">
            <div className="container">
                <div className="content">
                    <div className="back" onClick={(e)=>{e.preventDefault(); navigate(-1);}}>
                        <i></i> {t("goBack")}
                    </div>
                    <div className="heading">{t("qr.newQr")}</div>
                    <QRForm authorized={true} />            
                </div>
            </div>
        </div>
    );
};

export default Create;