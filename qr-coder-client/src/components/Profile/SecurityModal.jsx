import React from "react";
import { useTranslation } from "react-i18next";

const LoadingModal = () => {
    return (
        <div className="security_modal">
            <div className="loading">
                <i></i>
            </div>
        </div>
    );
}
const Modal = ({type, status}) => {
    const {t} = useTranslation();
    return (
        <div className="security_modal ">
            <div className={`icon ${status === 'success' ? 'success' : 'error'}`}>
                <i></i>
            </div>
            <div className="text">
                {t(`profile.security.modal.${type}.${status}`)}
            </div>
        </div>
    );
};

const SecurityModal = ({modal=''}) => {
    return modal && (
        <div className="modal_wrapper">
            {modal === 'loading' && (
                <LoadingModal />
            )}
            {modal === 'successPass' && (
                <Modal type="password" status="success" />
            )}
            {modal === 'invalidPass' && (
                <Modal type="password" status="invalid" />
            )}
            {modal === 'userPass' && (
                <Modal type="password" status="user" />
            )}
            {modal === 'successEmail' && (
                <Modal type="email" status="success" />
            )}
            {modal === 'userEmail' && (
                <Modal type="email" status="user" />
            )}
            {modal === 'error' && (
                <Modal type="global" status="error" />
            )}
        </div>
    );
}

export default SecurityModal;