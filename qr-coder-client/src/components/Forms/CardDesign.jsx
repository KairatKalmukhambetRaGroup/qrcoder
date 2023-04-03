import React, { useCallback, useEffect, useRef, useState } from "react";
import '../../styles/forms.scss';
import toImg from 'react-svg-to-image';
import { ColorInput, TextInput } from "../Input";
import { useTranslation } from "react-i18next";
import {QRCodeSVG} from 'qrcode.react';

const fileExtensions = ['svg', 'png', 'jpeg'];

const initFormData = {logo: null, backgroundColor: '', textColor: '', qrColor: ''};

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

const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file)
      fileReader.onload = () => {
        resolve(fileReader.result);
      }
      fileReader.onerror = (error) => {
        reject(error);
      }
    })
  }


const CardDesign = ({form, link}) => {
    const {t} = useTranslation();

    const [formData, setFormData] = useState(initFormData);
    const [currentExt, setCurrentExt] = useState('svg');
    const [showExtList, setShowExtList] = useState(false);

    const cardFrontRef = useRef();
    const cardBackRef = useRef();
    const handleChange = (name, value) => {
        setFormData({...formData, [name]: value});
    }

    const handleFileInput = async (e) => {
        const file = e.target.files[0];
        const base64 = await convertBase64(file);
        setFormData({...formData, logo: base64});
    };

    const removeLogo = (e) => {
        e.preventDefault();
        setFormData({...formData, logo: null})
    }
    const handleExtensionChange = async (e) => {
        e.preventDefault();
        const value = e.currentTarget.dataset.value
        setCurrentExt(value);
        setShowExtList(false);
    }

    const downloadCard = useCallback(() => {
        const cardFront = cardFrontRef.current.innerHTML;
        const cardBack = cardBackRef.current.innerHTML;
        const ext = document.querySelector("#currentExt").dataset.value;
        if(ext === 'svg'){
            const front = new Blob([cardFront], { type: "image/svg+xml"});
            downloadBlob(front, `businessCardFront.svg`);
            const back = new Blob([cardBack], { type: "image/svg+xml"});
            downloadBlob(back, `businessCardBack.svg`);
        }else{
            toImg('#cardFront', 'businessCardFront',{
                format: ext,
                download: true
            })
            toImg('#cardBack', 'businessCardBack',{
                format: ext,
                download: true
            })
        }
    }, []);

    return (
        <div id="carddesign">
            <div className="cardForm">

                <div className="card">
                    <div className="front" ref={cardFrontRef}>
                        <svg id="cardFront" xmlns="http://www.w3.org/2000/svg"  width="420" height="274" viewBox="0 0 420 274">
                            <rect x={0} y={0} width="100%" height="100%" fill={formData.backgroundColor ? formData.backgroundColor : '#F5F5F5'} />
                            {formData.logo ? (
                                <image x="50%" y="50%" transform="translate(-60, -60)" width="120" height="120"  href={formData.logo} alt="logotype" className="logotype" />
                            ) : (
                                <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fontSize="2em" fill={formData.textColor ? formData.textColor : '#181818'}>LOGO</text>
                            )}
                        </svg>
                    </div>
                    <div className="back" ref={cardBackRef}>
                        <svg id="cardBack" xmlns="http://www.w3.org/2000/svg" width="420" height="274" viewBox="0 0 420 274">
                            <rect x={0} y={0} width="100%" height="100%" fill={formData.backgroundColor ? formData.backgroundColor : '#F5F5F5'} />
                            <text x="42" y="66" fontSize="24" fontWeight="700" fill={formData.textColor ? formData.textColor : '#181818'}>
                                {(form && (form.firstname || form.lastname)) ? `${form?.firstname} ${form.lastname ? form.lastname : ''}` : t("forms.design.name")}
                            </text>
                            <text x="42" y="98" fontSize="16" fontWeight="500" fill={formData.textColor ? formData.textColor : '#181818'}>
                                {(form && form.jobTitle) ? form?.jobTitle : t("forms.design.title")}
                            </text>
                            <text x="42" y="200" fontSize="16" fontWeight="500" fill={formData.textColor ? formData.textColor : '#181818'}>
                                {(form && (form.personalPhone || form.workPhone)) ? (form.personalPhone ? form.personalPhone : form.workPhone) : t("forms.design.phone")}
                            </text>
                            <text x="42" y="232" fontSize="16" fontWeight="500" fill={formData.textColor ? formData.textColor : '#181818'}>
                                {(form && form.email) ? form.email : t("forms.design.email")}
                            </text>
                            {link ? (
                                <QRCodeSVG 
                                    bgColor={formData.backgroundColor ? formData.backgroundColor : t("forms.inputs.backgroundColor.placeholder")} 
                                    fgColor={formData.qrColor ? formData.qrColor : t("forms.inputs.qrColor.placeholder")} 
                                    x="314" y="168" xmlns="http://www.w3.org/2000/svg" value={`${process.env.REACT_APP_URL}qr/${link}`} size={64} 
                                />
                            ) : (
                                <svg x="314" y="168" height="64" width="64" viewBox="0 0 25 25" id="svg" xmlns="http://www.w3.org/2000/svg">
                                    <path fill={formData.qrColor} d="M0 0h7v1H0zM8 0h2v1H8zM11 0h5v1H11zM18,0 h7v1H18zM0 1h1v1H0zM6 1h1v1H6zM8 1h2v1H8zM11 1h2v1H11zM14 1h2v1H14zM18 1h1v1H18zM24,1 h1v1H24zM0 2h1v1H0zM2 2h3v1H2zM6 2h1v1H6zM8 2h4v1H8zM15 2h1v1H15zM18 2h1v1H18zM20 2h3v1H20zM24,2 h1v1H24zM0 3h1v1H0zM2 3h3v1H2zM6 3h1v1H6zM8 3h2v1H8zM11 3h2v1H11zM14 3h1v1H14zM18 3h1v1H18zM20 3h3v1H20zM24,3 h1v1H24zM0 4h1v1H0zM2 4h3v1H2zM6 4h1v1H6zM8 4h1v1H8zM10 4h2v1H10zM15 4h2v1H15zM18 4h1v1H18zM20 4h3v1H20zM24,4 h1v1H24zM0 5h1v1H0zM6 5h1v1H6zM15 5h1v1H15zM18 5h1v1H18zM24,5 h1v1H24zM0 6h7v1H0zM8 6h1v1H8zM10 6h1v1H10zM12 6h1v1H12zM14 6h1v1H14zM16 6h1v1H16zM18,6 h7v1H18zM8 7h1v1H8zM13 7h1v1H13zM1 8h2v1H1zM4 8h1v1H4zM6 8h2v1H6zM9 8h1v1H9zM13 8h1v1H13zM18 8h1v1H18zM20,8 h5v1H20zM0 9h1v1H0zM3 9h2v1H3zM9 9h5v1H9zM16 9h1v1H16zM18 9h1v1H18zM24,9 h1v1H24zM1 10h1v1H1zM3 10h1v1H3zM6 10h1v1H6zM8 10h1v1H8zM10 10h1v1H10zM13 10h1v1H13zM18 10h3v1H18zM22,10 h3v1H22zM0 11h1v1H0zM2 11h1v1H2zM4 11h1v1H4zM11 11h9v1H11zM23 11h1v1H23zM0 12h2v1H0zM4 12h1v1H4zM6 12h2v1H6zM9 12h2v1H9zM12 12h1v1H12zM14 12h1v1H14zM16 12h1v1H16zM18 12h2v1H18zM21 12h1v1H21zM23,12 h2v1H23zM7 13h2v1H7zM11 13h2v1H11zM16 13h3v1H16zM21 13h1v1H21zM24,13 h1v1H24zM0 14h1v1H0zM2 14h1v1H2zM4 14h1v1H4zM6 14h1v1H6zM11 14h1v1H11zM14 14h1v1H14zM16 14h2v1H16zM19 14h1v1H19zM22,14 h3v1H22zM1 15h1v1H1zM3 15h1v1H3zM11 15h3v1H11zM15 15h2v1H15zM20 15h1v1H20zM23 15h1v1H23zM0 16h1v1H0zM2 16h1v1H2zM4 16h6v1H4zM12 16h1v1H12zM16 16h6v1H16zM8 17h2v1H8zM12 17h1v1H12zM15 17h2v1H15zM20 17h2v1H20zM23,17 h2v1H23zM0 18h7v1H0zM8 18h1v1H8zM10 18h1v1H10zM13 18h1v1H13zM15 18h2v1H15zM18 18h1v1H18zM20 18h2v1H20zM23,18 h2v1H23zM0 19h1v1H0zM6 19h1v1H6zM10 19h1v1H10zM16 19h1v1H16zM20 19h2v1H20zM23 19h1v1H23zM0 20h1v1H0zM2 20h3v1H2zM6 20h1v1H6zM8 20h1v1H8zM10 20h3v1H10zM16 20h6v1H16zM23,20 h2v1H23zM0 21h1v1H0zM2 21h3v1H2zM6 21h1v1H6zM10 21h1v1H10zM12 21h3v1H12zM16 21h1v1H16zM19 21h4v1H19zM0 22h1v1H0zM2 22h3v1H2zM6 22h1v1H6zM8 22h4v1H8zM15 22h1v1H15zM20 22h1v1H20zM24,22 h1v1H24zM0 23h1v1H0zM6 23h1v1H6zM8 23h1v1H8zM10 23h1v1H10zM12 23h1v1H12zM15 23h3v1H15zM20 23h2v1H20zM23 23h1v1H23zM0 24h7v1H0zM9 24h3v1H9zM13 24h5v1H13zM19 24h1v1H19zM23,24 h2v1H23z" shapeRendering="crispEdges"></path>
                                </svg>
                            )}
                        </svg>
                    </div>
                </div>
                <div className="content">
                    <div className="inputs">
                        <div className="row">
                            <div className="col"><ColorInput label={t("forms.inputs.backgroundColor.label")} placeholder={t("forms.inputs.backgroundColor.placeholder")} name="backgroundColor" value={formData.backgroundColor} onChange={handleChange} /></div>
                            <div className="col"><ColorInput label={t("forms.inputs.textColor.label")} placeholder={t("forms.inputs.textColor.placeholder")} name="textColor" value={formData.textColor} onChange={handleChange} /></div>
                        </div>
                        <div className="row">
                            <div className="col"><ColorInput label={t("forms.inputs.qrColor.label")} placeholder={t("forms.inputs.qrColor.placeholder")} name="qrColor" value={formData.qrColor} onChange={handleChange} /></div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            {formData.logo ? (
                                <div className="logotype">
                                    <img src={formData.logo} alt="logotype" />
                                    <div className="btn48 btn-outline remove-btn" onClick={removeLogo}><i></i> {t("forms.deleteLogo")}</div>
                                </div>
                            ) : (
                                <label className="btn48 upload-btn">
                                    <i></i> {t("forms.uploadLogo")}
                                    <input type="file"  name="img" accept="image/*" onChange={handleFileInput}/>
                                </label>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className="download">
                <div className="col">
                    <div className="select">
                        <label>{t("forms.chooseDesignFormat")}</label>
                        <div className="file-extension-wrapper">
                            <div className={`file-extension ${showExtList ? 'active' : ''}`}  >
                                <div className="current" id="currentExt" data-value={currentExt}  onClick={(e)=>{e.preventDefault(); setShowExtList(!showExtList)}}>
                                    {t(`qrcard.extensions.${currentExt}`)}
                                    <i></i>
                                </div>
                                <div className="options">
                                    {fileExtensions.map((ext, key)=> ext!==currentExt && (
                                        <div className="option" data-value={ext} key={key} onClick={handleExtensionChange}>
                                            <div className="text">
                                                {t(`qrcard.extensions.${ext}`)}
                                                <span className="underline"></span>
                                            </div>
                                        </div>   
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="btn48 download-btn" onClick={downloadCard}><i></i>{t("forms.downloadDesign")}</div>
                </div>
            </div>
        </div>
    )
};

export default CardDesign;