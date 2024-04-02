import { createBrowserRouter, useNavigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Bookings from "./pages/Bookings";
import Cabins from "./pages/Cabins";
import Users from "./pages/Users";
import Settings from "./pages/Settings";
import Account from "./pages/Account";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./ui/AppLayout";
import { useEffect } from "react";

const DashboardRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/dashboard");
  }, [navigate]);

  return null;
};

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <PageNotFound />,
    children: [
      {
        path: "",
        element: <DashboardRedirect />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/bookings",
        element: <Bookings />,
      },
      {
        path: "/cabins",
        element: <Cabins />,
      },
      {
        path: "/users",
        element: <Users />,
      },
      {
        path: "/settings",
        element: <Settings />,
      },
      {
        path: "/account",
        element: <Account />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
]);

export default router;
