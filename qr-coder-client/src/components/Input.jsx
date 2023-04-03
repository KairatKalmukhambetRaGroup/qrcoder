import React, { useEffect, useState } from "react";
import countryCodesJSON from '../assets/CountryCodes.json';
import '../styles/inputs.scss';

export const TextInput = ({label='', name='', placeholder='', value='', onChange, isRequred=false}) => {
    const handleChange = (e) => {
        e.preventDefault();
        const value = e.currentTarget.value;
        const name = e.currentTarget.name;
        onChange(name, value);
    }
    return (
        <div className={`input ${value ? 'filled' : ''}`}>
            <label>{label}</label>
            <input type="text" name={name} placeholder={placeholder} value={value} onChange={handleChange} required={isRequred} autoComplete="false"/>
        </div>
    );
}

export const EmailInput = ({label='', name='', placeholder='', value='', onChange, isRequred=false, disabled=false}) => {
    const handleChange = (e) => {
        e.preventDefault();
        const value = e.currentTarget.value;
        const name = e.currentTarget.name;
        onChange(name, value);
    }
    return (
        <div className={`input ${value ? 'filled' : ''}`}>
            <label>{label}</label>
            <input type="email" name={name} placeholder={placeholder} value={value} onChange={handleChange} required={isRequred} disabled={disabled}/>
        </div>
    );
}

export const PasswordInput = ({label='', name='', placeholder='', value='', onChange, isRequred=false}) => {
    const [show, setShow] = useState(true);
    const handleChange = (e) => {
        e.preventDefault();
        const value = e.currentTarget.value;
        const name = e.currentTarget.name;
        onChange(name, value);
    }
    const handleShow = (e) => {
        e.preventDefault();
        setShow(!show)
    }
    return (
        <div className={`input password ${value ? 'filled' : ''}`}>
            <label>{label}</label>
            <div className="password-input">
                <input type={show ? "password" : "text"} name={name} placeholder={placeholder} value={value} onChange={handleChange} required={isRequred} autoComplete="false" />
                <i className={show ? "" : "show"} onClick={handleShow}></i>
            </div>
        </div>
    );
}

export const WebsiteInput = ({label='', name='', placeholder='', value='', onChange, isRequred=false}) => {
    const handleChange = (e) => {
        e.preventDefault();
        const value = e.currentTarget.value;
        const name = e.currentTarget.name;
        onChange(name, value);
    }
    return (
        <div className={`input ${value ? 'filled' : ''}`}>
            <label>{label}</label>
            <input type="url" name={name} placeholder={placeholder} value={value} onChange={handleChange} required={isRequred}/>
        </div>
    );
}

