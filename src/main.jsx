import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

import App from "./App.jsx";
import Index from "./pages/index.jsx";
import Auth from "./pages/auth.jsx";
import Allproducts from "./pages/allproducts.jsx";
import Productdetails from "./pages/productdetails.jsx";
import Index_Profile from "./pages/profiles/index.jsx";
import Carts from "./pages/profiles/carts.jsx";
import Profile from "./pages/profiles/profile.jsx";
import Purchases from "./pages/profiles/purchases.jsx";
import Index_Admin from "./pages/admins/index.jsx";
import Productlists from "./pages/admins/productlists.jsx";
import Admins from "./pages/admins/admins.jsx";
import Shippers from "./pages/admins/shippers.jsx";
import Trackers from "./pages/admins/trackers.jsx";

const router = createBrowserRouter([
  {
    element: <App />,
    path: "/",
    children: [
      {
        element: <Index />,
        path: "/",
      },
      {
        // Merged login and register
        element: <Auth />,
        path: "login/",
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

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
