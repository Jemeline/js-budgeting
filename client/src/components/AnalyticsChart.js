import React, { useState, useEffect } from 'react';
import {getMonthsArray, monthNames} from '../utils/common';
import { ExpenseCategories, IncomeCategories } from '../utils/BudgetCategories';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { LineChart, Line } from 'recharts';

function AnalyticsChart({budget, type, color}) {
    const [data, setData] = useState([]);
    
    useEffect(async () => {
        const budgetDataByDate = budget?.data?.map(ele=> {
            return {
                ...ele,
                filteredDate: monthNames[new Date(ele.budgetDate).getMonth()]
            }
        }) ?? [];
        const filteredData = budgetDataByDate.filter(ele => ele.budgetType === type);
        const totals = getMonthsArray().map(monthEle => {
            const sum = filteredData.filter(e => e.filteredDate===monthEle).reduce((sum, curr) => sum + curr.budgetAmount, 0);
            return {name: monthEle, pv: sum,};
        });
        setData(totals);
    }, [budget]);

    return (
        // <>
        //     <div className="display-below-md">
        //         <div class="container-fluid rounded-3" style={{backgroundColor : "rgba(53,55,78,0.4)", width: "100%", height: "100%"}}>
        //             <ResponsiveContainer width="100%" height="100%">
        //                 <LineChart
        //                     width={100}
        //                     height={100}
        //                     data={data}
        //                     margin={{
        //                         top: 20,
        //                         right: 15,
        //                         left: 15,
        //                         bottom: 20,
        //                     }}
        //                 >
        //                     <Line type="monotone" stroke={color} dataKey="pv" strokeWidth={2} dot={{fill: color, stroke: color, strokeWidth: 2 }} />
        //                 </LineChart>
        //             </ResponsiveContainer>
        //         </div>
        //     </div>
        //     <div className="display-only-md">
                <div class="container-fluid rounded-3" style={{backgroundColor : "rgba(53,55,78,0.4)", width: "100%", height: "100%"}}>
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                            width={100}
                            height={100}
                            data={data}
                            margin={{
                                top: 20,
                                right: 15,
                                left: 15,
                                bottom: 20,
                            }}
                        >
                            <Line type="monotone" stroke={color} dataKey="pv" strokeWidth={2} dot={{fill: color, stroke: color, strokeWidth: 2 }} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
    //         </div>
    //     </>
    )
};

export default AnalyticsChart;