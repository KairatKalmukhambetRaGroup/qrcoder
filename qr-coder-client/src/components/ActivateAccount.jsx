import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { activateAccount } from "../actions/user";
import '../styles/activateAccount.scss';
const ActivateAccount = () => {
    const {t} = useTranslation();
    const {link} = useParams();
    const dispatch = useDispatch();
    
    const {activationStatus} = useSelector((state)=>state.users);
    useEffect(()=>{
        if(link) {
            dispatch(activateAccount(link));
        }
    }, [link]);

    return (
        <div id="activateAccount">
            <div className="content">
                {!activationStatus && (
                    <div className="loading"><i></i></div>
                )}
                {(activationStatus && activationStatus===200) && (
                    <>
                        <i className="success"></i>
                        <div className="text">{t("activateAccount.success")}</div>
                    </>
                )}
            </div>
        </div>
    )
};
export default ActivateAccount;