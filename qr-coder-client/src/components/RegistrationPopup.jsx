import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import '../styles/registrationPopup.scss';

const RegistrationPopup = ({show, setShow}) => {
    const {t} = useTranslation();
    if(!show)
        return ;
    return (
        <div className="overlay">
            <div className="overlayContent" id="registrationPopup">
                <div className="close" onClick={(e)=>{e.preventDefault(); setShow(false)}}><i></i></div>
                <div className="text">
                    <div className="heading">
                       {t("popup.registration.heading")}
                    </div>
                    <div className="description">
                       {t("popup.registration.description")}
                    </div>
                </div>
                <div className="buttons">
                    <Link to="/signup" className="btn48 w-100">
                        {t("popup.registration.signup")}
                    </Link>
                    {/* <div className="or-line">
                        <span></span>
                        {t("popup.registration.or")}
                        <span></span>
                    </div>
                    <div className="btn48 btn-outline google-login w-100">
                        <i></i>
                        {t("popup.registration.with_google")}
                    </div> */}
                </div>
                <Link to="/login" className="has-account">
                    {t("popup.registration.has_account")}
                </Link>
            </div>
        </div>
    )
};

export default RegistrationPopup;