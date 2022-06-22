import React, {useState, useEffect} from 'react';
import moment from 'moment';
import { Line } from 'react-chartjs-2';
import {getMonthsArray, monthNames} from '../../utils/common';
import { ExpenseCategories } from '../../utils/BudgetCategories';

function filterByMonth(budgetData, month) {
    budgetData.filter((ele) => moment(ele.budgetDate).month() === month);
}

function filterAndSumByCategory(budgetData, category) {
    budgetData.filter((ele) => ele.budgetCategory === category.value).reduce((sum, curr) => sum + curr.budgetAmount, 0);
}

export default function ExpenseLineChart({budget, type}) {
    const [data, setData] = useState([]);
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        animation: false,
        plugins: {
            legend: {
                display: true,
            },
        },
        scales: {
            x: {
                title: {display: true, text: 'Month', color:'white'},
                ticks: {fontColor: 'white'}
            },
            y: {
                title: {display: true, text: '$', color:'white'},
                beginAtZero: true,
            },
        }
    };
  useEffect(() => {
    if (typeof(budget.data) !=='undefined') {
        const filteredBudget = budget.data.filter(ele => ele.budgetType===type);
        const intervalList = getMonthsArray();
        const totals = intervalList.map(interval => {
            const sum = filteredBudget.filter(e => moment(e.budgetDate).month()===interval.month && moment(e.budgetDate).year()===interval.year).reduce((sum, curr) => sum + curr.budgetAmount, 0);
            const categoryTotals = ExpenseCategories.map(categoryEle => {
                const categoryTotal = filteredBudget.filter(e => moment(e.budgetDate).month()===interval.month && moment(e.budgetDate).year()===interval.year && e.budgetCategory===categoryEle.value).reduce((sum, curr) => sum + curr.budgetAmount , 0);
                return {expenseCategory: categoryEle.value, categoryTotal:categoryTotal.toFixed(2)};
            });
            return {month: monthNames[interval.month], total: sum, categoryTotals: categoryTotals};
        });
        console.log(intervalList);
        console.log(totals)
        const datasets = ExpenseCategories.map(categoryEle=> {
            return {
                label: categoryEle.value, 
                data: totals.map(ele=>ele.categoryTotals.find(ele => ele.expenseCategory === categoryEle.value).categoryTotal),
                backgroundColor: categoryEle.color,
                borderColor: categoryEle.color,
            }
        });
        datasets.unshift({
            label: 'Total',
            data: totals.map(ele => ele.total),
            backgroundColor: 'purple',
            borderColor: 'purple',
        });
        // Set chart data and colors
        setData({
            labels: intervalList.map(ele => monthNames[ele.month]),
            datasets: datasets,
        });
    }
}, [budget]);

  return (
    <div style = {{display:'flex',justifyContent:'center'}}>
      <div style = {{height:'60vh',width:'85vw',display:'flex', justifyContent:'center'}}>
        <Line data={data} options={options}/>
      </div>
    </div>
  )};
