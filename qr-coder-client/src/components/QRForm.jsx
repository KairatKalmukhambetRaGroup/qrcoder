import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import '../styles/qrform.scss';
import CardDesign from "./Forms/CardDesign";
import VCardForm from "./Forms/VCardForm";
import RegistrationPopup from "./RegistrationPopup";

const QRForm = ({qr=null, authorized=false, name=''}) => {
    const {t} = useTranslation();
    const [activeTab, setActiveTab] = useState('vcard');
    const [status, setStatus] = useState('');
    const [showPopup, setShowPopover] = useState(false);

    const changeTab = (e) => {
        e.preventDefault();
        setActiveTab(e.currentTarget.dataset.tab);
    }

    useEffect(()=> async ()=>{
        if(status === 'success' && !authorized){
            setShowPopover(true);
        }
    }, [status]);


    const [formData, setFormData] = useState(null);
    const [dataLink, setDataLink] = useState('');

    return (
        <div id="qrform">
            <RegistrationPopup show={showPopup} setShow={setShowPopover} />
            <div className="top">
                <div className="nav-tabs">
                    <div className={`tab-item ${activeTab==='vcard' ? 'active' : ''}`} onClick={changeTab} data-tab="vcard" >{t("forms.tabs.content")}</div>
                    <div className={`tab-item ${activeTab==='design' ? 'active' : ''}`} onClick={changeTab} data-tab="design" >{t("forms.tabs.design")}</div>
                </div>
                {status && (
                    <div className={`popover status-${status}`}>
                        <div className="icon">
                            {status === 'loading' ? (<div className="loading"><i></i></div>) : (<i></i>)}
                        </div>
                        {t(`qrsavestatus.${status}`)}
                    </div>
                )}
            </div>
            <div className="tab-content">
                {activeTab==='vcard' && (<VCardForm setForm={setFormData} setDataLink={setDataLink} authorized={authorized} setStatus={setStatus} qr={qr} name={name}/>)}
                {activeTab==='design' && (<CardDesign form={formData} link={dataLink} />)}
            </div>
        </div>
    );
};

export default QRForm;