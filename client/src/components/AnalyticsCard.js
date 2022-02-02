import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


function AnalyticsCard({icon, value, text, color}) {
    
    useEffect(async () => {
        
    }, []);

    return (
        <>
            <div class="display-above-md" style={{width: "100%", height:"100%"}}>
                <div class="container-fluid rounded-3" style={{backgroundColor : "rgba(53,55,72,0.7)", width: "100%", height: "100%"}}>
                    <div class="d-flex flex-row align-items-center justify-content-center w-100 h-100">
                        <div class="d-flex flex-column align-items-center justify-content-center h-100 px-3" style={{width: "auto"}}>
                            <FontAwesomeIcon icon={icon} color={color || "#4fffb0"} size="3x" />
                        </div>
                        <div class="d-flex flex-column align-items-center justify-content-center px-3">
                            <span style={{color:"#BFB9C5", fontWeight: 500, height: 15}}>{text}</span>
                            <span style={{fontSize: "45px", color: color || "#4fffb0"}}>{value}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="display-below-md" style={{width: "100%", height:"100%"}}>
                <div class="container-fluid rounded-3" style={{backgroundColor : "rgba(53,55,72,0.7)", width: "100%", height: "100%"}}>
                    <div class="d-flex flex-column align-items-center justify-content-start w-100 h-100">
                        <div class="d-flex flex-column align-items-center justify-content-center h-75 py-2" style={{width: "50%"}}>
                            <FontAwesomeIcon icon={icon} color={color || "#4fffb0"} size="3x" />
                        </div>
                        <div class="d-flex flex-column align-items-center justify-content-center py-2">
                            <span style={{color:"#BFB9C5", fontWeight: 500}}>{text}</span>
                            <span style={{fontSize: "7.5vw", color: color || "#4fffb0"}}>{value}</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};

export default AnalyticsCard;