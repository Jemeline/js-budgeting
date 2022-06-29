import React from 'react';
import ExpenseLineChart from '../components/Graphs/ExpenseLineChart';
import { useBudgetState } from '../contexts/BudgetContext';

function Analytics() {
  const { budget } = useBudgetState();

  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-around', flexDirection: 'row', height: 'calc(100vh - 60px)',
    }}
    >
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100vw', height: 'calc(100vh - 60px)',
      }}
      >
        <ExpenseLineChart budget={budget} type="expense" />
      </div>
    </div>
  );
}

export default Analytics;
