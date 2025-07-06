import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashbord from "./components/layouts/Dashboard/dashboard";
import Dashboard from "/src/pages/Dashboard/dashboard";
import Orders from "/src/pages/Orders/orders";
import Products from "/src/pages/Products/products";
import Other from "/src/pages/Other/other";
import Login from './pages/login/login'
import AddNew from './pages/addNew/addNew'
import EditProduct from './pages/editProduct/editProduct'
import Brand from './pages/brand/brand'
import SubCategory from './pages/subCategory/subCategory'
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Dashbord />,
      children: [
        {
          path: "/",
          index: true,
          element: <Dashboard />,
        },
        {
          path: "/orders",
          element: <Orders />,
        },
        {
          path: "/products",
          element: <Products />,
        },
        {
          path: "/other",
          element: <Other />,
        },
         {
          path: "/addNew",
          element: <AddNew />,
        },

          {
          path: "/brand",
          element: <Brand/>,
        },
         {
          path: "/subCategory",
          element: <SubCategory/>,
        },
         {

          path: "/editProduct/:id",
          element: <EditProduct />,
        },
        
      ],
    },
      {
          path: "/login",
          element: <Login/>,
        }
  ]);
  return <RouterProvider router={router} />;
}

export default App;
