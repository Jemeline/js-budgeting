import React, {useState, useEffect} from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { ThemeProvider } from '@material-ui/styles';
import {darkTheme,tableStyles} from '../../utils/design';


export default function BudgetTable({budget, type}) {
  const classes = tableStyles();
  const [budgetRows, setBudgetRows] = useState([]);
  const [budgetColumns, setBudgetColumns] = useState([]);

  useEffect(async () => {
    const filteredBudget = typeof(budget.data)==='undefined'?[]:budget.data.filter(ele=>ele.budgetType===type);
    setBudgetColumns([
        { field: 'date', headerName: 'Date', flex: 0.125},
        { field: 'description', headerName: 'Description', flex: 0.225},
        { field: 'category', headerName: 'Category', flex: 0.15},
        { field: 'subcategory', headerName: 'Subcategory', flex: 0.175},
        { field: 'amount', headerName: 'Amount ($)', flex: 0.175},
        ]);
    setBudgetRows(filteredBudget.map(ele=> {return {  
        date: ele.budgetDate,
        description: ele.budgetDescription,
        category: ele.budgetCategory, 
        subcategory: ele.budgetSubcategory,
        amount: ele.budgetAmount.toFixed(2),
        id: ele._id,
    }}));
  }, [budget, type]);

  return (
    <div style ={{display:'flex', flexDirection:'column',backgroundColor:'#28365f',height:'75vh',width:'75vw',}}>
      <p style = {{color:'white'}}>{type==="expense"?"Expense History":"Income History"}</p>
      <div style = {{display:'flex', alignItems:'center',justifyContent:'center',height:'70vh' }}>
            <ThemeProvider theme={darkTheme}>
                <DataGrid className={classes.root} rows={budgetRows} columns={budgetColumns} disableColumnMenu={true} sortModel={[{field: 'date', sort: 'desc',}]} scrollbarSize={17} autoPageSize={true} density={'compact'}/>
            </ThemeProvider>
      </div>
    </div>
  )
}