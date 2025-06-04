import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App.jsx";
import Index from "./pages/index.jsx";
import Auth from "./pages/Auth.jsx";
import Allproducts from "./pages/Allproducts.jsx";
import Productdetails from "./pages/Productdetails.jsx";
import Index_Profile from "./pages/profiles/index.jsx";
import Carts from "./pages/profiles/Carts.jsx";
import Profile from "./pages/profiles/Profile.jsx";
import Purchases from "./pages/profiles/Purchases.jsx";
import Index_Admin from "./pages/admins/index.jsx";
import Productlists from "./pages/admins/Productlists.jsx";
import Admins from "./pages/admins/Admins.jsx";
import Shippers from "./pages/admins/Shippers.jsx";
import Trackers from "./pages/admins/Trackers.jsx";

const router = createBrowserRouter([
  {
    element: <Auth />,
    path: "login/",
  },
  {
    element: <App />,
    path: "/",
    children: [
      {
        element: <Index />,
        path: "/",
      },
      { element: <Allproducts />, path: "allproducts/" },
      {
        element: <Productdetails />,
        path: "productdetails/:id/",
      },
      // Profile page
      {
        element: <Index_Profile />,
        path: "profile/:id/",
        children: [
          {
            element: <Profile />,
            path: "",
          },
          {
            element: <Carts />,
            path: "carts/",
          },
          {
            element: <Purchases />,
            path: "purchases/",
          },
        ],
      },
      // Admins page
      {
        element: <Index_Admin />,
        path: "admin/",
        children: [
          {
            element: <Productlists />,
            path: "productlists/",
          },
          {
            element: <Admins />,
            path: "admins/",
          },
          {
            element: <Shippers />,
            path: "shippers/",
          },
          {
            element: <Trackers />,
            path: "trackers/",
          },
        ],
      },
    ],
  },
]);

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
  </QueryClientProvider>
);
