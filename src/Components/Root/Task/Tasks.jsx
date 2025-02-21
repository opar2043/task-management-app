import React from "react";
import useTasks from "../Shared/useTasks";
import { FaCalendarAlt, FaEdit, FaTag, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import useAxios from "../Shared/useAxios";
import Swal from "sweetalert2";

const Tasks = ({ title, description, deadline, category, id }) => {
  const axiosSecure = useAxios();
  function handleDelete(tid) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/tasks/${tid}`).then((res) => {
          if (res.data.deletedCount > 0) {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: `This Task id Removed from Your Taske List`,
              showConfirmButton: false,
              timer: 1500,
            });
          }
        });
      }
    });
  }

  return (
    <div>
      <div className="bg-gradient-to-t from-blue-100 via-blue-200 to-blue-300 shadow-lg rounded-lg p-4 border-l-4 border-blue-600 hover:shadow-xl transition-all mt-2">
        <div className="flex justify-between">
          <div className="flex flex-col text-sm">
            <p className="text-slate-900 font-bold">Title</p>
            <p className="text-gray-700 font-semibold">{title}</p>
          </div>

          {/* Deadline */}
          <div className=" flex flex-col">
            <span className="font-bold text-blue-600 text-center">
              Due Date
            </span>
            <span className="flex items-center justify-center gap-1 mt-1 bg-white  rounded-full text-xs py-1 px-2 font-semibold">
              {" "}
              <FaCalendarAlt /> {deadline}
            </span>
          </div>
        </div>

        <div className="flex flex-col text-sm mt-2">
          <p className="text-slate-900 font-bold ">Description</p>
          <p className="text-gray-700 font-semibold">{description}</p>
        </div>

        {/* Category & Deadline */}
        <div className="flex justify-between items-center  text-sm text-gray-500 mt-4">
          {/* Category Badge */}
          <p className="flex items-center font-semibold justify-start gap-2 bg-blue-600 text-white px-3 py-1 rounded-full">
            <FaTag /> {category || "Uncategorized"}
          </p>

          <div className="flex justify-start gap-2 items-center  ">
            <Link to={`/dashboard/edit/${id}`}>
              <button className="btn btn-ghost rounded bg-blue-600 btn-xs text-white">
                <FaEdit></FaEdit> 
              </button>
            </Link>
            <button
              onClick={() => handleDelete(id)}
              className="btn btn-ghost text-white bg-red-500 rounded btn-xs "
            >
              <FaTrash></FaTrash> 
            </button>
          </div>
        </div>
      </div>
    </div>

  );
};

export default Tasks;
