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
import { closestCorners, DndContext, useSensors , useSensor } from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";

const Dashboard = () => {
  const { googleSignIn, logOut, user, setUser, loading } =
    useContext(AuthContext);

  const [etasks, setTasks] = useState([]);

  const tasks = etasks.filter((tas) => tas?.email === user?.email) || [];

  useEffect(() => {
    fetch("https://task-management-server-one-gamma.vercel.app/tasks")
      .then((res) => res.json())
      .then((data) => {
        setTasks(data);
      });
  }, []);
  // console.log(tasks , 'email');

  const todo = tasks.filter((task) => task.category == "todo") || [];
  const progress = tasks.filter((task) => task.category == "progress") || [];
  const done = tasks.filter((task) => task.category == "done") || [];


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


  // function handleDrug(event) {
  //   const { active, over } = event;

  //   if (!over) return; // If dropped outside, do nothing

  //   const draggedTaskId = active.id;
  //   const newCategory = over.id; // The column where the task was dropped

  //   // Find the task being moved
  //   const updatedTasks = tasks.map((task) =>
  //     task._id === draggedTaskId ? { ...task, category: newCategory } : task
  //   );
  //   setTasks(updatedTasks);


  //   // ✅ Optionally, update the backend with the new category
  //   fetch(`https://task-management-server-one-gamma.vercel.app/tasks/${draggedTaskId}`, {
  //     method: "PATCH",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ category: newCategory }),
  //   })
  //     .then((res) => res.json())
  //     .then(() => {
  //       toast.success("Task updated!");
  //     });
  // }

  function handleDrug(e){
      const {active , over} = e;
      if(!over){
        return
      }

      if(over._id == active._id){
        return
      }

      const orgIdx = active.category;
      const newIdx = over.category;

      const updatedTask = arrayMove(tasks , orgIdx , newIdx)
      setTasks(updatedTask);
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-pink-400 p-6">
      {/* Dashboard Title */}
      <h1 className="text-4xl font-extrabold text-white text-center mb-8">
        Task Management Dashboard
      </h1>

      <DndContext collisionDetection={closestCorners} onDragEnd={handleDrug}>
        {/* Task Board */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <SortableContext items={todo?.map((task) => task._id) || []}>
            {/* To-Do Column */}
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                <FaClipboardList className="text-blue-600" /> To-Do
              </h2>
              <div className="flex flex-col gap-2">
                {todo  && (
                  todo.map((to) => (
                    <Tasks
                      key={to._id}
                      title={to.title}
                      description={to.description}
                      deadline={to.deadline}
                      category={to.category}
                      id={to._id}
                    ></Tasks>
                  ))
                ) 
                }
              </div>
            </div>
          </SortableContext>

          <SortableContext items={todo?.map((task) => task._id) || []} onDragEnd={handleDrug}>
            {/* In Progress Column */}
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                <FaClock className="text-yellow-500" /> In Progress
              </h2>
              <div>
                <div className="flex flex-col gap-2">
                  {progress &&
                    progress.map((to) => (
                      <Tasks
                        key={to._id}
                        title={to.title}
                        description={to.description}
                        deadline={to.deadline}
                        category={to.category}
                        id={to._id}
                      ></Tasks>
                    ))}
                </div>
              </div>
            </div>
          </SortableContext>

          <SortableContext items={todo?.map((task) => task._id) || []} onDragEnd={handleDrug}>
            {/* Completed Column */}
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                <FaCheckCircle className="text-green-500" /> Completed
              </h2>
              <div className="flex flex-col gap-2">
                {done &&
                  done.map((to) => (
                    <Tasks
                      key={to._id}
                      title={to.title}
                      description={to.description}
                      deadline={to.deadline}
                      category={to.category}
                      id={to._id}
                    ></Tasks>
                  ))}
              </div>
            </div>
          </SortableContext>
        </div>
      </DndContext>

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


