import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Switch } from "../Input";

const Settings = () => {
    const [isOn, setIsOn] = useState(true);
    const {t} = useTranslation();
    
    const handleSwitchChange = (name, value) => {
        setIsOn(value);
    }

    return (
        <div id="settings">
            <div className="heading">{t("profile.settings.heading")}</div>
            <Switch value={isOn} name="switcher" label={t("profile.settings.label")} onChange={handleSwitchChange} />
        </div>
    )
}
export default Settings;