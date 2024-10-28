import React, {useState, useContext} from 'react'
import { GlobalContext } from '../context/GlobalState';


const UpdateTransactions = () => {
  const {addTransaction} = useContext(GlobalContext);
  const [text, setText] = useState('');
  const [amount, setAmount] = useState(0);
  const onSubmit = e =>{
    e.preventDefault();
    const newTransaction = {
      id: Math.floor(Math.random()*100000),
      text,
      amount: +amount
    }

    addTransaction(newTransaction)
  }
  // You you have basically created two states and two methods that do something when the states get updated.
  // the value inside useState is the default or the initial value of the state you start off with basically.
  return (
    <div>
      <h3>Add new transaction</h3>
      <form onSubmit={onSubmit}>
        <div className="form-control">
          <label htmlFor="text">Text</label>
          <input type="text" value={text} onChange={(e) => setText(e.target.value)} placeholder="Enter text..." />
        </div>
        <div className="htmlForm-control">
          <label htmlFor="amount"
            >Amount <br />
            (negative - expense, positive - income)</label>
          <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Enter amount..." />
        </div>
        <button className="btn">Add transaction</button>
      </form>
    </div>
  )
}
export default UpdateTransactions
