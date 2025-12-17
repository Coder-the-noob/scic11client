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
    ],
  },

//   Dashboard path
  {
    path: "/dashboard",
    element: <DashBoardLayouts></DashBoardLayouts>,
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
            element: <AllDonationRequests></AllDonationRequests>
        }
    ]
  }
]);

export default router;
