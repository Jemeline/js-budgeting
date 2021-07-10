import React, {useState,useEffect} from 'react';
import { Modal, ModalHeader, ModalBody, Button} from 'reactstrap';
import {apiGetUser,apiGetBudgetByUser} from '../utils/api';
import VerifyEmail from './Authentication/VerifyEmail';
import CategoryTable from './Dashboard/CategoryTable'
import UpdateBudget from './Dashboard/UpdateBudget';
import colors from '../utils/design';

function Home() {
    const [modal,setModal] = useState(false);
    const [budgetData, setBudgetData] = useState({});
    const id = sessionStorage.getItem('id');
    
    useEffect(async () => {
        try{
            const user = await apiGetUser(id);
            if (!user.data.isVerified) {
                setModal(true);
            }
            const budget = await apiGetBudgetByUser(id);
            setBudgetData(budget);
        } catch (err){
            console.log(err);
        }  
    }, []);

    const closeBtn = <Button size="sm" onClick={()=> {setModal(false);}} style={{color:colors.roseDust,backgroundColor:"white",borderColor:"white",outline:'none'}}><strong style={{fontSize:'20px'}}>&times;</strong></Button>;
    return (
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-around',flexDirection:'row',height:'calc(100vh-60px)'}}>
            <CategoryTable budget={budgetData} interval={'M'} index={0} categories={5}/>
            <UpdateBudget/>
            <Modal isOpen={modal} toggle={()=> {setModal(false);}} style={{marginTop:'65px',width:'30vw'}}>
                <ModalHeader toggle={()=> {setModal(false);}} close={closeBtn}>Please Verify Your Email</ModalHeader>
                    <ModalBody style={{display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column'}}>
                        <VerifyEmail height={'modal'}/>
                    </ModalBody>
            </Modal>
        </div>
)}

export default Home;