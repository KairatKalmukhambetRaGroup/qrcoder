import React from "react";
import { useTranslation } from "react-i18next";
import '../styles/notfound.scss';

const NotFound = () => {
    const {t} = useTranslation();
    return (
        <div className="container">
            <div id="notFound">
                <div className="content">
                    <i></i>
                    <div className="info">
                        <div className="text">
                            <div className="title">{t("notFound.title")}</div>
                            <div className="description">{t("notFound.description")}</div>
                        </div>
                        <div className="btn48">{t("notFound.button")}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default NotFound;