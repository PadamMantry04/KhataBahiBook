import './App.css';
import React, { Component } from 'react'
import Header from './components/Header'
import Balance from './components/Balance'
import IncomeExpense from './components/IncomeExpense'
import TransactionList from './components/TransactionList'
import UpdateTransactions from './components/UpdateTransactions'

import { GlobalProvider } from './context/GlobalState'

function App() {
  return (
    <GlobalProvider>
      <Header />
      <div className="container">
        <Balance />
        <IncomeExpense />
        <TransactionList />
        <UpdateTransactions />
      </div>
    </GlobalProvider>
  );
}

export default App;
