import React, {useState,useEffect} from 'react';
import AnalyticsCard from './AnalyticsCard';
import AnalyticsChart from './AnalyticsChart';
import PieChart from './PieChart';
import DashboardSmall from './Dashboard/DashboardSmall';
import RecentExpenses from './RecentExpenses';
import DateSelector from './DateSelector';
import ReactTooltip from "react-tooltip";
import { Popover } from 'react-tiny-popover';
import { Modal, ModalHeader, ModalBody, Button, ButtonGroup} from 'reactstrap';
import {apiGetUser,apiGetBudgetByUser, apiBudgetTotalExpenses, apiExpensesByCategory } from '../utils/api';
import { faPiggyBank, faMoneyCheckAlt, faHandHoldingUsd, faChartLine, faChartPie, faUserCircle, faCaretDown, faCalendarDay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import VerifyEmail from './Authentication/VerifyEmail';
import CategoryTable from './Dashboard/CategoryTable';
import RecentTransactions from './Dashboard/RecentTransactions';
import UpdateBudgetReusable from './Dashboard/UpdateBudgetReusable';
import Total from './Dashboard/Total';
import { ToggleButton } from 'react-bootstrap';
import { ExpenseCategories } from '../utils/BudgetCategories';
import { Fab, Action } from "react-tiny-fab";
import moment from 'moment';
import 'react-tiny-fab/dist/styles.css';

function Home({}) {
    const [budgetData, setBudgetData] = useState({});
    const [totalExpenses, setTotalExpenses] = useState(null);
    const [totalIncome, setTotalIncome] = useState(null);
    const [totalsByCategory, setTotalsByCategory] = useState(null);
    const [startDate, setStartDate] = useState(moment().startOf('month'));
    const [endDate, setEndDate] = useState(moment());
    const [show, setShow] = useState(false);
    const id = sessionStorage.getItem('id');
    
    useEffect(async () => {
        try{
            const user = await apiGetUser(id);
            const budget = await apiGetBudgetByUser(id);
            const totals = await apiBudgetTotalExpenses(id, { startDate: startDate, endDate: endDate});
            const categoricalTotals = await apiExpensesByCategory(id, { startDate: startDate, endDate: endDate});
            setBudgetData(budget.data);
            setTotalExpenses(totals.data?.expense?.total ?? null);
            setTotalIncome(totals.data?.income?.total ?? null);
            setTotalsByCategory(categoricalTotals.data)
        } catch (err){
            console.log(err);
        }  
    }, [startDate, endDate]);

    return (
        <>
        <DateSelector startDate={startDate} endDate={endDate} setStartDate={setStartDate} setEndDate={setEndDate} show={show} setShow={setShow}/>
        <Fab
            icon={<FontAwesomeIcon icon={faCalendarDay} size="lg" />}
            event="click"
            onClick={() => setShow(!show)}
            style={{bottom: -8, right: -8}}
            mainButtonStyles={{backgroundColor: "#39ace7"}}
        >
        </Fab>
            <div class="d-flex flex-row align-items-center justify-content-between" style={{height: 20, color: "#BFB9C5"}}/>
            <DashboardSmall totalExpenses={totalExpenses} totalIncome={totalIncome} budget={budgetData} totalsByCategory={totalsByCategory}/>
            {/* <div className='display-below-md'>

                <div class="row">
                    <div class="col col-12">
                        <div class="row row-cols-xs-3 row-cols-sm-3 row-cols-md-3" style={{height: "calc(0.25 * (100vh - 80px))"}}>
                            <div class="col">
                                <AnalyticsCard icon={faHandHoldingUsd} value={totalIncome?.toFixed(0) || "-"} color={"#39ace7"} text={"Income"}/>
                            </div>
                            <div class="col">
                                <AnalyticsCard icon={faMoneyCheckAlt} value={totalExpenses?.toFixed(0) || "-"} color={"#bf0000"} text={"Expenses"}/>
                            </div>
                            <div class="col">
                                <AnalyticsCard icon={faPiggyBank} value={(((totalIncome - totalExpenses)/totalIncome)*100).toFixed(0)+"%"} text={"Savings"}/>
                            </div>
                        </div>
                        <div class="row" style={{height: "calc(0.15 * (100vh - 80px))"}}>
                            <div class="col d-flex align-items-center justify-content-center w-25">
                                <div class="btn-group py-4" style={{color: "rgba(53,55,64,0.3)"}}>
                                    <button type="radio" class="btn btn-dark" onClick={() => setChartView("line")}>
                                        <FontAwesomeIcon icon={faChartLine} size="lg" color={"#39ace7"} />
                                    </button>
                                    <button type="radio" class="btn btn-dark" onClick={() => setChartView("pie")}>
                                        <FontAwesomeIcon icon={faChartPie} size="lg" color="#39ace7" />
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div class="row" style={{height: "calc(0.55 * (100vh - 80px))"}}>
                            <div class="col">
                                {(chartView === "line") ?
                                    <AnalyticsChart color={"#39ace7"} budget={budgetData} type={'expense'}/>:
                                    <PieChart totalsByCategory={totalsByCategory}/>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}
            <div className='display-only-md'>
                <div class="row">
                    <div class="col col-12">
                        <div class="row row-cols-sm-3 row-cols-md-3 row-cols-lg-3" style={{height: "calc(0.10 * (100vh - 80px))"}}>
                            <div class="col">
                                <AnalyticsCard icon={faHandHoldingUsd} value={25000} color={"#39ace7"} text={"Income"}/>
                            </div>
                            <div class="col">
                                <AnalyticsCard icon={faMoneyCheckAlt} value={5000} color={"#bf0000"} text={"Expenses"}/>
                            </div>
                            <div class="col">
                                <AnalyticsCard icon={faPiggyBank} value={"50%"} text={"Savings"}/>
                            </div>
                        </div>
                        <br/>
                        <div class="row" style={{height: "calc(0.4 * (100vh - 80px))"}}>
                            <div class="col">
                                <AnalyticsChart color={"#39ace7"} budget={budgetData} type={'expense'}/>
                            </div>
                        </div>
                        <div class="row" style={{height: "calc(0.03 * (100vh - 80px))"}}/>
                        <div class="row row-cols-md-2 row-cols-lg-2" style={{height: "calc(0.4 * (100vh - 80px))"}}>
                            <div class="col">
                                <PieChart/>
                            </div>
                            <div class="col">
                                <RecentExpenses/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='display-only-lg'>
                <div class="row">
                    <div class="col-lg-8 col-xl-8 col-xxl-8 col-xxxl-8">
                        <div class="row row-cols-lg-3 row-cols-xl-3 row-cols-xxl-3 row-cols-xxxl-3" style={{height: "calc(0.15 * (100vh - 80px))"}}>
                            <div class="col">
                                <AnalyticsCard icon={faHandHoldingUsd} value={25000} color={"#39ace7"} text={"Income"}/>
                            </div>
                            <div class="col">
                                <AnalyticsCard icon={faMoneyCheckAlt} value={5000} color={"#bf0000"} text={"Expenses"}/>
                            </div>
                            <div class="col">
                                <AnalyticsCard icon={faPiggyBank} value={"50%"} text={"Savings"}/>
                            </div>
                        </div>
                        <br/>
                        <div class="row" style={{height: "calc(0.4 * (100vh - 80px))"}}>
                            <div class="col">
                                <AnalyticsChart color={"#39ace7"} budget={budgetData} type={'expense'}/>
                            </div>
                        </div>
                        <br/>
                        <div class="row row-cols-lg-2 row-cols-xl-2 row-cols-xxl-2 row-cols-xxxl-2" style={{height: "calc(0.35 * (100vh - 80px))"}}>
                            <div class="col">
                                <PieChart color={"#39ace7"} budget={budgetData} type={'expense'}/>
                            </div>
                            <div class="col">
                                <PieChart color={"#39ace7"} budget={budgetData} type={'expense'}/>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4 col-xl-4 col-xxl-4 col-xxxl-4" style={{height: "calc(0.95 * (100vh - 80px))"}}>
                        <RecentExpenses />
                    </div>
                </div>
            </div>
            <div className='display-above-xl'>
                <div class="row">
                    <div class="col-lg-8 col-xl-8 col-xxl-8 col-xxxl-8">
                        <div class="row row-cols-lg-3 row-cols-xl-3 row-cols-xxl-3 row-cols-xxxl-3" style={{height: "calc(0.1 * (100vh - 80px))"}}>
                            <div class="col">
                                <AnalyticsCard icon={faHandHoldingUsd} value={25000} color={"#39ace7"} text={"Income"}/>
                            </div>
                            <div class="col">
                                <AnalyticsCard icon={faMoneyCheckAlt} value={5000} color={"#bf0000"} text={"Expenses"}/>
                            </div>
                            <div class="col">
                                <AnalyticsCard icon={faPiggyBank} value={"50%"} text={"Savings"}/>
                            </div>
                        </div>
                        <br/>
                        <div class="row" style={{height: "calc(0.84 * (100vh - 80px))"}}>
                            <div class="col">
                                <AnalyticsChart color={"#39ace7"} budget={budgetData} type={'expense'}/>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4 col-xl-4 col-xxl-4 col-xxxl-4" style={{height: "calc(0.96 * (100vh - 80px))"}}>
                        <div class="row" style={{height: "calc(0.32 * (100vh - 80px))"}}>
                            <div class="col">
                                <RecentExpenses />
                            </div>
                        </div>
                        <br/>
                        <div class="row" style={{height: "calc(0.62 * (100vh - 80px))"}}>
                            <div class="col">
                                <RecentExpenses />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
)}

export default Home;