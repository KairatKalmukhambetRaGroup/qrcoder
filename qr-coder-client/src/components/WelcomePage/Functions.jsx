import React from "react";
import { useTranslation } from "react-i18next";

const Functions = () => {
    const { t } = useTranslation();
    const cards = t('welcome.functions.cards', {returnObjects: true});
    return (
        <div className="functions">
            <div className="container">
                <div className="content">
                    <div className="heading">{t('welcome.functions.heading')}</div>
                    <div className="cards">
                        {cards.map((card, key)=>(
                            <div className="card" key={key} >
                                <div className="card-icon"><i className={`${card.icon}`}></i></div>
                                <div className="card-body">
                                    <div className="title">{card.title}</div>
                                    <div className="description">{card.description}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <a href="#freeQR" className="btn56 w-100">{t('welcome.functions.createbtn')}</a>
                </div>
            </div>
        </div>
    );
};

export default Functions;