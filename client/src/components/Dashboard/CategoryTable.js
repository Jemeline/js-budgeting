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
    const today = new Date();
    const startDate = new Date(today.getFullYear(),today.getMonth()-index,1);
    const endDate = new Date(today.getFullYear(),today.getMonth()-index+1,0)
    const intervalList = (getDaysArray(startDate,endDate).map((ele)=>ele.toISOString().slice(5,10)));
    filteredBudget.map(ele => {ele.filteredDate = new Date(ele.budgetDate).toISOString().slice(5,10)});
    const categoryList = type==="expense"?ExpenseCategories.map(e=>e.value):IncomeCategories(e=>e.value);
    const categoryTotals = categoryList.map(categoryEle => {
      const sum = filteredBudget.filter(e => intervalList.includes(e.filteredDate) && e.budgetCategory===categoryEle).reduce((sum, curr) => sum + curr.budgetAmount, 0);
      return {category: categoryEle, amount: sum.toFixed(2), id: categoryEle}
    });
    const reducedCategoryList = categoryTotals.sort(function (a, b) {return b.amount - a.amount;}).slice(0,categories);

    setBudgetColumns([
        { field: 'category', headerName: 'Category', flex: 0.5},
        { field: 'amount', headerName: 'Amount ($)', flex: 0.5},
        ]);
    setBudgetRows(reducedCategoryList);
  }, [budget, index, interval,]);

  return (
    <div style ={{display:'flex', flexDirection:'column',alignItems:'center',justifyContent:'center',backgroundColor:'#393E46',height:10+categories*6+'vh',width:'21vw',borderRadius:'10px'}}>
      <p style = {{color:'#D90166', margin:0}}>{type==="expense"?"Top Expense Categories":"Top Income Histories"}</p>
      <div style = {{height:'100vh',width:'20vw',display:'flex', alignItems:'center',justifyContent:'center'}}>
          <ThemeProvider theme={darkTheme}>
              <DataGrid className={classes.root} rows={budgetRows} columns={budgetColumns} hideFooter={true} disableColumnMenu={true} scrollbarSize={17} autoPageSize={true} density={'compact'}/>
          </ThemeProvider>
      </div>
    </div>
  )};
 