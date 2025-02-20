import React, { useContext, useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { AuthContext } from "../Provider/AuthProvider";
import TaskBoard from "../TaskBoard/TaskBoard";
import { ToastContainer, toast } from "react-toastify";
import Swal from "sweetalert2";
import { Link, NavLink } from "react-router-dom";
import { FaCheckCircle, FaClock, FaClipboardList } from "react-icons/fa";
import useTasks from "../Shared/useTasks";
import Tasks from "../Task/Tasks";
const Dashboard = () => {
  const { googleSignIn, logOut, user, setUser, loading } =
    useContext(AuthContext);


      const [tasks, setTasks] = useState([]);
    
      useEffect(() => {
        fetch("http://localhost:5000/tasks")
          .then((res) => res.json())
          .then((data) => {
            setTasks(data); 
          })
      }, []); 
  console.log(tasks);

  const todo = tasks.filter(task => task.category == 'todo');
  const progress = tasks.filter(task => task.category == 'progress');
  const done = tasks.filter(task => task.category == 'done');


  console.log(todo , 'todo');
  console.log(progress , 'progress');
  console.log(done , 'done');

  function loginUser() {
    googleSignIn()
      .then((result) => {
        console.log(result);
        setUser(result);
        Swal.fire({
          title: "Sign In!",
          icon: "success",
          draggable: true,
        });
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
        setUser(null);
        Swal.fire({
          title: "Sign Out Error",
          icon: "error",
          draggable: true,
        });
      });
  }
  function logOutUser() {
    logOut()
      .then((result) => {
        console.log(result);
        setUser(null);
        Swal.fire({
          title: "Sign Out!",
          icon: "success",
          draggable: true,
        });
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
        Swal.fire({
          title: "Sign Out Error",
          icon: "error",
          draggable: true,
        });
      });
  }

  return (
    // <div className="min-h-screen bg-gradient-to-r from-blue-500 to-pink-400 p-6">
    //   {/* Navbar */}
    //   {/* <div className="flex justify-between items-center bg-white shadow-md rounded-lg p-4">
    //     <h1 className="text-2xl font-bold text-gray-800">Task Manager</h1>
    //     <div className="flex items-center gap-3">
    //       <img
    //         src={user?.photoURL}
    //         alt="User"
    //         className="w-10 h-10 rounded-full border"
    //       />
    //       <p className="text-gray-700">{user?.displayName}</p>
    //       {user ? (
    //         <button
    //           onClick={() => logOutUser()}
    //           className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
    //         >
    //           Logout
    //         </button>
    //       ) : (
    //         <button
    //           onClick={() => loginUser()}
    //           className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
    //         >
    //           Log In
    //         </button>
    //       )}
    //     </div>
    //   </div> */}

    //   {/* Add Task Floating Button */}
    //   <Link to={'/dashboard/taskboard'}>
    //   <button className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700">
    //     <FaPlus size={20} />
    //   </button>
    //   </Link>

    // </div>

    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-pink-400 p-6">
      {/* Dashboard Title */}
      <h1 className="text-4xl font-extrabold text-white text-center mb-8">
        Task Management Dashboard
      </h1>

      {/* Task Board */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* To-Do Column */}
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
            <FaClipboardList className="text-blue-600" /> To-Do
          </h2>
          <div className="flex flex-col gap-2">
       {
           todo && todo.map(to => 
                <Tasks key={to._id} title={to.title} description={to.description} deadline={to.deadline} id={to._id}></Tasks>       
          )
          }
       </div>
        </div>


        {/* In Progress Column */}
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
            <FaClock className="text-yellow-500" /> In Progress
          </h2>
         <div>
         <div className="flex flex-col gap-2">
       {
           progress && progress.map(to => 
                <Tasks key={to._id} title={to.title} description={to.description} deadline={to.deadline} id={to._id}></Tasks>       
          )
          }
       </div>
         </div>
        </div>

        {/* Completed Column */}
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
            <FaCheckCircle className="text-green-500" /> Completed
          </h2>
          <div className="flex flex-col gap-2">
          {
           done && done.map(to => 
                <Tasks key={to._id} title={to.title} description={to.description} deadline={to.deadline} id={to._id}></Tasks>       
          )
          }
          </div>
        </div>
      </div>

      {/* Add Task Floating Button */}
      <Link to={"/dashboard/taskboard"}>
        <button className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 flex items-center gap-2">
          <FaPlus size={20} /> Add Task
        </button>
      </Link>
    </div>
  );
};

export default Dashboard;
