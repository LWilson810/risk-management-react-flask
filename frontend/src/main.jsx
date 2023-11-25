import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// Redux
import { Provider } from 'react-redux';
import { store } from './store';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './pages/home/Home';
import CurvaForward from './pages/CurvaForward/CurvaForward';
import ImportData from './pages/ImportacaoDeDados/ImportData';
import Signup from './pages/sign/sign-up';
import Signin from './pages/sign/sign-in';
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/dashboard",
        element: <Home />
      },
      {
        path: "/curva-forward",
        element: <CurvaForward />
      },
      {
        path: "/importacao-de-dados",
        element: <ImportData />
      },
    ]
  },
  {
    path: "/sign-in",
    element: <Signin />
  },
  {
    path: "/sign-up",
    element: <Signup/>
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);