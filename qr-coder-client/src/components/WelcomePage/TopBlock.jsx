import React from "react";
import { useTranslation } from "react-i18next";


const TopBlock = () => {
    const { t } = useTranslation();
    return (
        <div className="top-block">
            <div className="imgs">
                <div className="left"><i></i></div>
                <div className="right"><i></i></div>
            </div>
            <div className="container">
                <div className="content">
                    <div className="text">
                        <div className="heading">{t('welcome.top.heading')}</div>
                        <div className="body">{t('welcome.top.body')}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TopBlock;