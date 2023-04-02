import { useContext } from "react"
import { WorkoutsContext } from "../context/WorkoutContext"


//here context is created out of workoutsContext & retruned with proper validation provided, thats it, we could have used workoutsContext directly instead of using this hook
export const useWorkoutsContext = ()=> {
    const context  = useContext(WorkoutsContext)

    if(!context ){
        throw Error('useWorkoutContext must be used inside an WorkoutsContextProvider')
    }

    return context
}