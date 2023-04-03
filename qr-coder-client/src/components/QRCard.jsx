import React, { useCallback,  useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {QRCodeSVG} from 'qrcode.react';
import toImg from 'react-svg-to-image';
import '../styles/qrcard.scss';
import { useDispatch } from "react-redux";

const fileExtensions = ['svg', 'png', 'jpeg'];

function downloadBlob(blob, filename) {
    const objectUrl = URL.createObjectURL(blob);
  
    const link = document.createElement("a");
    link.href = objectUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  
    setTimeout(() => URL.revokeObjectURL(objectUrl), 5000);
}

const QRCard = ({qrValue=''}) => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const [currentExt, setCurrentExt] = useState('svg');
    const [showExtList, setShowExtList] = useState(false);
    const qrRef = useRef();

    const handleExtensionChange = async (e) => {
        e.preventDefault();
        const value = e.currentTarget.dataset.value
        setCurrentExt(value);
        setShowExtList(false);
    }

    const dowloadQR = useCallback(() => {
        const qr = qrRef.current.innerHTML;
        // qr.setAttribute("xmlns", "http://www.w3.org/2000/svg");
        if(currentExt === 'svg'){
            const blob = new Blob([qr], { type: "image/svg+xml"});
            downloadBlob(blob, `qrcode.svg`);
        }else{
            toImg('#svg', 'qrcode',{
                format: currentExt,
                download: true
            })
        }
    }, []);

    return (
        <div className="qr-card">
            <div ref={qrRef}>            
                {/* <svg
                    version="1.0"
                    xmlns="http://www.w3.org/2000/svg"
                    width="210"
                    height="210"
                    viewBox="0 0 210 210"
                    preserveAspectRatio="xMidYMid meet"
                > */}
                    <QRCodeSVG id="svg" xmlns="http://www.w3.org/2000/svg" value={qrValue} size={210} />
                {/* </svg> */}
            </div>
            <div className="file-extension-wrapper">
                <div className={`file-extension ${showExtList ? 'active' : ''}`}  >
                    <div className="current" onClick={(e)=>{e.preventDefault(); setShowExtList(!showExtList)}}>
                        {t(`qrcard.extensions.${currentExt}`)}
                        <i></i>
                    </div>
                    <div className="options">
                        {fileExtensions.map((ext, key)=> ext!==currentExt && (
                            <div className="option" data-value={ext} key={key} onClick={handleExtensionChange}>
                                {t(`qrcard.extensions.${ext}`)}
                                <span className="underline"></span>
                            </div>   
                        ))}
                    </div>
                </div>
            </div>
            <div className="btn48 btn-outline w-100" onClick={dowloadQR} >{t("qrcard.download")}</div>
        </div>
    );
};

export default QRCard;