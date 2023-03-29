import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useWorkoutsContext } from "../hooks/useWorkoutContext";

const WorkoutForm = () => {
  const { dispatch } = useWorkoutsContext();
  const [title, setTitle] = useState("");
  const [load, setLoad] = useState("");
  const [reps, setReps] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);
  const {user} = useAuthContext()



  const handleSubmit = async (e) => {
    e.preventDefault();

if(!user) {
  setError('YOu must be logged in')
  return
}

    const workout = { title, load, reps };

    const response = await fetch("api/workouts", {
      method: "POST",
      body: JSON.stringify(workout),
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${user.token}`
      },
    })
    const json = await response.json(); // This line uses the json() method of the response object to parse the response body as JSON data.
    if (!response.ok) {
      setError(json.msg)
      setEmptyFields(json.emptyFields)

    } else if (response.ok) {
      setEmptyFields([])
      setTitle("");
      setLoad("");
      setReps("");
      setError(null);
      dispatch({type: 'CREATE_WORKOUT', payload: json.data})
      console.log("new workout added", json);
    }
  };
  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New Workout</h3>
      <label>Exersize Title:</label>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className={emptyFields.includes('title') ? 'error' : ''}
      />

      <label>Reps:</label>
      <input
        type="number"
        onChange={(e) => setLoad(e.target.value)}
        value={load}
        className= {emptyFields.includes('reps') ? 'error' : ""}
      />
      <label>Load (in Kg)</label>
      <input
        type="number"
        onChange={(e) => setReps(e.target.value)}
        value={reps}
        className= {emptyFields.includes('load') ? 'error' : ''}
      />

      <button>Add Workout</button>
      {error && <div className="error">{error}</div>}

    </form>
  );
};

export default WorkoutForm;
