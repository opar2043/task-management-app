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
      <div className=" shadow-lg rounded-lg p-4 border-l-4 border-blue-500 hover:shadow-xl transition-all bg-blue-200 mt-2">
        {/* Title */}
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800">{title}</h2>
          <button
            onClick={() => handleDelete(id)}
            className="btn btn-ghost text-white bg-red-500 rounded btn-xs "
          >
            <FaTrash></FaTrash>
          </button>
        </div>

        {/* Description */}
        <div className="flex justify-between mt-3 items-center">
          <p className="text-gray-600 mt-2">{description}</p>

          <Link to={`/dashboard/edit/${id}`}>
            <button className="btn btn-ghost rounded bg-blue-600 btn-xs text-white">
              <FaEdit></FaEdit>
            </button>
          </Link>
        </div>

        {/* Category & Deadline */}
        <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
          {/* Category Badge */}
          <span className="flex items-center gap-2 bg-blue-100 text-blue-600 px-3 py-1 rounded-full">
            <FaTag /> {category || "Uncategorized"}
          </span>

          {/* Deadline */}
          <div className=" flex flex-col">
            <span className="font-semibold text-blue-600 text-center">Due Date</span>
           <span className="flex items-center justify-center gap-1 mt-1 bg-gray-200 rounded-full text-xs p-1 font-semibold"> <FaCalendarAlt /> {deadline}</span>
          </div>
        </div>
        {/* <div></div> */}
      </div>
    </div>
  );
};

export default Tasks;
