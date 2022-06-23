import React from 'react';
import BudgetTable from '../components/Tables/BudgetTable';
import { useBudgetState } from '../contexts/BudgetContext';

function Home() {
  const budgetData = useBudgetState();

  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-around', flexDirection: 'column', height: 'calc(100vh - 60px)',
    }}
    >
      <BudgetTable budget={budgetData} type="income" />
    </div>
  );
}

export default Home;
