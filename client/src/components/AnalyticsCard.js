import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


function AnalyticsCard({icon, value, text, color}) {
    
    useEffect(async () => {
        
    }, []);

    return (
        <div class="container-fluid rounded-3 display-above-md" style={{backgroundColor : "#171821", width: "100%", height: "250px"}}>
            <div class="d-flex flex-column align-items-center justify-content-center w-100 h-100">
                <div class="d-flex flex-column align-items-center justify-content-center" style={{height:50}}>
                    <FontAwesomeIcon icon={icon} color={color || "#4fffb0"} size="2x" />
                </div>
                <div class="d-flex flex-column align-items-center justify-content-center" style={{fontSize: "55px",height:100, color: color || "#4fffb0"}}>{value}</div>
                <div class="d-flex flex-column align-items-center justify-content-center" style={{height:50, color:"#7D8995", fontWeight: 500}}>{text}</div>
            </div>
        </div>
)};

export default AnalyticsCard;