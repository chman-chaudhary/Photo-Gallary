import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { CookiesProvider } from 'react-cookie';
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './app/store.js'
import Home from './components/Home.jsx';
import Login from './components/Login.jsx';
import Signup from './components/Signup.jsx';
import Photo from './components/Photo.jsx';
import PhotoForm from './components/PhotoForm.jsx';

const router = createBrowserRouter([ // create routes for app
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/home",
    element: <Home />
  },
  {
    path: "/photo/:id",
    element: <Photo />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/signup",
    element: <Signup />
  },
  {
    path: "/upload",
    element: <PhotoForm />
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <CookiesProvider>
      <RouterProvider router={router}>
        <App />
      </RouterProvider>
    </CookiesProvider>
  </Provider>
)
