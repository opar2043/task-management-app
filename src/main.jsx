import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import AuthProvider from './Components/Root/Provider/AuthProvider.jsx';
import Root from './Components/Root/Root.jsx';
import Error from './Components/Root/Error.jsx';
import Dashboard from './Components/Root/Dashboard/Dashboard.jsx';
import Tasks from './Components/Root/Task/Tasks.jsx';
import TaskBoard from './Components/Root/TaskBoard/TaskBoard.jsx';
import TaskEdit from './Components/Root/TaskBoard/TaskEdit.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <Error></Error>,
  },
  {
    path: "/dashboard",
    element: <Dashboard></Dashboard>,
    children: [
      {
        path: "/dashboard/task",
        element: <Tasks></Tasks>
      },
    ]
  },
  {
    path: "/dashboard/taskboard",
    element: <TaskBoard></TaskBoard>
  },
  {
    path: "/dashboard/edit/:id",
    element: <TaskEdit></TaskEdit> 
    
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
