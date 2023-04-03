import React from "react";
import '../styles/footer.scss';
import { useTranslation } from "react-i18next";

const Footer = () => {
    const {t} = useTranslation();
    return (
        <div id="footer">
            <div className="container">
                <div className="content">
                    <div className="logo">QR Coder</div>
                    <a href="https://ragroup.org" className="btn48" target="_blank">© RA Group Ltd.</a>
                    <div className="icons">
                        <a href="https://wa.me/+77003002132" target="_blank" className="icon whatsapp"><i></i></a>
                        <a href="mailto:info@ragroup.org" target="_blank" className="icon mail"><i></i></a>
                        <div className="btn48">{t('footer.help')}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Footer;