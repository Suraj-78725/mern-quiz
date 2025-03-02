import { useState } from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute'
import AppLayout from './Layout/AppLayout'
import Home from './pages/HomePage'
import Login from './pages/LoginPage'
import Register from './pages/RegisterPage'
import Dashboard from './pages/DashboardPage'
import Resultpage from './pages/Resultpage'
import ExplainationPage from './pages/ExplainationPage'
import CreateQuizPage from './pages/CreateQuizPage'
import AttemptQuizPage from './pages/AttemptQuizPage'
import "react-toastify/dist/ReactToastify.css"; 
import { ToastContainer, toast } from 'react-toastify';

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    //  errorElement: we can add this also
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/dashboard',
        element: <ProtectedRoute><Dashboard /></ProtectedRoute>
      },
      {
        path: '/result/:id',
        element: <Resultpage />
      },
      {
        path: '/explaination/:id',
        element: <ExplainationPage />
      },
      {
        path: '/create-quiz',
        element: <CreateQuizPage />
      },
      {
        path: '/attempt-quiz/:quizId',
        element: <AttemptQuizPage />
      },

    ]
  },
   {
    path: "/login",
    element: <Login />
  },
  {
    path: '/register',
    element: <Register />
  },
])



const App = () => {
  return (
    <>
    <RouterProvider router={router} />
    <ToastContainer />
    </>
  );
};

export default App;
