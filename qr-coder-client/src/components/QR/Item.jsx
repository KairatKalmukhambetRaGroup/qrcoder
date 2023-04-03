import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import VCard from 'vcard-creator'
import FileSaver from "file-saver";

import { getQR } from "../../actions/qr";

const Item = () => {
    const {link} = useParams();
    const dispatch = useDispatch();
    const {qr} = useSelector((state)=>state.qr);

    useEffect(()=>{
        if(link){
            dispatch(getQR(link));
        }
    }, [link]);

    useEffect(()=>{
        if(qr){
            console.log(qr);
            switch (qr.type) {
                case 'vcard':
                    createVcard(qr.object);
                    break;
                default:
                    break;
            }
        }
    }, [qr])

    const createVcard = (object) => {
        const myVCard = new VCard();
        let name = 'vcard';
        if (object.firstname || object.lastname) {
            name = object.firstname + ' ' + object.lastname;
            myVCard.addName(object.firstname, object.lastname);
        }
        if (object.email) 
            myVCard.addEmail(object.email);
        if (object.website) 
            myVCard.addURL(object.website);
        if (object.personalPhone) 
            myVCard.addPhoneNumber(object.personalPhone, 'PREF');
        if (object.workPhone) 
            myVCard.addPhoneNumber(object.workPhone, 'WORK');
        if (object.fax) 
            myVCard.addPhoneNumber(object.fax, 'FAX');
        if (object.company) 
            myVCard.addCompany(object.company);
        if (object.jobTitle) 
            myVCard.addJobtitle(object.jobTitle);
        if (object.country || object.city || object.postIndex) 
            myVCard.addAddress('', '', '', object.city, '', object.postIndex, object.country);

        var file = new Blob(
            [myVCard.toString()],
            { type: "text/vcard;charset=utf-8" }
        );

        const url = window.URL.createObjectURL(file);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute(
            'download',
            `${name}.vcf`,
        );
    
        // Append to html link element page
        document.body.appendChild(link);
    
        // Start download
        link.click();
    
        // Clean up and remove the link
        link.parentNode.removeChild(link);

        // window.opener = null;
        // window.open("", "_self");
        // window.close();
    }

    return (
        <div>
            
        </div>
    )
};

export default Item;