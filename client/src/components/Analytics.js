import React, {useState,useEffect} from 'react';
import { Modal, ModalHeader, ModalBody, Button} from 'reactstrap';
import {apiGetUser,apiGetBudgetByUser} from '../utils/api';
import VerifyEmail from './Authentication/VerifyEmail';
import CategoryTable from './Dashboard/CategoryTable';
import Total from './Dashboard/Total';

function Analytics() {
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

    const closeBtn = <Button size="sm" onClick={()=> {setModal(false);}} style={{backgroundColor:"white",borderColor:"white",outline:'none'}}><strong style={{fontSize:'20px'}}>&times;</strong></Button>;
    return (
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-around',flexDirection:'row',height:'calc(100vh-60px)'}}>
            <div>
                <div style={{display:'flex',alignItems:'center',justifyContent:'space-around',flexDirection:'row'}}>       
                    <Total budget={budgetData} interval={'M'} index = {3} type={'expense'}/>
                    <Total budget={budgetData} interval={'M'} index = {3} type={'saving'}/>   
                </div>
                <div style={{height:'2.5vh'}}/>
                <CategoryTable budget={budgetData} categories={10} index={3} type={'expense'}/>
            </div>
            <div>
                <div style={{display:'flex',alignItems:'center',justifyContent:'space-around',flexDirection:'row'}}>        
                    <Total budget={budgetData} interval={'M'} index = {2} type={'expense'}/>
                    <Total budget={budgetData} interval={'M'} index = {2} type={'saving'}/>   
                </div>
                <div style={{height:'2.5vh'}}/>
                <CategoryTable budget={budgetData} categories={10} index={2} type={'expense'}/>
            </div>
            <div>
                <div style={{display:'flex',alignItems:'center',justifyContent:'space-around',flexDirection:'row'}}>      
                    <Total budget={budgetData} interval={'M'} index = {1} type={'expense'}/>
                    <Total budget={budgetData} interval={'M'} index = {1} type={'saving'}/>   
                </div>
                <div style={{height:'2.5vh'}}/>
                <CategoryTable budget={budgetData} categories={10} index={1} type={'expense'}/>
            </div>
            <div>
                <div style={{display:'flex',alignItems:'center',justifyContent:'space-around',flexDirection:'row'}}>        
                    <Total budget={budgetData} interval={'M'} index = {0} type={'expense'}/>
                    <Total budget={budgetData} interval={'M'} index = {0} type={'saving'}/>   
                </div>
                <div style={{height:'2.5vh'}}/>
                <CategoryTable budget={budgetData} categories={10} index={0} type={'expense'}/>
            </div>
            <Modal isOpen={modal} toggle={()=> {setModal(false);}} style={{marginTop:'65px',width:'30vw'}}>
                <ModalHeader toggle={()=> {setModal(false);}} close={closeBtn}>Please Verify Your Email</ModalHeader>
                    <ModalBody style={{display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column'}}>
                        <VerifyEmail height={'modal'}/>
                    </ModalBody>
            </Modal>
        </div>
)}

export default Analytics;