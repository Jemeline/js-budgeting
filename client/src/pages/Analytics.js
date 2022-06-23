import React, { useState, useEffect } from 'react';
import { apiGetBudgetByUser } from '../utils/api';
import ExpenseLineChart from '../components/Graphs/ExpenseLineChart';

function Analytics() {
  const [budgetData, setBudgetData] = useState({});
  const id = sessionStorage.getItem('id');

  useEffect(async () => {
    try {
      const budget = await apiGetBudgetByUser(id);
      setBudgetData(budget);
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-around', flexDirection: 'row', height: 'calc(100vh - 60px)',
    }}
    >
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100vw', height: 'calc(100vh - 60px)',
      }}
      >
        <ExpenseLineChart budget={budgetData} type="expense" />
      </div>
    </div>
  );
}

export default Analytics;
