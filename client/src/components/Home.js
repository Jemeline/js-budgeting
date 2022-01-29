import React, {useState,useEffect} from 'react';
import AnalyticsCard from './AnalyticsCard';
import { Modal, ModalHeader, ModalBody, Button} from 'reactstrap';
import {apiGetUser,apiGetBudgetByUser} from '../utils/api';
import { faPiggyBank, faMoneyBillWave, faHandHoldingUsd } from '@fortawesome/free-solid-svg-icons';
import VerifyEmail from './Authentication/VerifyEmail';
import CategoryTable from './Dashboard/CategoryTable';
import RecentTransactions from './Dashboard/RecentTransactions';
import UpdateBudgetReusable from './Dashboard/UpdateBudgetReusable';
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
        <div class="row row-cols-xs-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-4 row-cols-xl-4">
             <div class="col">
            <AnalyticsCard icon={faHandHoldingUsd} value={25000}  color={"#39ace7"} text={"Total Income"}/>
            </div>
            <div class="col">
            <AnalyticsCard icon={faMoneyBillWave} value={5000} color={"#bf0000"} text={"Total Expenses"}/>
            </div>
            <div class="col">
            <AnalyticsCard icon={faPiggyBank} value={"50%"} text={"Savings Rate"}/>
            </div>
            <div class="col">
            <AnalyticsCard icon={faPiggyBank} value={"50%"} text={"Savings Rate"}/>
            </div>
            
        </div>
        // <div style={{display:'flex',alignItems:'center',justifyContent:'space-around',flexDirection:'row',height:'100vh'}}>
        //     {/* <div>
        //         <RecentTransactions budget={budgetData} type={'expense'} transactions={5}/>
        //         <div style={{height:'1.5vh'}}/>
        //         <RecentTransactions budget={budgetData} type={'income'} transactions={3}/>
        //     </div> */}
        //     <AnalyticsCard icon={faHandHoldingUsd} value={25000}  color={"#39ace7"} text={"Total Income"}/>
        //     <AnalyticsCard icon={faMoneyBillWave} value={5000} color={"#bf0000"} text={"Total Expenses"}/>
        //     <AnalyticsCard icon={faPiggyBank} value={"50%"} text={"Savings Rate"}/>
        //     {/* <div style = {{width:'30vw'}}>
        //         <p style = {{color:'white', margin:0}}>Yearly</p>
        //         <div style={{display:'flex',alignItems:'center',justifyContent:'space-around',flexDirection:'row'}}>
        //             <Total budget={budgetData} interval={'Y'} index = {0} type={'income'}/>        
        //             <Total budget={budgetData} interval={'Y'} index = {0} type={'expense'}/>
        //             <Total budget={budgetData} interval={'Y'} index = {0} type={'saving'}/>   
        //         </div>
        //         <p style = {{color:'white', margin:0}}>Monthly</p>
        //         <div style={{display:'flex',alignItems:'center',justifyContent:'space-around',flexDirection:'row'}}>
        //             <Total budget={budgetData} interval={'M'} index = {0} type={'income'}/>        
        //             <Total budget={budgetData} interval={'M'} index = {0} type={'expense'}/>
        //             <Total budget={budgetData} interval={'M'} index = {0} type={'saving'}/>   
        //         </div>
        //     </div>
        //     <div>
        //         <div style={{backgroundColor:'#393E46',borderRadius:'10px'}}>
        //         <UpdateBudgetReusable BudgetClass="add"/>
        //         </div>
        //         <div style={{height:'2.5vh'}}/>
        //         <CategoryTable budget={budgetData} categories={5} index={0} type={'expense'}/>
        //     </div>
        //     <Modal isOpen={modal} toggle={()=> {setModal(false);}} style={{marginTop:'65px',width:'30vw'}}>
        //         <ModalHeader toggle={()=> {setModal(false);}} close={closeBtn}>Please Verify Your Email</ModalHeader>
        //             <ModalBody style={{display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column'}}>
        //                 <VerifyEmail height={'modal'}/>
        //             </ModalBody>
        //     </Modal> */}
        // </div>
)}

export default Home;