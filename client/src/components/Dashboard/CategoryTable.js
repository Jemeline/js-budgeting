import React, {useState, useEffect} from 'react';
import {DataGrid} from '@material-ui/data-grid';
import {getDaysArray} from '../../utils/common';
import {ExpenseCategories, IncomeCategories} from '../../utils/BudgetCategories';
import { ThemeProvider } from '@material-ui/styles';
import {darkTheme,tableStyles} from '../../utils/design';

export default function CategoryTable({budget, interval, index, categories, type}) {
  const classes = tableStyles();
  const [budgetRows, setBudgetRows] = useState([]);
  const [budgetColumns, setBudgetColumns] = useState([]);

  useEffect(async () => {
    const filteredBudget = typeof(budget.data)==='undefined'?[]:budget.data;
    const startDate = new Date();
    const endDate = new Date();
    const intervalList = (getDaysArray(startDate.setDate(0),endDate).map((ele)=>ele.toISOString().slice(5,10)));
    filteredBudget.map(ele => {ele.filteredDate = new Date(ele.budgetDate).toISOString().slice(5,10)});
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
    <div style ={{display:'flex', flexDirection:'column',alignItems:'center',justifyContent:'center',backgroundColor:'#28365f',height:10+categories*6+'vh',width:'30vw',borderRadius:'10px'}}>
      <p style = {{color:'white', margin:0}}>{type==="expense"?"Top Expense Categories":"Top Income Histories"}</p>
      <div style = {{height:'100vh',width:'29vw',display:'flex', alignItems:'center',justifyContent:'center'}}>
          <ThemeProvider theme={darkTheme}>
              <DataGrid className={classes.root} rows={budgetRows} columns={budgetColumns} hideFooter={true} disableColumnMenu={true} scrollbarSize={17} autoPageSize={true} density={'compact'}/>
          </ThemeProvider>
      </div>
    </div>
  )};
 