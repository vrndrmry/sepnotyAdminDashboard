import './App.css';
import  React, { Component } from 'react'
import {Routes, Route} from 'react-router-dom'
import Layout from './Layout';
import HomeDashboard from './Components/HomeDashboard/HomeDashboard';
import Article from './Components/Article/Article';
import Blog from './Components/Blog/Blog';
import Report from './Components/Report/Report';
import Project from './Components/Projects/Project';
import Event from './Components/EventsAndWorkshop/Event';
import Response from './Components/ResponseReceived/Response';
import User from './Components/UserLogin/UserLogin';
import Error from './Components/Error/Error';
import Login from './Components/Login/Login';
import UserLogin from './Components/UserLogin/UserLogin';
import { UserContextProvider } from './Context/userContext';
import UserData from './Components/UserData/UserData';
function App() {
  return (
    <div className="adminDashboard">
      <UserContextProvider>
        <Routes>
          <Route path="/" element={<UserLogin />}></Route>
          <Route path="/:userId/dashboard" element={<Layout />}>
            <Route
              path="/:userId/dashboard"
              element={<HomeDashboard />}
              className="normalRouteElement"
            ></Route>
            <Route
              path="/:userId/dashboard/article"
              element={<Article />}
            ></Route>
            <Route path="/:userId/dashboard/blog" element={<Blog />}></Route>
            <Route path="/:userId/dashboard/blog" element={<Blog />}></Route>
            <Route path="/:userId/dashboard/career" element={<Blog />}></Route>
            <Route
              path="/:userId/dashboard/report"
              element={<Report />}
            ></Route>
            <Route
              path="/:userId/dashboard/project"
              element={<Project />}
            ></Route>
            <Route path="/:userId/dashboard/event" element={<Event />}></Route>
            <Route
              path="/:userId/dashboard/response"
              element={<Response />}
            ></Route>
            <Route path="/:userId/dashboard/users" element={<UserData/>}></Route>
            <Route path="/:userId/dashboard/*" element={<Error />}></Route>
          </Route>
          <Route path="/*" element={<Error />}></Route>
        </Routes>
      </UserContextProvider>
    </div>
  );
}

export default App;
