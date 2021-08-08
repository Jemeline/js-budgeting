import React, {useState, useEffect} from 'react';
import {DataGrid} from '@material-ui/data-grid';
import {getDaysArray, getMonthsArray, monthNames} from '../../utils/common';
import {ExpenseCategories, IncomeCategories} from '../../utils/BudgetCategories';
import { ThemeProvider } from '@material-ui/styles';
import {darkTheme,tableStyles} from '../../utils/design';

export default function CategoryTable({budget, interval, index, categories, type}) {
  const classes = tableStyles();
  const [budgetRows, setBudgetRows] = useState([]);
  const [budgetColumns, setBudgetColumns] = useState([]);

  useEffect(async () => {
    let intervalList = [];
    const filteredBudget = typeof(budget.data)==='undefined'?[]:budget.data;
    const startDate = new Date();
    const endDate = new Date();
    if (interval === 'W'){
      intervalList = (getDaysArray(startDate.setDate(startDate.getDate()-7*(index+1)+1),endDate.setDate(endDate.getDate()-7*index)).map((ele)=>ele.toISOString().slice(5,10)));
      filteredBudget.map(ele => {ele.filteredDate = new Date(ele.budgetDate).toISOString().slice(5,10)});
    }else if (interval === 'M'){
      intervalList = (getDaysArray(startDate.setDate(0),endDate).map((ele)=>ele.toISOString().slice(5,10)));
      // intervalList = (getDaysArray(startDate.setDate(startDate.getDate()-daysInMonthArray[startDate.getMonth()]*(index+1)+1),endDate.setDate(endDate.getDate()-daysInMonthArray[startDate.getMonth()]*index)).map((ele)=>ele.toISOString().slice(5,10)));
      filteredBudget.map(ele => {ele.filteredDate = new Date(ele.budgetDate).toISOString().slice(5,10)});
    }else if (interval === 'Y'){
      intervalList = getMonthsArray(endDate.setYear(endDate.getYear()-index));
      filteredBudget.map(ele=>{ele.filteredDate = monthNames[new Date(ele.budgetDate).getMonth()]});
    }
    let categoryList = type==="expense"?ExpenseCategories:IncomeCategories;
    categoryList.map(ele => {ele.sum = filteredBudget.filter(e => intervalList.includes(e.filteredDate) && e.budgetCategory===ele.label).reduce((sum, curr) => sum + curr.budgetAmount, 0)});
    categoryList.sort(function (a, b) {return b.sum - a.sum;});
    const reducedCategoryList = categoryList.slice(0,categories);

    setBudgetColumns([
        { field: 'category', headerName: 'Category', flex: 0.5},
        { field: 'amount', headerName: 'Amount ($)', flex: 0.5},
        ]);
    setBudgetRows(reducedCategoryList.map(ele=> {return {  
        category: ele.value, 
        amount: ele.sum.toFixed(2),
        id: ele.label,
    }}));
  }, [budget, index, interval,]);

  return (
    <div style ={{display:'flex', flexDirection:'column',backgroundColor:'#28365f',height:'50vh',width:'40vw',}}>
      <p style = {{color:'white'}}>{type==="expense"?"Top Expense Categories":"Top Income Histories"}</p>
      <div style = {{height:'45vh',display:'flex', alignItems:'center',justifyContent:'center'}}>
          <ThemeProvider theme={darkTheme}>
              <DataGrid className={classes.root} rows={budgetRows} columns={budgetColumns} hideFooter={true} disableColumnMenu={true} scrollbarSize={17} autoPageSize={true} density={'compact'}/>
          </ThemeProvider>
      </div>
    </div>
  )};
 