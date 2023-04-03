import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createQR, getQRLink } from "../../actions/qr";
import {EmailInput, PhoneInput, TextInput, WebsiteInput} from '../Input';
import QRCard from "../QRCard";
import { useTranslation } from "react-i18next";

import '../../styles/forms.scss';
import { CLEAR_QR_STATUSES } from "../../constants/actionTypes";

const initContentFormData = {name: '', firstname: '', lastname: '', email: '', website: '', personalPhone: '', workPhone: '', fax: '', company: '', jobTitle: '', country: '', city: '', postIndex: ''};
const delay = ms => new Promise(res => setTimeout(res, ms));

const VCardForm = ({qr=null, setStatus, authorized=false, name='', setForm, setDataLink}) => {
    const {t} = useTranslation();
    const dispatch = useDispatch();


    const [formData, setFormData] = useState(initContentFormData);
    const [showMore, setShowMore] = useState(false);

    const {qrCreateStatus, qr: resData, qrInitStatus} = useSelector((state)=>state.qr);
    const [localQR, setLocalQR] = useState(JSON.parse(localStorage.getItem('qr')));
    const [link, setLink] = useState('');

    useEffect(()=>{
        if(name){
            console.log(name);
            setFormData({...formData, name});
        }
    }, [name])

    useEffect(()=>{
        if(!authorized){
            if(!localQR){
                dispatch(getQRLink('vcard'));
            }
        }else{
            if(qr){
                setLocalQR(qr);
            }else{
                dispatch(getQRLink('vcard'));
            }
        }
    },[authorized]);
    useEffect(()=>{
        if(localQR){
            setFormData(localQR.object ? {...localQR.object, name} : {...initContentFormData, name});
            
            setLink(localQR.link);
        }else{
            dispatch(getQRLink('vcard'));
        }
    }, [localQR])
    useEffect(()=>{
        if(qrInitStatus && qrInitStatus === 200 && (!authorized || !qr)){
            setLocalQR(JSON.parse(localStorage.getItem('qr')));
        }
    },[qrInitStatus])

    useEffect(()=>{
        if(qrCreateStatus === 200 && resData){
            dispatch({type:CLEAR_QR_STATUSES});
            setStatus('success');
            if(!authorized || qr)
                setLocalQR(resData);
            else
                setLocalQR(null)
            if(authorized){
                localStorage.removeItem('qr');
            }else{
                localStorage.setItem('qr', JSON.stringify(resData));
            }
        }
    }, [qrCreateStatus])

    const handleSubmit = (e) => {
        e.preventDefault();
        setStatus('loading');
        dispatch(createQR(localQR._id, 'vcard', formData))

    }
    const handleChange = (name, newValue) => {
        setFormData({...formData, [name]: newValue});
    } 
    const clear = () => {
        if(authorized)
            setFormData({...qr.object, name})
        else
            setFormData(initContentFormData)
    }


    useEffect(()=>{
        setForm(formData);
    }, [formData])

    useEffect(()=>{
        setDataLink(link);
    }, [link])

    return (
        <div id="vcardform">
            <form onSubmit={handleSubmit}>
                <div className="info">
                    {authorized && (
                        <TextInput name="name" label={t("forms.inputs.name.label")} placeholder={t("forms.inputs.name.placeholder")} value={formData.name} onChange={handleChange} isRequred={true} />
                    )}
                    <div className="inputs">
                        <div className="row">
                            <div className="col"><TextInput name="firstname" label={t("forms.inputs.firstname.label")} placeholder={t("forms.inputs.firstname.placeholder")} value={formData.firstname} onChange={handleChange}/></div>
                            <div className="col"><TextInput name="lastname" label={t("forms.inputs.lastname.label")} placeholder={t("forms.inputs.lastname.placeholder")} value={formData.lastname} onChange={handleChange}/></div>
                        </div>
                        <div className="row">
                            <div className="col"><EmailInput name="email" label={t("forms.inputs.email.label")} placeholder={t("forms.inputs.email.placeholder")} value={formData.email} onChange={handleChange}/></div>
                            <div className="col"><WebsiteInput name="website" label={t("forms.inputs.website.label")} placeholder={t("forms.inputs.website.placeholder")} value={formData.website} onChange={handleChange}/></div>
                        </div>
                        <div className="row">
                            <div className="col"><PhoneInput name="personalPhone" label={t("forms.inputs.personalPhone.label")} value={formData.personalPhone} onChange={handleChange}/></div>
                            <div className="col"><PhoneInput name="workPhone" label={t("forms.inputs.workPhone.label")} value={formData.workPhone} onChange={handleChange}/></div>
                        </div>
                    </div>
                    <div className={`more ${showMore ? 'active' : ''}`} onClick={(e)=>{e.preventDefault(); setShowMore(!showMore)}}>{showMore ? t("forms.showLess") : t("forms.showMore")}<i></i></div>
                    <div className={`inputs ${showMore ? '' : 'hidden'}`}>
                        <div className="row">
                            <div className="col"><PhoneInput name="fax" label={t("forms.inputs.firstname.label")} value={formData.fax} onChange={handleChange}/></div>
                        </div>
                        <div className="row">
                            <div className="col"><TextInput name="company" label={t("forms.inputs.company.label")} placeholder={t("forms.inputs.company.placeholder")} value={formData.company} onChange={handleChange}/></div>
                            <div className="col"><TextInput name="jobTitle" label={t("forms.inputs.jobTitle.label")} placeholder={t("forms.inputs.jobTitle.placeholder")} value={formData.jobTitle} onChange={handleChange}/></div>
                        </div>
                        <div className="row">
                            <div className="col"><TextInput name="country" label={t("forms.inputs.country.label")} placeholder={t("forms.inputs.country.placeholder")} value={formData.country} onChange={handleChange}/></div>
                            <div className="col"><TextInput name="city" label={t("forms.inputs.city.label")} placeholder={t("forms.inputs.city.placeholder")} value={formData.city} onChange={handleChange}/></div>
                        </div>
                        <div className="row">
                            <div className="col"><TextInput name="postIndex" label={t("forms.inputs.postIndex.label")} placeholder={t("forms.inputs.postIndex.placeholder")} value={formData.postIndex} onChange={handleChange}/></div>
                        </div>
                    </div>
                    <div className="buttons">
                        <input type="submit" className="btn48" value={t("forms.save")} />
                        <div className="btn48 btn-outline" onClick={(e)=>{e.preventDefault(); clear()}}>{t("forms.reset")}</div>
                    </div>
                </div>
                <QRCard qrValue={`${process.env.REACT_APP_URL}qr/${link}`} />
            </form>
        </div>
    );
}

export default VCardForm;