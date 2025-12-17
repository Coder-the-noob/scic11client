import { createBrowserRouter } from "react-router";
import RootLayout from "../components/RootLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import SearchDonors from "../pages/SearchDonors";
import DashBoardLayouts from "../layouts/DashBoardLayouts";
import DashboardHome from "../dashboard/DashboardHome";
import CreateDonationRequest from "../dashboard/donor/createDonationRequest";
import MyDonationRequests from "../dashboard/donor/MyDonationRequests";
import EditDonationRequest from "../dashboard/donor/EditDonationRequest";
import DonationDetails from "../dashboard/donor/DonationDetails";
import AllDonationRequests from "../dashboard/AllDonationRequests";
import ProtectedRoute from "./ProtectedRoute";
import AdminRoute from "./AdminRoute";
import AllUsers from "../dashboard/AllUsers";
import VolunteerRoute from "./VolunteerRoute";
import DonationRequests from "../pages/DonationRequests";
import Funding from "../dashboard/funding/Funding";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout></RootLayout>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/search-donors",
        element: <SearchDonors />,
      },
      {
        path: "/donation-requests",
        element: <DonationRequests />,
      }
    ],
  },

//   Dashboard path
  {
    path: "/dashboard",
    element: <ProtectedRoute><DashBoardLayouts /></ProtectedRoute>,
    children: [
        {
            index: true,
            element: <DashboardHome></DashboardHome>
        },
        {
            path: "create-donation-request",
            element: <CreateDonationRequest></CreateDonationRequest>   
        },
        {
            path:"my-donation-requests",
            element:<MyDonationRequests></MyDonationRequests>
        },
        {
            path:"edit-donation/:id",
            element: <EditDonationRequest></EditDonationRequest>
        },
        {
            path:"donation/:id",
            element: <DonationDetails></DonationDetails>
        },
        {
            path: "all-blood-donation-request",
            element: <VolunteerRoute><AllDonationRequests></AllDonationRequests></VolunteerRoute>
        },
        {
            path: "all-users",
            element: <AdminRoute><AllUsers></AllUsers></AdminRoute>
        },
        {
            path: "/dashboard/funding",
            element: <ProtectedRoute><Funding></Funding></ProtectedRoute>
        }
    ]
  }
]);

export default router;
