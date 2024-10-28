# Expense Tracker:

- This markdown file shall contain all relevant notes related to the React Project - expense tracker.

- Whenever you are building any new project, try to break the UI into as many components as possible.

- Except for the header, which is in a separate component, all other components are in a separate container.

- Initially we have just made the balance component with static values but it shall be replaced with the dynamic value of the balance which shall in turn be evaluated by some other function.

- Update: Currently I have made components using the given static HTML based code and integrated these components in my React App.
 
- Next step: think, konsi chize change/update ho sakti h and define a state for them.

- In the previous static HTML based code, the ids were initially used for DOM manipulation so you can get rid of them.

## Global Context:

- we create a global context using createContext and pass this to all and all the component that use the global component.

- Provider: Provides a state, actions or other stuff to the components it is wrapper around.

- now for all our componnents to have access to our store or to our updated state, we need to wrap all this in a provider  (it can be of two types, Provider & Consumer)

- since it is a wrapper for all those under it, we have to pass props.children or directly destructurize it i.e 

        export const GlobalProvider = ({children}) => {}
        OR 
        export const GlobalProvider = (props.children) => {}

- this way we can access it from any component we request it from using useContext

- The code included in the return segment of the GlobalContext is accessible to all components that access it. Here we have made some things common, such as the transaction list and two functions, which are to Add/Delete Transactions.

        return (<GlobalContext.Provider value={{
            transactions : state.transactions, 
            deleteTransaction,
            addTransaction
        }}>
        {children}
        </GlobalContext.Provider>); 

#### How to use Global Context?

You can use GlobalContext by importing the Context created in the GlobalState.
We have to make use of useContext hook from react:

        import { GlobalContext } from '../context/GlobalState'; (in the Header)
        const { <whatever you need from GlobalContext> } = useContext(GlobalContext); (in the program code)

## Update Transactions:

- We create two states, to update the value of the transaction amount and the transaction text.

        const [text, setText] = useState('');
        const [amount, setAmount] = useState(0);

- You you have basically created two states and two methods that do something when the states get updated.
- The value inside useState is the default or the initial value of the state you start off with basically.

#### Understand Form Handling:

        <input type="text" value={text} onChange={(e) => setText(e.target.value)} placeholder="Enter text..." />

- Note: **Whenever using forms and using the value from the form to update state, set the value as the state and an updateState function as the onChange method.**

## Transaction List:

- Note, since we have created a global context, we can use it using useContext to access transactions defined in the GlobalState file.

- In the transaction list component, we need to render all the transactions added.

- So, think of it as we are having an array of transactions and all need to rendered individually (one after another).

- This gives us of an intuition such as:
- Note that transactions is an array so we need to loop through it or even better, 
- map through it, for eachtransaction that exists in the list, we need it to be displayed as a row in a transaction
- Now we need to display how we need to display each transaction, basically create a new transaction component.

#### Parent Child Relationship in Transaction List:

- So, what we do is we create a template component (a model basically) and for each new transaction, create a new component using the blueprint and pass the parametres as props from the Parent->Child component.

        {transactions.map(transaction =>(<Transaction key={transaction.id} transaction={transaction} />))} 

#### Transaction: Logic

- We have tried to make everything dynamic to avoid need for any hard-coding. 

- For the sign and the color of the transaction, we have utilized ternary operator, and used transaction.amount for condition verification.

        let signClass = transaction.amount >= 0? "plus":"minus";
        let sign = transaction.amount >= 0? "+":"-";

- This assigns class conditionally and the class assigned, adds the relevant CSS accordingly.

## Balance:

- One key concern was to make Balance dynamic, to get updated when transations are added/deleted.

- For that we have to use some kind of accumulation logic on the transaction amounts available.

- We accumulate transaction amounts in an array using map, we then apply reduce operator to accumulate the sum.

        const amounts = transactions.map(transaction => transaction.amount);
        const total = amounts.reduce((acc,item) => (acc+=item),0).toFixed(2);


## Income-Expenses:

- Using similar logic, we made the income and the expenses segment dynamic too:

        const amounts = transactions.map(transaction => transaction.amount);

        const income = amounts
        .filter(item => item>0)
        .reduce((acc,item) => (acc+=item),0)
        .toFixed(2);

        const expense = amounts
        .filter(item => item<0)
        .reduce((acc,item) => (acc+=item),0)
        .toFixed(2);

- For income, +ve amounts were filtered. For expense, -ve amounts were filtered.

## Adding Functionality:

- Now, lets discuss the use of AppReducer.

- AppReducer - is how we specify application state changes in response to certain changes to our store/context

- AppReducer is defined in a separate file in the context folder itself.

- AppReducer uses a switch function

- const [state, dispatch] = useReducer(AppReducer, initialState); 

- useReducer returns an array with exactly two values:

        - The current state. During the first render, it’s set to init(initialArg) or initialArg (if there’s no init).
        - The dispatch function that lets you update the state to a different value and trigger a re-render.

- In the AppReducer, define the actions and how do you want the state to get updated if they are triggered. Also define a base case (default)

- The app reducer should at least return a function that takes two inputs, the current state and the action on which it should trigger.

        switch(action.type){
            case 'DELETE_TRANSACTION':
                return {
                    ...state,
                    transactions: state.transactions.filter(transaction => transaction.id!==action.payload)
                }
            case 'ADD_TRANSACTION':
                return {
                    ...state,
                    transactions: [ ...state.transactions , action.payload]
                }
            default: // this is the base case in switch
                return state;
        }

- the delete transaction filters only the transaction whose id is passed for delete operation.

- the add transaction adds the transaction to the existing list of transactions.

        function deleteTransaction(id){
            dispatch({
                type:'DELETE_TRANSACTION',
                payload:id
            });
        }

        function addTransaction(transaction){
            dispatch({
                type:'ADD_TRANSACTION',
                payload:transaction
            });
        }

- these functions are defined in the GlobalState, to call to the AppReducer.

- the dispatch contains the action to trigger upon along with the payload (parametres) to pass along.

<p align=center>...</p>

<h1><p align=center>Thanks</p></h1>
