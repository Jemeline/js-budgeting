import React, { useState } from 'react';
import AnalyticsCard from '../AnalyticsCard';
import AnalyticsChart from '../AnalyticsChart';
import PieChart from '../PieChart';
import { faPiggyBank, faMoneyCheckAlt, faHandHoldingUsd, faChartLine, faChartPie } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function DashboardSmall({totalIncome, totalExpenses, totalsByCategory, budget}) {
    const [chartView,setChartView] = useState("line");
    console.log(budget);
    return (
        <>
            <div className='display-below-md'>
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
                                    <AnalyticsChart color={"#39ace7"} budget={budget} type={'expense'}/>:
                                    <PieChart totalsByCategory={totalsByCategory}/>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
)}

export default DashboardSmall;