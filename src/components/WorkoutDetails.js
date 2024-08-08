

import { useState } from 'react';
import  {useWorkoutsContext} from '../hooks/useWorkoutsContext'

//date fns 
import formatDistanceToNow from  'date-fns/formatDistanceToNow'

const WorkoutDetails = ({ workout }) => {
  const { dispatch } = useWorkoutsContext();
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(workout.title);
  const [load, setLoad] = useState(workout.load);
  const [reps, setReps] = useState(workout.reps);
 
  const handleClick = async() => {
    const response = await fetch('/workouts/'+ workout._id,{
      method: 'DELETE'
    })
    const json = await response.json()

    if(response.ok){
      dispatch({type: 'DELETE_WORKOUT',payload: json})
    }
  
  };

  const handleUpdate  = async (e) => {
    e.preventDefault();
    const updateWorkout = {title, load, reps};
    const response = await fetch('/workouts/'+ workout._id, {
      method: "PATCH",
      body: JSON.stringify(updateWorkout),
      headers:{
        'Content-Type': 'application/json'
      }

    });
    const json = await response.json();

    if(response.okj){
      dispatch({type: 'UPDATE_WORKOUT',payload: json});
      setIsEditing(false);
    }
  };
 
  return (
    <div className="workout-details">
      {isEditing ? (
        <form onSubmit={handleUpdate}>
          <input
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />

        <input
            type="number"
            onChange={(e) => setLoad(e.target.value)}
            value={load}
          />
        
        <input
            type="number"
            onChange={(e) => setReps(e.target.value)}
            value={reps}
          />

          <button type="submit">update Workout</button>
        </form>
      ):(
        <>
        <div className="workout-details">
      <h4>{workout.title}</h4>
      <p><strong>Load (kg):</strong> {workout.load}</p>
      <p><strong>Reps:</strong> {workout.reps}</p>
      <p>{formatDistanceToNow(new Date(workout.createdAt), {addSuffix: true})}</p>
      <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
      <span className="material-symbols-outlined" onClick={() => setIsEditing(true)}>edit</span>
     </div>
      </>
      )}
    </div>
  );
}

export default WorkoutDetails;