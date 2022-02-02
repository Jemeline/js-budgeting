import React, {useState,useEffect} from 'react';

function Sidebar({component}) {
    
    useEffect(async () => {
        
    }, []);

    return (
        <>
            <div className='display-above-lg'>
                <div class="container-fluid">
                    <div class="row flex-nowrap">
                        <div class="col-lg-1 col-xl-2 col-xxl-2 col-xxxl-2" style={{backgroundColor: "rgba(53,55,64,0.3)"}}>
                            <div class="d-flex flex-column align-items-center align-items-sm-start min-vh-100">
                                <div class="dropdown pb-4">
                                    <a class="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                                        {/* <img src="https://github.com/mdo.png" alt="hugenerd" width="30" height="30" class="rounded-circle"/> */}
                                        <span class="d-none d-sm-inline mx-1">user</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div class="col mx-4">
                            {component}
                        </div>
                    </div>
                </div>
            </div>
            <div className='display-below-lg'>
                <div class="container-fluid">
                    <div class="row flex-nowrap">
                        <div class="col-12 px-4" style={{height: "calc(100vh - 60px)",}}>
                            {component}
                        </div>
                    </div>
                    <div class="row flex-nowrap">
                        <div class="col-12" style={{height: "calc(60px)", backgroundColor: "rgba(53,55,64,0.3)"}}>
                            
                        </div>
                    </div>
                </div>
            </div>
        </>
        
    )
};

export default Sidebar;