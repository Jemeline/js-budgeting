import React, { useState, useEffect } from 'react';
import { getMonthsArray, monthNames } from '../utils/common';
import { ExpenseCategories, IncomeCategories } from '../utils/BudgetCategories';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

function AnalyticsPieChart({ budget, type, color }) {
    // const [data, setData] = useState([]);

    // useEffect(async () => {
    //     const budgetDataByDate = budget?.data?.map(ele=> {
    //         return {
    //             ...ele,
    //             filteredDate: monthNames[new Date(ele.budgetDate).getMonth()]
    //         }
    //     }) ?? [];
    //     const filteredData = budgetDataByDate.filter(ele => ele.budgetType === type);
    //     const totals = getMonthsArray().map(monthEle => {
    //         const sum = filteredData.filter(e => e.filteredDate===monthEle).reduce((sum, curr) => sum + curr.budgetAmount, 0);
    //         return {name: monthEle, pv: sum,};
    //     });
    //     setData(totals);
    // }, [budget]);

    const data = [
        { name: 'Group A', value: 400 },
        { name: 'Group B', value: 300 },
        { name: 'Group C', value: 300 },
        { name: 'Group D', value: 200 },
    ];
    
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    return (
        <>
            <div className="display-only-sm">
                <div class="container-fluid rounded-3" style={{ backgroundColor: "rgba(53,55,78,0.4)", width: "100%", height: "400px" }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart width={100} height={100}>
                            <Pie
                                data={data}
                                cx={"50%"}
                                cy={"50%"}
                                innerRadius={"50%"}
                                outerRadius={"70%"}
                                fill="#8884d8"
                                paddingAngle={5}
                                dataKey="value"
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </>
    )
};

export default AnalyticsPieChart;