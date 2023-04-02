import { useAuthContext } from "./useAuthContext"
import { useWorkoutsContext } from "./useWorkoutContext"



export const useLogout = () => {

    const {dispatch} = useAuthContext()
    const {dispatch : workoutsDispatch} = useWorkoutsContext()
    const logout = () => {
        //remove user from storage
        localStorage.removeItem('user')
//dispatch logout action

dispatch({type: 'LOGOUT'})
workoutsDispatch({type: 'SET_WORKOUTS'})//as the previous person data is flashed for secound so //this part of dispatch

    }

    return {logout}
}