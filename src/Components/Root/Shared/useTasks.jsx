import { useState, useEffect } from "react";
import useAxios from "./useAxios"; // Ensure correct import

const useTasks = () => {
  const axiosSecure = useAxios();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch("https://task-management-server-one-gamma.vercel.app/tasks")
      .then((res) => res.json())
      .then((data) => {
        setTasks(data); // ✅ Correctly updating tasks
      })
      .catch((error) => console.error("Error fetching tasks:", error));
  }, []); 

  return [tasks];
};

export default useTasks;
