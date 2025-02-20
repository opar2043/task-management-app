import { useState } from "react";
import { Outlet } from "react-router-dom";
import useAxios from "../Shared/useAxios";
import Swal from "sweetalert2";

const TaskBoard = () => {

  const [deadline , setDeadline] = useState(null);
  const [category , setCategory] = useState(null);
  const axiosSecure = useAxios();

  function handleSubmit(e){
    e.preventDefault();

    const title = e.target.title.value;
    const description = e.target.description.value;

    const nameValue = {
      title,
      description ,
      deadline ,
      category
    }

    axiosSecure.post('/tasks', nameValue)
    .then(res => {
      // console.log(res.data);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: `Task is Added Successfully `,
        showConfirmButton: false,
        timer: 1000,
      });
    })



    e.target.reset()
    console.table(nameValue);
  }

  return (

    <div className="flex justify-center items-center min-h-screen  p-6 bg-gradient-to-r from-blue-500 to-pink-400">
      <div className="bg-white/20 backdrop-blur-lg p-6 rounded-xl shadow-xl w-full max-w-lg">
        <h2 className="text-3xl font-bold text-white text-center mb-6">
          Add New Task
        </h2>

        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Title Input */}
          <div>
            <label className="block text-white font-medium text-lg">
              Title
            </label>
            <input
              type="text"
              maxLength={50}
              name="title"
              required
              className="w-full p-3 rounded-lg bg-white/30 text-white placeholder-white border-none outline-none"
              placeholder="Enter task title..."
            />
          </div>

          <div className="flex flex-col gap-2 md:flex-row items-center justify-center">
            {/* DeadLine Input */}
            <div className="flex-1 w-full">
              <label className="block text-white font-medium text-lg">
                Dead Line
              </label>
              <input
                type="date"
                onChange={(e)=>setDeadline(e.target.value)}
                required
                className="w-full p-3 rounded-lg bg-white/30 text-white placeholder-white border-none outline-none"
                placeholder="Enter task Date..."
              />
            </div>

            {/* Category Dropdown */}
            <div className="flex-1 w-full">
              <label className="block text-white font-medium text-lg">
                Category
              </label>
              <select onChange={(e)=>setCategory(e.target.value)} className="w-full p-3 rounded-lg bg-white/30 text-white border-none outline-none">
                <option value="todo" className="text-black">
                  To-Do
                </option>
                <option value="progress" className="text-black">
                  In Progress
                </option>
                <option value="done" className="text-black">
                  Done
                </option>
              </select>
            </div>
          </div>

          {/* Description Input */}
          <div>
            <label className="block text-white font-medium text-lg">
              Description
            </label>
            <textarea
              maxLength={300}
              
              name="description"
              className="w-full h-36 p-3 rounded-lg bg-white/30 text-white placeholder-white border-none outline-none"
              placeholder="Enter task description (optional)..."
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-pink-400 text-white font-semibold rounded-lg text-lg hover:text-black hover:bg-white/60 transition"
          >
            Add Task
          </button>
        </form>
      </div>

      <div>
        <Outlet></Outlet>
      </div>
    </div>


  );
};

export default TaskBoard;
