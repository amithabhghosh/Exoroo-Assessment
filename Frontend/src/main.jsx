import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { MainPage } from './pages/MainPage.jsx';
import { AddpostPAge } from './pages/AddpostPAge.jsx';
import { ToastContainer } from 'react-toastify';
const router = createBrowserRouter([
{
  path:"/",element:<MainPage/>
},
{path:"/addpost",element:<AddpostPAge/>}
])


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
   
    <RouterProvider router={router}/>
  </StrictMode>,
)
