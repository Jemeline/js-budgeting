import React, {useState,useEffect} from 'react';
import AnalyticsCard from './AnalyticsCard';
import AnalyticsChart from './AnalyticsChart';
import PieChart from './PieChart';
import RecentExpenses from './RecentExpenses';
import { Modal, ModalHeader, ModalBody, Button, ButtonGroup} from 'reactstrap';
import {apiGetUser,apiGetBudgetByUser} from '../utils/api';
import { faPiggyBank, faMoneyCheckAlt, faHandHoldingUsd, faChartLine, faChartPie } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import VerifyEmail from './Authentication/VerifyEmail';
import CategoryTable from './Dashboard/CategoryTable';
import RecentTransactions from './Dashboard/RecentTransactions';
import UpdateBudgetReusable from './Dashboard/UpdateBudgetReusable';
import Total from './Dashboard/Total';
import { ToggleButton } from 'react-bootstrap';

function Home() {
    const [modal,setModal] = useState(false);
    const [chartView,setChartView] = useState("line");
    const [budgetData, setBudgetData] = useState({});
    const id = sessionStorage.getItem('id');
    
    useEffect(async () => {
        try{
            const user = await apiGetUser(id);
            if (!user.data.isVerified) {
                setModal(true);
            }
            const budget = await apiGetBudgetByUser(id);
            setBudgetData(budget);
        } catch (err){
            console.log(err);
        }  
    }, []);

    return (
        <>
            <div style={{height: 60}}>Header</div>
            <div className='display-only-sm'>
                <div class="row">
                    <div class="col col-xs-12 col-sm-12 col-md-12 col-lg-8 col-xl-8 col-xxl-8 col-xxxl-8">
                        <div class="row row-cols-xs-3 row-cols-sm-3 row-cols-md-3 row-cols-lg-3 row-cols-xl-3">
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
                        <div class="btn-group py-4" style={{color: "rgba(53,55,64,0.3)"}}>
                            <button type="radio" class="btn btn-dark" onClick={() => setChartView("line")}>
                                <FontAwesomeIcon icon={faChartLine} size="lg" color={"#39ace7"} />
                            </button>
                            <button type="radio" class="btn btn-dark" onClick={() => setChartView("pie")}>
                                <FontAwesomeIcon icon={faChartPie} size="lg" color="#39ace7" />
                            </button>
                        </div>
                        <div class="row">
                            <div class="col">
                                {(chartView === "line") ?
                                    <AnalyticsChart color={"#39ace7"} budget={budgetData} type={'expense'}/>:
                                    <PieChart/>
                                }
                            </div>
                        </div>
                        <br/>
                    </div>
                </div>
            </div>
            <div className='display-above-sm'>
                <div class="row">
                    <div class="col col-xs-12 col-sm-12 col-md-12 col-lg-8 col-xl-8 col-xxl-8 col-xxxl-8">
                        <div class="row row-cols-xs-3 row-cols-sm-3 row-cols-md-3 row-cols-lg-3 row-cols-xl-3">
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
                        <div class="row">
                            <div class="col">
                                <AnalyticsChart color={"#39ace7"} budget={budgetData} type={'expense'}/>
                            </div>
                        </div>
                        <br/>
                        <div class="row row-cols-xs-1 row-cols-sm-1 row-cols-md-2 row-cols-lg-2 row-cols-xl-2">
                            <div class="col">
                                <PieChart/>
                            </div>
                        </div>
                    </div>
                    <div class="col col-xs-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 col-xxl-4 col-xxxl-4">
                        <RecentExpenses />
                    </div>
                </div>
            </div>
        </>
)}

export default Home;