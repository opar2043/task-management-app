// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import useAxios from "../Shared/useAxios";
// import Swal from "sweetalert2";

// const TaskEdit = () => {
//   const { id } = useParams();
//   console.log(id);

//   const [tasks, setTasks] = useState([]);
//   const [deadline , setDeadline] = useState(null);
//   const [category , setCategory] = useState(null);

//   useEffect(() => {
//     fetch("http://localhost:5000/tasks")
//       .then((res) => res.json())
//       .then((data) => {
//         setTasks(data);
//       });
//   }, []);
//   const newTask = tasks.find((task) => task._id == id);

// //   const { title, description, deadline, category } = newTask;

//   const axiosSecure = useAxios();

//   function handleSubmit(e) {
//     e.preventDefault();

//     const title = e.target.title.value;
//     const description = e.target.description.value;

//     const nameValue = {
//       title,
//       description,
//       deadline,
//       category,
//     };


//     axiosSecure.patch(`/tasks/${id}`, nameValue).then((res) => {
//         console.log(res.data);
//         Swal.fire({
//           position: "top-end",
//           icon: "success",
//           title: `Task is Updated Successfully`,
//           showConfirmButton: false,
//           timer: 1000,
//         });
//     )}

//           // Update the task in local state after successful update
//           setTasks((prevTasks) =>
//             prevTasks.map((task) =>
//               task._id === id ? { ...task, ...nameValue } : task
//             )
//           );


//     e.target.reset();
//     console.table(nameValue);
//   }
//   return (
//     <div>
//       <div className="flex justify-center items-center min-h-screen  p-6 bg-gradient-to-r from-teal-500 to-green-400">
//         <div className="bg-white/20 backdrop-blur-lg p-6 rounded-xl shadow-xl w-full max-w-lg">
//           <h2 className="text-3xl font-bold text-white text-center mb-6">
//            Update Your Task
//           </h2>

//           <form className="space-y-5" onSubmit={handleSubmit}>
//             {/* Title Input */}
//             <div>
//               <label className="block text-white font-medium text-lg">
//                 Title
//               </label>
//               <input
//                 type="text"
//                 maxLength={50}
//                 name="title"
//                 required
//                 defaultValue={newTask?.title}
//                 className="w-full p-3 rounded-lg bg-white/30 text-white placeholder-white border-none outline-none"
//                 placeholder="Enter task title..."
//               />
//             </div>

//             <div className="flex flex-col gap-2 md:flex-row items-center justify-center">
//               {/* DeadLine Input */}
//               <div className="flex-1 w-full">
//                 <label className="block text-white font-medium text-lg">
//                   Dead Line
//                 </label>
//                 {newTask?.deadline && (
//                   <input
//                     type="date"
//                     onChange={(e) => setDeadline(e.target.value)}
//                     required
//                     defaultValue={newTask?.deadline}
//                     className="w-full p-3 rounded-lg bg-white/30 text-white placeholder-white border-none outline-none"
//                     placeholder="Enter task Date..."
//                   />
//                 )}
//               </div>

//               {/* Category Dropdown */}
//               <div className="flex-1 w-full">
//                 <label className="block text-white font-medium text-lg">
//                   Category
//                 </label>
//                 {newTask?.category && (
//                   <select
//                     onChange={(e) => setCategory(e.target.value)}
//                     defaultValue={newTask?.category}
//                     className="w-full p-3 rounded-lg bg-white/30 text-white border-none outline-none"
//                   >
//                     <option value="todo" className="text-black">
//                       To-Do
//                     </option>
//                     <option value="progress" className="text-black">
//                       In Progress
//                     </option>
//                     <option value="done" className="text-black">
//                       Done
//                     </option>
//                   </select>
//                 )}
//               </div>
//             </div>

//             {/* Description Input */}
//             <div>
//               <label className="block text-white font-medium text-lg">
//                 Description
//               </label>
//               <textarea
//                 maxLength={300}
//                 defaultValue={newTask?.description}
//                 name="description"
//                 className="w-full h-36 p-3 rounded-lg bg-white/30 text-white placeholder-white border-none outline-none"
//                 placeholder="Enter task description (optional)..."
//               ></textarea>
//             </div>

//             {/* Submit Button */}
//             <button
//               type="submit"
//               className="w-full py-3 bg-pink-400 text-white font-semibold rounded-lg text-lg hover:text-black hover:bg-white/60 transition"
//             >
//               Add Task
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TaskEdit;






import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAxios from "../Shared/useAxios";
import Swal from "sweetalert2";

const TaskEdit = () => {
  const { id } = useParams();
  console.log(id);

  const [tasks, setTasks] = useState([]);
  const [deadline, setDeadline] = useState(null);
  const [category, setCategory] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/tasks")
      .then((res) => res.json())
      .then((data) => {
        setTasks(data);
      });
  }, []);

  const newTask = tasks.find((task) => task._id == id);

  const axiosSecure = useAxios();

  function handleSubmit(e) {
    e.preventDefault();

    const title = e.target.title.value;
    const description = e.target.description.value;

    const nameValue = {
      title,
      description,
      deadline,
      category,
    };

    axiosSecure.patch(`/tasks/${id}`, nameValue).then((res) => {
      console.log(res.data);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: `Task is Updated Successfully`,
        showConfirmButton: false,
        timer: 1000,
      });

      // Update the task in local state after successful update
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === id ? { ...task, ...nameValue } : task
        )
      );
    });

    e.target.reset();
    console.table(nameValue);
  }

  return (
    <div>
      <div className="flex justify-center items-center min-h-screen p-6 bg-gradient-to-r from-teal-500 to-green-400">
        <div className="bg-white/20 backdrop-blur-lg p-6 rounded-xl shadow-xl w-full max-w-lg">
          <h2 className="text-3xl font-bold text-white text-center mb-6">
            Update Your Task
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
                defaultValue={newTask?.title}
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
                {newTask?.deadline && (
                  <input
                    type="date"
                    onChange={(e) => setDeadline(e.target.value)}
                    required
                    defaultValue={newTask?.deadline}
                    className="w-full p-3 rounded-lg bg-white/30 text-white placeholder-white border-none outline-none"
                    placeholder="Enter task Date..."
                  />
                )}
              </div>

              {/* Category Dropdown */}
              <div className="flex-1 w-full">
                <label className="block text-white font-medium text-lg">
                  Category
                </label>
                {newTask?.category && (
                  <select
                    onChange={(e) => setCategory(e.target.value)}
                    defaultValue={newTask?.category}
                    className="w-full p-3 rounded-lg bg-white/30 text-white border-none outline-none"
                  >
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
                )}
              </div>
            </div>

            {/* Description Input */}
            <div>
              <label className="block text-white font-medium text-lg">
                Description
              </label>
              <textarea
                maxLength={300}
                defaultValue={newTask?.description}
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
              Update Task
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TaskEdit;
