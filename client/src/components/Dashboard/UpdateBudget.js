import React, {useState,useEffect} from 'react';
import {Button,FormFeedback,Input} from 'reactstrap';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import Select from 'react-select';
import {ExpenseCategories,BudgetAccounts,IncomeCategories} from '../../utils/BudgetCategories';
import Alert from '@material-ui/lab/Alert';
import Collapse from '@material-ui/core/Collapse';
import {getFormattedDate} from '../../utils/common';
import {apiAddBudget} from '../../utils/api';

function UpdateBudget() {
    const [budgetType, setBudgetType] = useState('expense');
    const [budgetAccount, setBudgetAccount] = useState('');
    const [budgetDescription, setBudgetDescription] = useState('');
    const [budgetAmount, setBudgetAmount] = useState('');
    const [budgetDate, setBudgetDate] = useState(new Date());
    const [budgetCategory, setBudgetCategory] = useState('');
    const [budgetSubcategory, setBudgetSubcategory] = useState('');
    const [BudgetSubcategories, setBudgetSubcategories] = useState([]);
    const [alertBudget, setAlertBudget] = useState(false);
    const [alertBudgetMessage, setAlertBudgetMessage] = useState('');
    const [alertBudgetSeverity, setAlertBudgetSeverity] = useState('error');

    const handleBudgetDateChange = (date) => {
        setBudgetDate(date);
    };
    const handleBudgetType = (event, newBudgetType) => {
        setBudgetType(newBudgetType);
        resetBudgetCategories();
        resetAlert();
    };
    const handleChangeBudgetCategory = (e) => {
        setBudgetCategory(e);
        setBudgetSubcategory('');
        setBudgetSubcategories(e.subcategories.map((e)=>{return {label:e,value:e}}));
    };
    const handleChangeBudgetSubcategory = (e) => {
        setBudgetSubcategory(e);
    };
    const handleChangeBudgetAccount = (e) => {
        setBudgetAccount(e);
    };

    const resetBudgetCategories = () => {
        setBudgetCategory('');
        setBudgetSubcategories([]);
        setBudgetSubcategory('');
        setBudgetAccount('');
    };

    const resetAlert = () => {
        setAlertBudget(false);
        setAlertBudgetMessage('');
        setAlertBudgetSeverity('error');
    };
    
    const raiseAlert = (message,severity) => {
        setAlertBudget(true);
        setAlertBudgetMessage(message);
        setAlertBudgetSeverity(severity)
    };

    const clearBudgetForm = () => {
        resetBudgetCategories();
        setBudgetDescription('');
        setBudgetAmount('');
        setBudgetDate(new Date());

    };

    async function handleAddBudget(){
        try{
            resetAlert();
            if(!budgetDescription){
                raiseAlert('Enter a description',"error");
            }
            else if (budgetAmount.length <= 0){
                raiseAlert('Enter an amount',"error");
            }
            else if (budgetAmount <= 0){
                raiseAlert('Invalid amount',"error");
            }
            else if (typeof(budgetCategory)!=='object'){
                raiseAlert('Select a category',"error");
            }
            else if(typeof(budgetAccount)!=='object'){
                raiseAlert('Select an account',"error");
            }
            else {
                const payload = {
                    _userId:sessionStorage.getItem('id'),
                    budgetType:budgetType,
                    budgetAmount:budgetAmount,
                    budgetDate:getFormattedDate(budgetDate),
                    budgetCategory:budgetCategory.label,
                    budgetDescription:budgetDescription,
                    budgetSubcategory:budgetSubcategory.label,
                    budgetAccount:budgetAccount.label
                };
                const data = await apiAddBudget(payload);
                clearBudgetForm();    
            }
            } catch (error){
                console.log(error);
                raiseAlert('Something went wrong...',"error");
            };
    };

    return (
        <div style={{display:'flex',alignItems:'center',justifyContent:'center',marginTop:'65px',flexDirection:'row'}}>
            {/* <div style={{width:'240px'}}/> */}
            <div>
                <Collapse in={alertBudget} style={{marginBottom:'10px'}}>
                    <Alert severity={alertBudgetSeverity} onClose={() => setAlertBudget(false)}>{alertBudgetMessage}</Alert>
                </Collapse>
                <ToggleButtonGroup
                    value={budgetType}
                    exclusive
                    onChange={handleBudgetType}
                    size="small"
                    >
                    <ToggleButton value="expense">
                        Expense
                    </ToggleButton>
                    <ToggleButton value="income">
                        Income
                    </ToggleButton>
                </ToggleButtonGroup>
                <Input
                    type="text"
                    placeholder="Description"
                    onChange={(e) => setBudgetDescription(e.target.value)}
                    value={budgetDescription}
                    valid={ budgetDescription.length > 0 }
                    invalid={ budgetAmount.length < 0}
                />
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                        disableToolbar
                        variant="inline"
                        format="MM/dd/yyyy"
                        value={budgetDate}
                        onChange={handleBudgetDateChange}
                    />
                </MuiPickersUtilsProvider>
                <Input
                    type="number"
                    placeholder="Amount"
                    min="0.01"
                    step="0.01"
                    onChange={(e) => setBudgetAmount(e.target.value)}
                    value={budgetAmount}
                    valid={ budgetAmount > 0 }
                    invalid={ budgetAmount.length > 0 && budgetAmount <= 0}
                />
                <FormFeedback>
                    Amount must be greater than zero
                </FormFeedback>
                <Select
                    placeholder={"Category"}
                    options={(budgetType==='expense') ? ExpenseCategories : IncomeCategories}
                    onChange={(e)=> handleChangeBudgetCategory(e)}
                    value={budgetCategory}
                    menuPlacement="auto"
                />
                <Select
                    placeholder={"Subcategory"}
                    options={BudgetSubcategories}
                    onChange={(e)=> handleChangeBudgetSubcategory(e)}
                    value={budgetSubcategory}
                    menuPlacement="auto"
                    isClearable
                />
                <Select
                    placeholder={"Account"}
                    options={BudgetAccounts.map((e)=>{return {label:e,value:e}})}
                    onChange={(e)=> handleChangeBudgetAccount(e)}
                    value={budgetAccount}
                    menuPlacement="auto"
                />
                <Button
                    size="md"
                    type='submit'
                    onClick={async (e) => {
                        e.preventDefault();
                        await handleAddBudget();
                    }}
                > Add</Button>
            </div>
    </div>
)}

export default UpdateBudget;