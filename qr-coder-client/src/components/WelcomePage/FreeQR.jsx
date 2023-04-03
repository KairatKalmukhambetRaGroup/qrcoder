import React from "react";
import { useTranslation } from "react-i18next";
import QRForm from "../QRForm";
const FreeQR = () => {
    const {t} = useTranslation();
    return (
        <div className="freeQR" id="freeQR">
            <div className="container">
                <div className="content">
                    <div className="top">
                        <div className="heading">{t('welcome.qr.heading')}</div>
                        <div className="description">{t('welcome.qr.description')}</div>
                    </div>
                    <QRForm/>
                </div>
            </div>
        </div>
    );
}
export default FreeQR;