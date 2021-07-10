import React, {useState, useEffect} from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { useHistory } from "react-router-dom";
import {apiGetBudgetByUser} from '../../utils/api';

function BudgetTable() {
  const [budgetRows, setBudgetRows] = useState([]);
  const [budgetColumns, setBudgetColumns] = useState([]);
  const history = useHistory();
  const id = sessionStorage.getItem('id');

  useEffect(async () => {
    const budget = await apiGetBudgetByUser(id);
    setBudgetColumns([
        { field: 'date', headerName: 'Date', flex: 0.125},
        { field: 'description', headerName: 'Description', flex: 0.225},
        { field: 'category', headerName: 'Category', flex: 0.15},
        { field: 'subcategory', headerName: 'Subcategory', flex: 0.175},
        { field: 'amount', headerName: 'Amount ($)', flex: 0.175},
        ]);
    setBudgetRows(budget.data.map(ele=> {return {  
        date: ele.budgetDate,
        description: ele.budgetDescription,
        category: ele.budgetCategory, 
        subcategory: ele.budgetSubcategory,
        amount: ele.budgetAmount.toFixed(2),
        id: ele._id,
    }}));
  }, []);

  return (
    <div style={{backgroundColor:'white', zIndex:-1, height:'calc(80vh)'}}>
    <div style = {{height:'80vh',display:'flex', alignItems:'center',justifyContent:'center'}}>
      <div style = {{height:'80vh',width:'55vw',display:'flex', alignItems:'center',justifyContent:'center'}}>
          <DataGrid rows={budgetRows} columns={budgetColumns} disableColumnMenu={true} onCellDoubleClick={(params)=>history.push(`/budget-item/`)} sortModel={[{field: 'date', sort: 'desc',}]} scrollbarSize={17} autoPageSize={true} density={'compact'}/>
      </div>
    </div>
    </div>
  )
}
export default BudgetTable;