export const PhoneInput = ({label='', name='', value='', onChange, isRequred=false}) => {
    const countryCodes = JSON.parse(JSON.stringify(countryCodesJSON));
    const [codeKey, setCodeKey] = useState(0);
    const [currentVlaue, setCurrentValue] = useState('');
    const [showCountryCodes, setShowCountryCodes] = useState(false);
    const [codeSearchValue, setCodeSearchValue] = useState('');


    useEffect(()=>{
        if(value){
            let val = value;
            if(val[0] !== '+'){
                val[1] = parseInt(val[1], 10);
            }
            let l = 0;
            let last = 0;
            for (const key in countryCodes) {
                if (Object.hasOwnProperty.call(countryCodes, key)) {
                    const countryCode = countryCodes[key];
                    if(val.includes(countryCode.dial_code) && countryCode.dial_code.length > l){
                        l = countryCode.dial_code.length;
                        console.log(countryCode.dial_code, l)
                        last = key;
                    }
                }
            }
            if(l !== 0){
                setCodeKey(last);
                val = val.replace(countryCodes[last].dial_code, '');
                setCurrentValue(val);
            }
        }
    }, [value]);

    const handleChange = (e) => {
        e.preventDefault();
        const value = e.currentTarget.value;
        const name = e.currentTarget.name;
        if(value.length == 0 || /^(?=.*\d)[\d ]+$/.test(value)){
            setCurrentValue(value);
            const code = countryCodes[codeKey].dial_code;
            onChange(name, code + value); 
        }
    }
    const handleCountryCodeChange = (e) => {    
        e.preventDefault();
        const key = e.currentTarget.dataset.value;
        setCodeSearchValue('');
        setCodeKey(key);
        setShowCountryCodes(false);
    }
    const handleCodeSearch = (e) =>{
        e.preventDefault();
        const value = e.currentTarget.value;
        setCodeSearchValue(value);
        setShowCountryCodes(true);
    }
    useEffect(()=>{
        if(codeSearchValue && codeSearchValue.length > 0){
            let matches = 0;
            let contains = 0;
            let last = codeKey;
            for (const key in countryCodes) {
                if (Object.hasOwnProperty.call(countryCodes, key)) {
                    const countryCode = countryCodes[key];
                    if(countryCode.dial_code.includes(codeSearchValue))
                        contains++;
                    if(countryCode.dial_code === codeSearchValue){
                        matches++;
                        last = key;
                    }
                }
            }
            if(matches === 1){
                setCodeKey(last);
                if(contains===1){
                    setShowCountryCodes(false)
                    // setCodeSearchValue('');
                }
            }
        }
    }, [codeSearchValue])


    

    return (
        <div className={`input phone-input ${value ? 'filled' : ''}`}>
            <label>{label}</label>
            <div className="phone-inputs">
                <div className="phone">
                    <div className={`countryCode ${showCountryCodes ? 'active' : ''}`}  >
                        <div className="current">
                            <span className="code"  onClick={(e)=>{e.preventDefault(); setShowCountryCodes(!showCountryCodes)}}>{countryCodes[codeKey].code} <i></i></span> 
                            <input type="text" className="dial-code" maxLength={4} placeholder={countryCodes[codeKey].dial_code} value={codeSearchValue} onChange={handleCodeSearch} />                        
                        </div>
                        <div className="options">
                            {countryCodes.map((countryCode, key)=>
                                countryCode.dial_code.includes(codeSearchValue) && (
                                    <div className="option" data-value={key} key={key} onClick={handleCountryCodeChange}>
                                        <span className="code">{countryCode.code}</span> 
                                        <span className="dial-code">{countryCode.dial_code}</span>
                                    </div>
                                )
                            )}
                        </div>
                    </div>
                </div>
                <input type="text" maxLength={15} name={name} value={currentVlaue} onChange={handleChange} required={isRequred} placeholder="xxx xxx xxxx"/>
            </div>
        </div>
    );
}

export const ColorInput = ({label='', name='', placeholder='', value='', onChange, isRequred=false}) => {
    const handleChange = (e) => {
        e.preventDefault();
        const value = e.currentTarget.value;
        const name = e.currentTarget.name;
        onChange(name, value);
    }
    const pickTextColorBasedOnBgColorAdvanced = (bgColor) => {
        var color = (bgColor.charAt(0) === '#') ? bgColor.substring(1, 7) : bgColor;
        var r = parseInt(color.substring(0, 2), 16); // hexToR
        var g = parseInt(color.substring(2, 4), 16); // hexToG
        var b = parseInt(color.substring(4, 6), 16); // hexToB
        var uicolors = [r / 255, g / 255, b / 255];
        var c = uicolors.map((col) => {
          if (col <= 0.03928) {
            return col / 12.92;
          }
          return Math.pow((col + 0.055) / 1.055, 2.4);
        });
        var L = (0.2126 * c[0]) + (0.7152 * c[1]) + (0.0722 * c[2]);
        return (L > 0.179) ? "black" : "white";
    }

    return (
        <div className={`input ${value ? 'filled' : ''}`}>
            <label>{label}</label>
            <div className="color-input">
                <input type="text" className="hex" name={name} placeholder={placeholder} value={value} onChange={handleChange} required={isRequred} autoComplete="false"/>
                <label className="color" style={{backgroundColor: value ? value : placeholder}}>
                    <i className={pickTextColorBasedOnBgColorAdvanced(value ? value : placeholder)}></i>
                    <input type="color" name={name} value={value ? value : placeholder} onChange={handleChange} />
                </label>
            </div>
        </div>
    );
}

export const Switch = ({name='', label='', value=false, onChange}) => {
    const handleChange = (e) => {
        const value = e.currentTarget.checked;
        onChange(name, value);
    }
    return (
        <div className="switch-input">
            <label className="switch">
                <input type="checkbox" checked={value} onChange={handleChange}/>
                <span className="slider"></span>
            </label>
            {label}
        </div>
    )
}