import React, {useState, useEffect} from 'react';
import {DataGrid} from '@material-ui/data-grid';
import {getDaysArray, getMonthsArray, monthNames} from '../../utils/common';
import {ExpenseCategories} from '../../utils/BudgetCategories';
import { ThemeProvider } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import {darkTheme,tableStyles} from '../../utils/design';

export default function CategoryTable({budget, interval, index, categories}) {
  const classes = tableStyles();
  const [budgetRows, setBudgetRows] = useState([]);
  const [budgetColumns, setBudgetColumns] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(async () => {
    setLoading(true);
    let intervalList = [];
    const filteredBudget = typeof(budget.data)==='undefined'?[]:budget.data;
    const startDate = new Date();
    const endDate = new Date();
    if (interval === 'W'){
      intervalList = (getDaysArray(startDate.setDate(startDate.getDate()-7*(index+1)+1),endDate.setDate(endDate.getDate()-7*index)).map((ele)=>ele.toISOString().slice(5,10)));
      filteredBudget.map(ele => {ele.filteredDate = new Date(ele.budgetDate).toISOString().slice(5,10)});
    }else if (interval === 'M'){
      intervalList = (getDaysArray(startDate.setDate(startDate.getDate()-28*(index+1)+1),endDate.setDate(endDate.getDate()-28*index)).map((ele)=>ele.toISOString().slice(5,10)));
      filteredBudget.map(ele => {ele.filteredDate = new Date(ele.budgetDate).toISOString().slice(5,10)});
    }else if (interval === 'Y'){
      intervalList = getMonthsArray(endDate.setYear(endDate.getYear()-index));
      filteredBudget.map(ele=>{ele.filteredDate = monthNames[new Date(ele.budgetDate).getMonth()]});
    }
    let categoryList = ExpenseCategories;
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
    setLoading(false);
  }, [budget, index, interval,]);

  return (
    <div style = {{backgroundColor:'#28365f',height:'50vh',width:'40vw',display:'flex', alignItems:'center',justifyContent:'center'}}>
          <ThemeProvider theme={darkTheme}>
              <DataGrid className={classes.root} rows={budgetRows} columns={budgetColumns} hideFooter={true} disableColumnMenu={true} scrollbarSize={17} autoPageSize={true} density={'compact'}/>
          </ThemeProvider>
      </div>
  )};