import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider, BrowserRouter } from 'react-router-dom';
import store from './store.js';
import { Provider } from 'react-redux';
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import HomePage from './pages/HomePage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';
import AdminLoginPage from './pages/AdminLoginPage.jsx';
import AdminHome from './pages/AdminHome.jsx';
import CreateUser from './pages/CreateUser.jsx';
import EditUser from './pages/EditUser.jsx';


const router = createBrowserRouter(
  createRoutesFromElements(

    <Route path='/' element={<App />}>
      <Route index={true} path='/' element={<HomePage />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/register' element={<RegisterPage />} />
      <Route path='' element={<PrivateRoute />}>
        <Route path='/profile' element={<ProfilePage />} />
      </Route>
      <Route path='/admin' element={<AdminHome />} />
      <Route path='/admin/login' element={<AdminLoginPage />} />
      <Route path='/admin/user' element={<CreateUser />} />
      <Route path='/admin/user/edit' element={<EditUser />} />

    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>,
  </Provider>
)
