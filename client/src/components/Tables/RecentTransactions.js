import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { DataGrid } from '@material-ui/data-grid';
import { ThemeProvider } from '@material-ui/styles';
import { darkTheme, tableStyles } from '../../utils/design';

export default function RecentTransactions({ budget, transactions, type }) {
  const classes = tableStyles();
  const [budgetRows, setBudgetRows] = useState([]);
  const [budgetColumns, setBudgetColumns] = useState([]);

  useEffect(async () => {
    const filteredBudget = typeof (budget) === 'undefined' ? [] : budget.filter((ele) => ele.budgetType === type);
    filteredBudget.sort((a, b) => new Date(a.budgetDate) - new Date(b.budgetDate)).reverse();
    const reducedBudget = filteredBudget.slice(0, transactions);

    setBudgetColumns([
      { field: 'date', headerName: 'Date', flex: 0.4 },
      { field: 'description', headerName: 'Description', flex: 0.5 },
      { field: 'amount', headerName: 'Amount ($)', flex: 0.5 },
    ]);
    setBudgetRows(reducedBudget.map((ele) => ({
      date: moment(ele.budgetDate).format('MMMM D YYYY'),
      description: ele.budgetDescription,
      amount: ele.budgetAmount.toFixed(2),
      id: ele._id,
    })));
  }, [budget]);

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#393E46', width: '30vw', height: `${10 + transactions * 6}vh`, borderRadius: '10px',
    }}
    >
      <p style={{ color: '#D90166', margin: 0 }}>{type === 'expense' ? 'Recent Expenses' : 'Recent Income'}</p>
      <div style={{
        height: '100vh', width: '29vw', display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}
      >
        <ThemeProvider theme={darkTheme}>
          <DataGrid className={classes.root} rows={budgetRows} columns={budgetColumns} hideFooter disableColumnMenu scrollbarSize={17} autoPageSize density="compact" />
        </ThemeProvider>
      </div>
    </div>
  );
}
