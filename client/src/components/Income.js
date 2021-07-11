import React, {useState,useEffect} from 'react';
import {apiGetUser,apiGetBudgetByUser} from '../utils/api';
import BudgetTable from './Dashboard/BudgetTable';

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

    return (
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-around',flexDirection:'column',height:'calc(100vh-60px)'}}>
            <BudgetTable budget={budgetData} type={'income'}/>
        </div>
)}

export default Home;