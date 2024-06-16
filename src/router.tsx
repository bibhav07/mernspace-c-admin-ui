import { createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/login/login";
import Dashboard from "./layouts/Dashboard";
import Nonauth from "./layouts/Nonauth";
import Root from "./layouts/Root";

export const router = createBrowserRouter([

    {
        path: '/',
        element: <Root />,
        children: [
    {
        path: '/',
        element: <Dashboard />,
        children : [
            {
                path: '',
                element: <HomePage />
            }
        ]
    },
    {
        path: '/auth/',
        element: <Nonauth />,
        children : [
            {
                path: 'login',
                element: <LoginPage />
            }
        ]
    }
]
},

])