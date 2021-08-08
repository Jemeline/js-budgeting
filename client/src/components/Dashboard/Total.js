import React, {useState, useEffect} from 'react';
import {getDaysArray} from '../../utils/common';

export default function Total({budget,interval,type}) {
  const [total, setTotal] = useState(0);

  useEffect(async () => {
    const filteredBudget = typeof(budget.data)==='undefined'?[]:budget.data;
    const startDate = new Date();
    const endDate = new Date();
    if (interval==='Y') startDate.setMonth(0);
    const intervalList = (getDaysArray(startDate.setDate(0),endDate).map((ele)=>ele.toISOString().slice(5,10)));
    filteredBudget.map(ele => {ele.filteredDate = new Date(ele.budgetDate).toISOString().slice(5,10)});
    const incomeTotal = filteredBudget.filter(ele=>ele.budgetType==='income').filter(ele => intervalList.includes(ele.filteredDate)).reduce((sum, curr) => sum + curr.budgetAmount, 0).toFixed(2);
    const expenseTotal = filteredBudget.filter(ele=>ele.budgetType==='expense').filter(ele => intervalList.includes(ele.filteredDate)).reduce((sum, curr) => sum + curr.budgetAmount, 0).toFixed(2);
    const savingRate = ((incomeTotal-expenseTotal)/incomeTotal*100).toFixed(2);
    setTotal(type==='expense'?expenseTotal:type==='income'?incomeTotal:type==='saving'?savingRate:[]);
  }, [budget]);

  return (
    <div style ={{display:'flex', flexDirection:'column',backgroundColor:'#393E46',height:'9vh',width:'9vw',justifyContent:'center',borderRadius:'10px'}}>
        <p style = {{color:'white',margin:0}}>{type==="expense"?"Total Expenses":type==="income"?"Total Income":type==='saving'?"Savings Rate":"Invalid Type"}</p>
        <p style = {{color:'white',margin:0}}>{type==="saving"?"":"$"}{total}{type==="saving"?"%":""}</p>
    </div>
  )};
