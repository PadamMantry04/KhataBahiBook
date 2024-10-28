import React, { useContext } from 'react' // useContext hook needs to be imported behtmlFore use.
import { GlobalContext } from '../context/GlobalState' // Here we have imported our GlobalContext and all related things along with it.
import { Transaction } from './Transaction'

const TransactionList = () => {
    const {transactions} = useContext(GlobalContext);
    // Note that transactions is an array so we need to loop through it or even better, 
    // map through it, for eachtransaction that exists in the list, we need it to be displayed as a row in a transaction
    // Now we need to display how we need to display each transaction, basically create a new transaction component.
  return (
    <div>
        <h3>History</h3>
        <ul className="list">
        {transactions.map(transaction =>(<Transaction key={transaction.id} transaction={transaction} />))} 
        </ul>
    </div>
  )
}

export default TransactionList
