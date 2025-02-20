// import React, { useEffect, useState } from 'react'
// import useAxios from './useAxios'

// const useTasks = () => {
//     const axiosSecure = useAxios();

//   const [tasks , setTasks] = useState([]);
//   useEffect(()=>{
//    fetch('http://localhost:5000/tasks')
//    .then(res => res.json())
//    .then(data =>{
//      setTasks(data)
//     })
//   },[tasks])


//   return [tasks]
// }

// export default useTasks


import { useState, useEffect } from "react";
import useAxios from "./useAxios"; // Ensure correct import

const useTasks = () => {
  const axiosSecure = useAxios();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/tasks")
      .then((res) => res.json())
      .then((data) => {
        setTasks(data); // ✅ Correctly updating tasks
      })
      .catch((error) => console.error("Error fetching tasks:", error));
  }, []); 

  return [tasks];
};

export default useTasks;
