import { useState } from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute'
import AppLayout from './Layout/AppLayout'
import Home from './pages/HomePage'
import Login from './pages/LoginPage'
import Register from './pages/RegisterPage'
import Dashboard from './pages/DashboardPage'
import Resultpage from './pages/Resultpage'
import ExplanationPage from './pages/ExplanationPage'
import CreateQuizPage from './pages/CreateQuizPage'
import AttemptQuizPage from './pages/AttemptQuizPage'
import Historypage from './pages/HistoryPage'
import LeaderBoardPage from './pages/LeaderBoardPage'
import "react-toastify/dist/ReactToastify.css"; 
import { ToastContainer, toast } from 'react-toastify';
import Edit from './pages/Edit'
import ProfilePage from './pages/ProfilePage'
import JoinQuizPage from './pages/JoinQuizPage'
import HomePage from './pages/HomePage'

const router = createBrowserRouter(
  [
    {
      element: <AppLayout />,
      children: [
        {
          path: '/dashboard',
          element: <ProtectedRoute><Dashboard /></ProtectedRoute>
        },
        {
          path:'/edit-quiz/:id',
          element:<Edit/>
        },
        {
          path: '/result/:id',
          element: <ProtectedRoute><Resultpage /></ProtectedRoute>
        },
        {
          path: '/leaderboard/:id',
          element: <ProtectedRoute><LeaderBoardPage /></ProtectedRoute>
        },
        {
          path: '/explanation',
          element: <ProtectedRoute><ExplanationPage /></ProtectedRoute>
        },
        {
          path: '/create-quiz',
          element: <ProtectedRoute><CreateQuizPage /></ProtectedRoute>
        },
        {
          path: '/history',
          element: <ProtectedRoute><Historypage /></ProtectedRoute>
        },
        {
          path: '/profile',
          element: <ProtectedRoute><ProfilePage/></ProtectedRoute>
        },
        {
          path: '/join-quiz',
          element: <ProtectedRoute><JoinQuizPage/></ProtectedRoute>
        },
      ]
    },
    {
      path: '/',
      element: <HomePage />
    },
    {
      path: "/login",
      element: <Login />
    },
    {
      path: '/register',
      element: <Register />
    },
    {
      path: '/attempt-quiz/:id',
      element: <ProtectedRoute><AttemptQuizPage /></ProtectedRoute>
    },
  ],
  {
    future: {
      v7_skipActionErrorRevalidation: true,
    }
  }
)



const App = () => {
  return (
    <>
    <RouterProvider router={router} />
    <ToastContainer />
    </>
  );
};

export default App;
