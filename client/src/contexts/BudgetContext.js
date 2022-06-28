import React, {
  createContext, useContext, useEffect, useMemo, useReducer,
} from 'react';
import {
  apiAddBudget, apiRemoveBudget, apiGetBudgetByUser, apiUpdateBudget,
} from '../utils/api';

const BudgetStateContext = createContext();
const BudgetActionsContext = createContext();

const budgetReducer = (state, action) => {
  switch (action.type) {
    case 'INIT_BUDGET':
      return action.payload;
    case 'ADD_BUDGET':
      return [...state, action.payload];
    case 'UPDATE_BUDGET':
      console.log(action.payload);
      return state.map((currBudget) => {
        if (currBudget._id === action.payload._id) return action.payload;
        return currBudget;
      });
    case 'REMOVE_BUDGET':
      return state.filter((currBudget) => currBudget._id !== action.payload);
    default:
      throw new Error();
  }
};

function BudgetProvider({ children }) {
  const [budget, dispatch] = useReducer(budgetReducer, []);
  const userId = sessionStorage.getItem('id');

  const initBudget = () => {
    try {
      apiGetBudgetByUser(userId).then((res) => dispatch({ type: 'INIT_BUDGET', payload: res.data }));
    } catch (err) {
      console.log(err);
    }
  };

  const addBudget = (payload) => {
    try {
      apiAddBudget(payload).then((res) => dispatch({ type: 'ADD_BUDGET', payload: res.data }));
    } catch (err) {
      console.log(err);
    }
  };

  const updateBudget = (budgetId, payload) => {
    try {
      apiUpdateBudget(budgetId, payload).then((res) => dispatch({ type: 'UPDATE_BUDGET', payload: res.data }));
    } catch (err) {
      console.log(err);
    }
  };

  const removeBudget = (budgetId) => {
    try {
      apiRemoveBudget(budgetId).then(() => dispatch({ type: 'REMOVE_BUDGET', payload: budgetId }));
    } catch (err) {
      console.log(err);
    }
  };

  const budgetActions = useMemo(() => [addBudget, updateBudget, removeBudget], []);

  useEffect(() => {
    if (userId) {
      initBudget();
    }
  }, [userId]);

  return (
    <BudgetStateContext.Provider value={budget}>
      <BudgetActionsContext.Provider value={budgetActions}>
        {children}
      </BudgetActionsContext.Provider>
    </BudgetStateContext.Provider>
  );
}

function useBudgetState() {
  const budget = useContext(BudgetStateContext);

  if (budget === null) {
    throw new Error('Cannot use budget state unless component is a decendant of the BudgetProvider');
  }

  return budget;
}

function useBudgetActions() {
  const dispatch = useContext(BudgetActionsContext);

  if (dispatch === null) {
    throw new Error('Cannot use budget actions unless component is a decendant of the BudgetProvider');
  }

  return dispatch;
}

const useBudget = () => [useBudgetState(), useBudgetActions()];

export {
  BudgetProvider, useBudgetState, useBudgetActions, useBudget,
};
