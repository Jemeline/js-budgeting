import React, {
  createContext, useContext, useEffect, useState,
} from 'react';
import { apiGetBudgetByUser } from '../utils/api';

const BudgetContext = createContext({});

const id = sessionStorage.getItem('id');

function BudgetProvider({ children }) {
  const [budget, setBudget] = useState({});

  useEffect(() => {
    try {
      apiGetBudgetByUser(id).then((data) => setBudget(data));
    } catch (err) {
      console.log(err);
    }
  }, [id]);

  return (
    <BudgetContext.Provider value={budget}>
      {children}
    </BudgetContext.Provider>
  );
}

function useBudgetState() {
  const budget = useContext(BudgetContext);

  if (budget === null) {
    throw new Error('Cannot use budget state unless component is a decendant of the BudgetProvider');
  }

  return budget;
}

export { BudgetProvider, useBudgetState };
export default BudgetContext;
