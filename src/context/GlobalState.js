import React, {createContext, useReducer} from 'react'
import AppReducer from './AppReducer'

const initialState = {
    transactions: [
  { id: 1, text: 'Flower', amount: -20 },
  { id: 2, text: 'Salary', amount: 300 },
  { id: 3, text: 'Book', amount: -10 },
  { id: 4, text: 'Camera', amount: 150 }]
}

// create Context
export const GlobalContext = createContext(initialState); // we create a global context using createContext and pass this to all and all the component that use the global component.

// now htmlFor all our componnents to have access to our store or to our updated state, we need to wrap all this in a provider

// Create Provider
export const GlobalProvider = ({children}) => {
    // since it is a wrapper for all those under it, we have to use props.children or directly destructurize it
    const [state, dispatch] = useReducer(AppReducer, initialState);
    // Provider: Provides a state, actions or other stuff to the components it is wrapper around.

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

    return (<GlobalContext.Provider value={{
        transactions : state.transactions, // this way we can access it from any component we request it from using useContext
        deleteTransaction,
        addTransaction
    }}>
    {children}
    </GlobalContext.Provider>); 
    // Now before we pull or use this GlobalContext in any component we want to initialize the AppReducer
    // AppReducer - is how we specify application state changes in response to certain changes to our store/context
    // AppReducer uses a switch function

    // for us to be able to use any action, we need to pass it to the global provider
} 