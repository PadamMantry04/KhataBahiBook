import React, {useContext} from 'react'
import { GlobalContext } from '../context/GlobalState';

export const Transaction = ({transaction}) => {
    const { deleteTransaction } = useContext(GlobalContext);
    let signClass = transaction.amount >= 0? "plus":"minus";
    let sign = transaction.amount >= 0? "+":"-";
  return (
    <div>
        <li className={signClass}>
          {transaction.text} <span>{sign}Rs. {Math.abs(transaction.amount)}</span><button onClick={() => deleteTransaction(transaction.id)} className="delete-btn">x</button>
        </li>
    </div>
  )
}
