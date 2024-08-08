import { useEffect } from "react";
import axios from "axios";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";

// Components
import WorkoutDetails from '../components/WorkoutDetails';
import WorkoutForm from "../components/WorkoutForm";

const Home = () => {
  const { workouts, dispatch } = useWorkoutsContext();

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await axios.get('/workouts/getall');
        console.log(response);
        const json = response.data;

        if (response.status === 200) {
          dispatch({ type: 'SET_WORKOUTS', payload: json });
        }
      } catch (error) {
        console.error("Failed to fetch workouts", error);
      }
    };

    fetchWorkouts(); 
  }, [dispatch]);

  return (
    <div className="home">
      <div className="workouts">
        {workouts && workouts.map((workout) => (
          <WorkoutDetails key={workout._id} workout={workout} />
        ))}
      </div>
      <WorkoutForm />
    </div>
  );
}

export default Home;