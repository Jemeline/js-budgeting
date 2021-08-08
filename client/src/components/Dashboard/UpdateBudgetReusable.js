import React, {useState,useEffect} from 'react';
import {Button,FormFeedback,Input} from 'reactstrap';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import Select from 'react-select';
import {ExpenseCategories,IncomeCategories} from '../../utils/BudgetCategories';
import Alert from '@material-ui/lab/Alert';
import Collapse from '@material-ui/core/Collapse';
import {getFormattedDate} from '../../utils/common';
import {apiAddBudget,apiUpdateBudget,apiRemoveBudget} from '../../utils/api';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

const darkTheme = createMuiTheme({
    palette: {
      type: 'dark',
    },
  });
function UpdateBudgetReusable({BudgetType,BudgetDescription,BudgetAmount,BudgetDate,BudgetCategory,BudgetSubcategory,BudgetClass,BudgetId}) {
    const [budgetType, setBudgetType] = useState((BudgetType) ? BudgetType : 'expense');
    const [budgetDescription, setBudgetDescription] = useState((BudgetDescription) ? BudgetDescription : '');
    const [budgetAmount, setBudgetAmount] = useState((BudgetAmount) ? BudgetAmount : '');
    const [budgetDate, setBudgetDate] = useState((BudgetDate) ? new Date(BudgetDate) : new Date());
    const [budgetCategory, setBudgetCategory] = useState((BudgetCategory) ? {label:BudgetCategory,value:BudgetCategory} : '');
    const [budgetSubcategory, setBudgetSubcategory] = useState((BudgetSubcategory) ? {label:BudgetSubcategory,value:BudgetSubcategory} : '');
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
    const resetBudgetCategories = () => {
        setBudgetCategory('');
        setBudgetSubcategories([]);
        setBudgetSubcategory('');
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

    async function handleBudget(){
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
            else {
                const payload = {
                    _userId:sessionStorage.getItem('id'),
                    budgetType:budgetType,
                    budgetAmount:budgetAmount,
                    budgetDate:getFormattedDate(budgetDate),
                    budgetCategory:budgetCategory.label,
                    budgetDescription:budgetDescription,
                    budgetSubcategory:budgetSubcategory.label,
                };
                if (BudgetClass === 'add') {
                    const data = await apiAddBudget(payload);
                    clearBudgetForm();   
                } else {
                    const data = await apiUpdateBudget(BudgetId,payload);
                }     
            }
            } catch (error){
                console.log(error);
                raiseAlert('Something went wrong...',"error");
            };
    };

    async function handleRemoveBudget(){
        try{
            resetAlert();
            const data = await apiRemoveBudget(BudgetId);  
        } catch (error){
            console.log(error);
            raiseAlert('Something went wrong...',"error");
        };
    };
    const getColor = (bt) => {
        return budgetType === bt ? '#D90166' : 'transparent';
    };

    return (
            <div style={{display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column'}}>
                <Collapse in={alertBudget}>
                    <Alert severity={alertBudgetSeverity} onClose={() => setAlertBudget(false)}>{alertBudgetMessage}</Alert>
                </Collapse>
                <div style={{display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'row'}}>
                    <button style={{color:'white',backgroundColor:getColor('expense'),borderRadius:'25px', outline:'none',borderColor:'transparent',marginLeft:'2%',marginRight:'2%',marginTop:'2%',paddingLeft:'5px',paddingRight:'5px',fontSize:'15px'}} onClick={()=> setBudgetType('expense')}>Expense</button>
                    <button style={{color:'white',backgroundColor:getColor('income'),borderRadius:'25px', outline:'none',borderColor:'transparent',marginLeft:'2%',marginRight:'2%',marginTop:'2%',paddingLeft:'5px',paddingRight:'5px',fontSize:'15px'}} onClick={()=> setBudgetType('income')}>Income</button>
                </div>
                <Input
                    type="text"
                    id="inputID"
                    placeholder="Description"
                    onChange={(e) => setBudgetDescription(e.target.value)}
                    value={budgetDescription}
                    valid={ budgetDescription.length > 0 }
                    invalid={ budgetAmount.length < 0}
                    style={{padding:'10px',backgroundColor:'transparent',borderColor:'transparent',color:'white',fontSize:'15px'}}
                /> 
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <ThemeProvider theme={darkTheme}>
                        <CssBaseline />
                            <KeyboardDatePicker
                                disableToolbar
                                variant="inline"
                                format="MM/dd/yyyy"
                                value={budgetDate}
                                onChange={handleBudgetDateChange}
                                style={{padding:'10px',color:'white',width:'20vw'}}
                            />
                    </ThemeProvider>
                </MuiPickersUtilsProvider>
                <Input
                    type="number"
                    id="inputID"
                    placeholder="Amount"
                    min="0.01"
                    step="0.01"
                    onChange={(e) => setBudgetAmount(e.target.value)}
                    value={budgetAmount}
                    valid={ budgetAmount > 0 }
                    invalid={ budgetAmount.length > 0 && budgetAmount <= 0}
                    style={{padding:'10px',backgroundColor:'transparent',borderColor:'transparent',color:'white',fontSize:'15px'}}
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
                    styles={colourStyles}
                />
                <Select
                    placeholder={"Subcategory"}
                    options={BudgetSubcategories}
                    onChange={(e)=> handleChangeBudgetSubcategory(e)}
                    value={budgetSubcategory}
                    menuPlacement="auto"
                    isClearable
                    styles={colourStyles}
                />
                <div hidden={BudgetClass === 'edit'} style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
                    <Button
                        size="md"
                        type='submit'
                        onClick={async (e) => {
                            await handleBudget();
                            window.location.reload(false);
                        }}
                        style={{color:'white',backgroundColor:'#D90166',width: '10vw',outline:'none',borderColor:'transparent',marginLeft:'2%',marginRight:'2%',marginBottom:'2%',marginTop:'10%',paddingTop:'1%',paddingBottom:'1%',paddingLeft:'5px',paddingRight:'5px'}}>
                    Add</Button>
                </div>
                <div hidden={BudgetClass === 'add'} style={{display:'flex',alignItems:'center',flexDirection:'row',justifyContent:'center'}}>
                    <Button
                        size="md"
                        type='submit'
                        onClick={async (e) => {
                            await handleBudget();
                            window.location.reload(false);
                        }}
                        style={{color:'white',backgroundColor:'#D90166',width: '10vw',outline:'none',borderColor:'transparent',marginLeft:'2%',marginRight:'2%',marginBottom:'2%',marginTop:'10%',paddingTop:'1%',paddingBottom:'1%',paddingLeft:'5px',paddingRight:'5px'}}>
                    Update</Button>
                    <Button
                        size="md"
                        type='submit'
                        onClick={async (e) => {
                            await handleRemoveBudget();
                            window.location.reload(false);
                        }}
                        style={{color:'white',backgroundColor:'#D90166',width: '10vw',outline:'none',borderColor:'transparent',marginLeft:'2%',marginRight:'2%',marginBottom:'2%',marginTop:'10%',paddingTop:'1%',paddingBottom:'1%',paddingLeft:'5px',paddingRight:'5px'}}>
                    Delete</Button>
                </div>
            </div>
)};
export const colourStyles = {
    control: styles => ({ ...styles, backgroundColor: 'transparent',borderColor:'transparent',width:'20vw'}),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      return {
        ...styles,
        color:'black',
      };
    },
    placeholder: (styles, { data }) => ({
        ...styles,
        color:'white',
        fontSize:'15px'
    }),
    singleValue: (styles, { data }) => ({
        ...styles,
        color:'white',
        fontSize:'15px'
    }),
};
export default UpdateBudgetReusable;