import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import { App } from "../App";
import VerifyEmail from "../pages/VerifyEmail";
import UserProfile from "../pages/UserProfile";
import Register from "../pages/Register";
import ForgotPassword from "../pages/forgotPassword";
import Contact from "../pages/Contact";
import About from "../pages/About";


const routes = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "",
                element: <Home />
            },
            {
                path : "/login",
                element: <Login />
            },
            {
                path : "/verify-email",
                element : <VerifyEmail />
            },
            {
                path : "/user-profile",
                element : <UserProfile />
            },
            {
                path : "/register",
                element : <Register />
            },
            {
                path : "/forgot-password",
                element : <ForgotPassword />
            },
            {
                path : "/contact",
                element : <Contact />
            },
            {
                path : "/about",
                element : <About />
            }
        ]
    }
])

export default routes;