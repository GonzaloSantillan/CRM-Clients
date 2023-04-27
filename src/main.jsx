import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Layout from './components/Layout';
import Index, {loader as ClientsLoader} from './pages/Index';
import NewClient, {action as newClientAction, loader as loaderEdit} from './pages/NewClient';
import ErrorPage from './components/ErrorPage';
import { action as clienteDestroyAction} from './components/ClientRow';

const router = createBrowserRouter([
  {
    path:'/',
    element:<Layout/>,
    children:[
      {
        index:true,
        element:<Index/>,
        loader: ClientsLoader,
        errorElement: <ErrorPage/>
      },
      {
        path:'/client/new',
        element:<NewClient/>,
        action: newClientAction,
        errorElement: <ErrorPage/>
      },
      {
        path:'/client/:id/edit',
        element: <NewClient/>,
        loader:loaderEdit,
        action: newClientAction,
        errorElement: <ErrorPage/>
      },
      {
        path:'/client/:id/destroy',
        action:clienteDestroyAction
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
