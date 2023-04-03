import React from "react";
import {QRCodeSVG} from 'qrcode.react';
import moment from 'moment';
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteQR } from "../../actions/qr";
import { useTranslation } from "react-i18next";



const QRItem = ({qrValue=null, qr=null}) => {
    const {t} = useTranslation();
    const dispatch = useDispatch();

    const deleteQRCode = (e) => {
        if(qr.link)
            dispatch(deleteQR(qr.link));
    }
    
    if(!qrValue || !qr)
        return;
    return (
        <div className="qr-item">
            <div className="info">
                <QRCodeSVG value={qrValue} size={112} />
                <div className="text">
                    <div className="title">
                        <div className="label">{t("qr.item.title")}</div>
                        <div className="value">{qr.name ? qr.name : t("qr.item.title")}</div>
                    </div>
                    <div className="label">{t("qr.item.lastEdit", {date: moment(qr.object.updatedAt).format('DD.MM.YYYY')})}</div>
                </div>
            </div>
            <div className="buttons">

                <div className="btn48 btn-outline w-100 delete" onClick={deleteQRCode}><i></i>{t("qr.item.delete")}</div>
                <Link to={`/qr/edit/${qr.link}`} className="btn48 w-100 edit"><i></i>{t("qr.item.edit")}</Link>
            </div>
        </div>
    );
}
export default QRItem;