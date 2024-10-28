// The app reducer should at least return a function that takes two inputs, the current state and the action on which it should trigger.
export default (state, action) => {
    // the action.type is like an id
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
}

// Note we cannot just change our state, we have to update our state and sent a new state.