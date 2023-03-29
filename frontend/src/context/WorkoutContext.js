import {createContext, useReducer} from 'react'

export const WorkoutsContext = createContext()
/*
This code is an example of how to use the React Context API in conjunction with the `useReducer` hook to manage global state in a React application.

First, we create a new context using the `createContext()` function from React, and export it as `WorkoutsContext`. This context will be used to share data between components that are not directly connected in the component tree.

Next, we define a reducer function called `workoutsReducer`. This function takes two arguments: `state` and `action`. The `state` argument represents the current state of the application, and the `action` argument represents the change that we want to make to that state.

The reducer function uses a `switch` statement to determine which action to take based on the `type` property of the `action` object. In this case, there are three possible actions: `SET_WORKOUTS`, `CREATE_WORKOUT`, and `DELETE_WORKOUT`.

//the below line should be re-written
when the `SET_WORKOUTS` action is dispatched, the reducer returns a "new state object" with a `workouts` property that is set to the value of the `payload` property of the `action` object.

when simillarly `CREATE_WORKOUT` is dispatched then it returns new object of state which includes the new workout object included to older state


After defining the reducer function, we create a new component called `WorkoutsContextProvider` that wraps its children with the `WorkoutsContext.Provider` component. This component provides the `workouts` state and `dispatch` function to all of its descendants using the `value` prop.
**/
export const workoutsReducer = (state,action)=>{
switch(action.type){
    case'SET_WORKOUTS':
    return {
        workouts: action.payload
    }
    case 'CREATE_WORKOUT':
        return{
            workouts: [action.payload, ...state.workouts]
        }

    case 'DELETE_WORKOUT':
        return {
            workouts: state.workouts.filter(w=> w._id !== action.payload._id)
        }    
        default : return state
}
}

export const WorkoutsContextProvider = ({children})=>{
const [state, dispatch] = useReducer(workoutsReducer,{
    workouts: null
})//Finally, we use the `useReducer` hook to initialize the state of the `WorkoutsContextProvider` component with the `workoutsReducer` function and an initial state object with a `workouts` property set to `null`.

//To dispatch actions to the `workoutsReducer` function, we can access the `dispatch` function from the `WorkoutsContext` object in any descendant component that is wrapped by the `WorkoutsContextProvider`.

// dispatch({type:'SET_WORKOUTS', payload:[{},{}]})
            //value object is being passed as a prop to the WorkoutsContext.Provider component, which is then making it available as a context for all the child components that are wrapped inside it.When using the Context.Provider component in React, the value prop is used to pass data down to all the components that are consuming that context. In your code snippet, the value object is being spread into two separate objects: state and dispatch.

//The state object contains the current state of the context and is made available to all the child components that are consuming the context. The dispatch object contains functions that allow child components to update the state of the context.

//So in summary, you can think of the value prop as being similar to props that are passed down from a parent component to its children, but in this case, they are being passed down to all the child components that are consuming the context.
    return(
        <WorkoutsContext.Provider value={{...state, dispatch}}>

{children}
        </WorkoutsContext.Provider>

    )
}