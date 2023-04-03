import React, { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import '../../styles/profile.scss';

const Profile = () => {
    const {t} = useTranslation();
    const location = useLocation();
    const [currentTab, setCurrentTab] = useState('profile');
    useEffect(()=>{
        const paths = location.pathname.split('/');
        setCurrentTab(paths[paths.length - 1]);
    }, [location])
    return (
        <div id="profile">
            <div className="container">
                <div className="content">
                    <div className="heading">{t("profile.heading")}</div>
                    <div className="innercontent">
                        <div className="nav-tabs">
                            <Link className={`tab-item ${currentTab==='profile' ? 'active' : ''}`} to='/profile'>{t("profile.tabs.settings")}</Link>
                            <Link className={`tab-item ${currentTab==='security' ? 'active' : ''}`} to='/profile/security'>{t("profile.tabs.security")}</Link>
                        </div>
                        <div className="tab-content">
                            <Outlet />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;