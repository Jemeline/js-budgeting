import React from 'react';
import BudgetTable from '../components/Tables/BudgetTable';
import { useBudgetState } from '../contexts/BudgetContext';

function Home() {
  const budgetData = useBudgetState();

  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-around', flexDirection: 'row', height: 'calc(100vh - 60px)',
    }}
    >
      <BudgetTable budget={budgetData} type="expense" />
    </div>
  );
}

export default Home;
