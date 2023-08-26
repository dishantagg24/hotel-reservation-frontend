/** @format */

import React from 'react';
import './loader.css';

export const Loader = () => {
    return (
        <div className={`lds-spinner loader-light`}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    );
};