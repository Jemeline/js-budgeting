import React, {useState,useEffect} from 'react';

function Sidebar({component}) {
    
    useEffect(async () => {
        
    }, []);

    return (
        <div class="container-fluid">
            <div class="row flex-nowrap">
                <div class="col-xs-2 col-sm-2 col-md-2 col-lg-2 col-xl-2 col-xxl-2 col-xxxl-2" style={{backgroundColor : "rgba(53,55,64,0.3)"}}>
                    <div class="d-flex flex-column align-items-center align-items-sm-start min-vh-100">
                        <div class="dropdown pb-4">
                            <a class="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                                {/* <img src="https://github.com/mdo.png" alt="hugenerd" width="30" height="30" class="rounded-circle"/> */}
                                <span class="d-none d-sm-inline mx-1">user</span>
                            </a>
                        </div>
                    </div>
                </div>
                <div class="col py-3">
                    {component}
                </div>
            </div>
        </div>
)};

export default Sidebar;