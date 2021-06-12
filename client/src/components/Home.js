import React, {useState,useEffect} from 'react';
import { Modal, ModalHeader, ModalBody, Button} from 'reactstrap';
import {apiGetUser} from '../utils/api';
import VerifyEmail from './Authentication/VerifyEmail';
import colors from '../utils/design';

function Home() {
    const [modal,setModal] = useState(false);
    
    useEffect(async () => {
        try{
            const user = await apiGetUser(sessionStorage.getItem('id'));
            if (!user.data.isVerified) {
                setModal(true);
            }
        } catch (err){
          console.log(err);
        }  
    }, []);

    const closeBtn = <Button size="sm" onClick={()=> {setModal(false);}} style={{color:colors.roseDust,backgroundColor:"white",borderColor:"white",outline:'none'}}><strong style={{fontSize:'20px'}}>&times;</strong></Button>;
    return (
        <div style={{display:'flex',alignItems:'center',justifyContent:'center',marginTop:'65px',flexDirection:'row'}}>
            <div style={{width:'200px'}}/>
            <h4>Dashboard</h4>
            <Modal isOpen={modal} toggle={()=> {setModal(false);}} style={{marginTop:'65px',width:'30vw'}}>
                <ModalHeader toggle={()=> {setModal(false);}} close={closeBtn}>Please Verify Your Email</ModalHeader>
                    <ModalBody style={{display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column'}}>
                        <VerifyEmail height={'modal'}/>
                    </ModalBody>
            </Modal>
        </div>
)}

export default Home;