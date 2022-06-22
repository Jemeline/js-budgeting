import React, {useState,useEffect} from 'react';
import {apiGetBudgetByUser} from '../utils/api';
import BudgetTable from './Dashboard/BudgetTable';

function Home() {
    const [budgetData, setBudgetData] = useState({});
    const id = sessionStorage.getItem('id');
    
    useEffect(async () => {
        try{
            const budget = await apiGetBudgetByUser(id);
            setBudgetData(budget);
        } catch (err){
            console.log(err);
        }  
    }, []);

    return (
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-around',flexDirection:'row',height:'calc(100vh - 60px)'}}>
            <BudgetTable budget={budgetData} type={'expense'}/>
        </div>
)}

export default Home;