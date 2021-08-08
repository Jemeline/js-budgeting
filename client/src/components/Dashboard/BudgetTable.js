import React, {useState, useEffect} from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { ThemeProvider } from '@material-ui/styles';
import {darkTheme,tableStyles} from '../../utils/design';
import { Modal, ModalHeader, ModalBody, Button, ModalFooter} from 'reactstrap';
import UpdateBudgetReusable from './UpdateBudgetReusable';
import {capitalizeFirst} from '../../utils/common';

export default function BudgetTable({budget, type}) {
  const classes = tableStyles();
  const [budgetRows, setBudgetRows] = useState([]);
  const [budgetColumns, setBudgetColumns] = useState([]);
  const [editModal, setEditModal] = useState(false);
  const [BudgetId, setBudgetId] = useState('');
  const [BudgetDescription, setBudgetDescription] = useState('');
  const [BudgetAmount, setBudgetAmount] = useState('');
  const [BudgetDate, setBudgetDate] = useState(new Date());
  const [BudgetCategory, setBudgetCategory] = useState('');
  const [BudgetSubcategory, setBudgetSubcategory] = useState('');
  
  function handleEditBudgetRow(row) {
    setBudgetDescription(row.description);
    setBudgetAmount(row.amount);
    setBudgetDate(row.date);
    setBudgetCategory(row.category);
    setBudgetSubcategory(row.subcategory);
    setBudgetId(row.id);
    setEditModal(true);
  };

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
    <div style ={{display:'flex', flexDirection:'column',backgroundColor:'#393E46',height:'75vh',width:'75vw',}}>
      <p style = {{color:'white'}}>{type==="expense"?"Expense History":"Income History"}</p>
      <div style = {{display:'flex', alignItems:'center',justifyContent:'center',height:'70vh' }}>
            <ThemeProvider theme={darkTheme}>
                <DataGrid className={classes.root} rows={budgetRows} columns={budgetColumns} onRowClick={(row)=> handleEditBudgetRow(row.row)} disableColumnMenu={true} sortModel={[{field: 'date', sort: 'desc',}]} scrollbarSize={17} autoPageSize={true} density={'compact'}/>
            </ThemeProvider>
            <Modal isOpen={editModal} toggle={()=> {setEditModal(false);}} style={{width:'25vw'}}>
              <ModalHeader style={{backgroundColor:'#263859',width:'25vw'}}>Edit {capitalizeFirst(type)}</ModalHeader>
              <ModalBody style={{backgroundColor:'#17223B',height:'60vh',width:'25vw',display:'flex',alignItems:'center',justifyContent:'center'}}>
                  <UpdateBudgetReusable BudgetType={type} BudgetDescription={BudgetDescription} BudgetAmount={BudgetAmount} BudgetDate={BudgetDate} BudgetCategory={BudgetCategory} BudgetSubcategory={BudgetSubcategory} BudgetClass="edit" BudgetId={BudgetId}/>
              </ModalBody>
              <ModalFooter style={{backgroundColor:'#263859',width:'25vw'}}/>
            </Modal>
      </div>
    </div>
  )
}