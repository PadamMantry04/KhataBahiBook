import React, {useContext} from 'react'
import { GlobalContext } from '../context/GlobalState' 

const Balance = () => {
    const {transactions} = useContext(GlobalContext);
    // Now we need to build some logic based on how our balance is being computed.
    // sort of map type logic, like compute sum of all transaction amounts.
    const amounts = transactions.map(transaction => transaction.amount);
    const total = amounts.reduce((acc,item) => (acc+=item),0).toFixed(2);
  return (
    <>
        <h4>Your Balance</h4>
        <h1 id="balance">{total}</h1>
    </>
  )
}

export default Balance
