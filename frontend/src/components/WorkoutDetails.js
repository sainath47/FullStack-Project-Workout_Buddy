import { useAuthContext } from "../hooks/useAuthContext";
import { useWorkoutsContext } from "../hooks/useWorkoutContext";



const WorkoutDetails = ({ workout }) => {
const {dispatch} = useWorkoutsContext()
const {user} = useAuthContext()


const handleClick = async ()=> {
  if(!user){
    return
  }

  const response = await fetch('/api/workouts/' + workout._id, {method: 'DELETE'},
  {
    headers: {
      'Authorization': `Bearer ${user.token}`
    }
  }
  )

  const json = await response.json()//this will return the document which is deleted & which will be filtered out from the data

  if(response.ok){
    dispatch({type:'DELETE_WORKOUT', payload: json.data})
  }
}
  return (
    <div className="workout-details">
      <h4>{workout.title}</h4>
      <p>
        <strong>Load (kg): </strong>
        {workout.load}
      </p>
      <p><strong>Number of reps: </strong>{workout.reps}</p>
      <p>{workout.createdAt}</p>
      <span onClick={handleClick}>delete</span>
    </div>
  );
};

export default WorkoutDetails;
