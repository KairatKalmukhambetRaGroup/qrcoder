import React from "react";

import '../../styles/welcomepage.scss';
import FreeQR from "./FreeQR";

import Functions from "./Functions";
import TopBlock from "./TopBlock";

const WelcomePage = () => {
    return (
        <div id="welcomepage">
            <TopBlock/>
            <Functions/>
            <FreeQR/>
        </div>
    );
};

export default WelcomePage;