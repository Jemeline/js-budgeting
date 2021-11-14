import React, {useState, useEffect} from 'react';
import { Line } from 'react-chartjs-2';
import {getMonthsArray, monthNames} from '../../utils/common';
import { ExpenseCategories } from '../../utils/BudgetCategories';

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
  useEffect(async () => {
    const filteredBudget = typeof(budget.data)==='undefined'?[]:budget.data.filter(ele => ele.budgetType===type);
    const intervalList = typeof(budget.data)==='undefined'?[]:getMonthsArray(new Date());
    filteredBudget.map(ele=>{ele.filteredDate = monthNames[new Date(ele.budgetDate).getMonth()]});
    const totals = intervalList.map(monthEle => {
        const sum = filteredBudget.filter(e => e.filteredDate===monthEle).reduce((sum, curr) => sum + curr.budgetAmount, 0);
        const categoryTotals = ExpenseCategories.map(categoryEle => {
            const categoryTotal = filteredBudget.filter(e => e.filteredDate===monthEle && e.budgetCategory===categoryEle.value).reduce((sum, curr) => sum + curr.budgetAmount, 0);
            return {expenseCategory: categoryEle.value, categoryTotal:categoryTotal.toFixed(2)};
        });
        return {month: monthEle, total: sum, categoryTotals: categoryTotals};
    });
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
        data: totals.map(ele=>ele.total),
        backgroundColor: 'purple',
        borderColor: 'purple',
    });
    // Set chart data and colors
    setData({
        labels: intervalList,
        datasets: datasets,
    });
}, [budget]);

  return (
    <div style = {{display:'flex',justifyContent:'center'}}>
      <div style = {{height:'60vh',width:'85vw',display:'flex', justifyContent:'center'}}>
        <Line data={data} options={options}/>
      </div>
    </div>
  )};
