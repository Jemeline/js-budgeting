import React, {useState,useEffect} from 'react';
import { Modal, ModalHeader, ModalBody, Button} from 'reactstrap';
import {apiGetUser,apiGetBudgetByUser} from '../utils/api';
import VerifyEmail from './Authentication/VerifyEmail';
import CategoryTable from './Dashboard/CategoryTable';
import RecentTransactions from './Dashboard/RecentTransactions';
import UpdateBudget from './Dashboard/UpdateBudget';
import Total from './Dashboard/Total';

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

    const closeBtn = <Button size="sm" onClick={()=> {setModal(false);}} style={{backgroundColor:"white",borderColor:"white",outline:'none'}}><strong style={{fontSize:'20px'}}>&times;</strong></Button>;
    return (
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-around',flexDirection:'row',height:'calc(100vh-60px)'}}>
            <div>
                <RecentTransactions budget={budgetData} type={'expense'} transactions={5}/>
                <div style={{height:'1.5vh'}}/>
                <RecentTransactions budget={budgetData} type={'income'} transactions={3}/>
            </div>
            <div>
                <p style = {{color:'white', margin:0}}>Yearly</p>
                <div style={{display:'flex',alignItems:'center',justifyContent:'space-around',flexDirection:'row'}}>
                    <Total budget={budgetData} interval={'Y'} type={'income'}/>        
                    <Total budget={budgetData} interval={'Y'} type={'expense'}/>
                    <Total budget={budgetData} interval={'Y'} type={'saving'}/>   
                </div>
                <p style = {{color:'white', margin:0}}>Monthly</p>
                <div style={{display:'flex',alignItems:'center',justifyContent:'space-around',flexDirection:'row'}}>
                    <Total budget={budgetData} interval={'M'} type={'income'}/>        
                    <Total budget={budgetData} interval={'M'} type={'expense'}/>
                    <Total budget={budgetData} interval={'M'} type={'saving'}/>   
                </div>
                <div style={{height:'2.5vh'}}/>
                <CategoryTable budget={budgetData} categories={5} type={'expense'}/>
            </div>
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