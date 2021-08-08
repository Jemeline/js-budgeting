import React, {useState, useEffect} from 'react';
import {getDaysArray, getMonthsArray, monthNames, daysInMonthArray} from '../../utils/common';

export default function Total({budget, interval, index, type}) {
  const [total, setTotal] = useState(0);

  useEffect(async () => {
    let intervalList = [];
    const filteredBudget = typeof(budget.data)==='undefined'?[]:budget.data.filter(ele=>ele.budgetType===type);
    const startDate = new Date();
    const endDate = new Date();
    if (interval === 'W'){
      intervalList = (getDaysArray(startDate.setDate(startDate.getDate()-7*(index+1)+1),endDate.setDate(endDate.getDate()-7*index)).map((ele)=>ele.toISOString().slice(5,10)));
      filteredBudget.map(ele => {ele.filteredDate = new Date(ele.budgetDate).toISOString().slice(5,10)});
    } else if (interval === 'M'){
      intervalList = (getDaysArray(startDate.setDate(0),endDate).map((ele)=>ele.toISOString().slice(5,10)));
      // intervalList = (getDaysArray(startDate.setDate(startDate.getDate()-daysInMonthArray[startDate.getMonth()]*(index+1)+1),endDate.setDate(endDate.getDate()-daysInMonthArray[startDate.getMonth()]*index)).map((ele)=>ele.toISOString().slice(5,10)));
      filteredBudget.map(ele => {ele.filteredDate = new Date(ele.budgetDate).toISOString().slice(5,10)});
    } else if (interval === 'Y'){
      intervalList = getMonthsArray(endDate.setYear(endDate.getYear()-index));
      filteredBudget.map(ele=>{ele.filteredDate = monthNames[new Date(ele.budgetDate).getMonth()]});
    }
    setTotal(filteredBudget.filter(ele => intervalList.includes(ele.filteredDate)).reduce((sum, curr) => sum + curr.budgetAmount, 0).toFixed(2));
  }, [budget, index, interval,]);

  return (
    <div style ={{display:'flex', flexDirection:'column',backgroundColor:'#28365f',height:'10vh',width:'20vw',}}>
        <p style = {{color:'white'}}>{type==="expense"?"Total Expenses":"Total Income"}</p>
        <p style = {{color:'white'}}>${total}</p>
    </div>
  )};
