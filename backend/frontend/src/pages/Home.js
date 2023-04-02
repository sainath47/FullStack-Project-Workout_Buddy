import { useEffect } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutContext";


//components
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";
import { useAuthContext } from "../hooks/useAuthContext";

function Home() {
  //   const [workouts, setWorkouts] = useState();
  const { workouts, dispatch } = useWorkoutsContext();

  const {user} =useAuthContext()
  //`workouts` state and `dispatch` function without having to pass them down through props.
  useEffect(
    () => {
      const fetchWorkouts = async () => {
        const response = await fetch("/api/workouts",{
          headers: {
            'Authorization': `Bearer ${user.token}`
          }
        }); //now since react wouldn't recognize this resource internally, so it will proxy the request to the local server//to get around with the cors error we can install the cors in backend of out node app & add the frontend server to it to all the cors

        const json = await response.json();
        // console.log(json,"json");
        if (response.ok) {
          // setWorkouts(json.data);
          dispatch({ type: "SET_WORKOUTS", payload: json.data });
        }
      };
if(user){
  fetchWorkouts();
}
      
    },
    [dispatch] //this is called dependency array
    //dipatch funciton is included in dependency array, the effect will run again if the dispatch fucntion update the `workouts` state, in the context
  );

  return (
    <div className="home">
      <div className="workouts">
        {workouts &&
          workouts.map((workout) => (
            <WorkoutDetails key={workout._id} workout={workout} />
          ))}
      </div>
      <WorkoutForm />
    </div>
  );
}

export default Home;
