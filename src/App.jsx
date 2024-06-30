import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./components/Home/Home";
import Products from "./components/Products/Products";
import Cart from "./components/Cart/Cart";
import Brands from "./components/Brands/Brands";
import Categories from "./components/Categories/Categories";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Notfound from "./components/Notfound/Notfound";
import About from "./components/About/About";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import BrandDetails from "./components/BrandDetails/BrandDetails";
import UserContextProvider from "./context/UserContext";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import CategoryDetails from "./components/CategoryDetails/CategoryDetails";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CartContextProvider from "./context/CartContext";
import { Toaster } from "react-hot-toast";
import WishContextProvider from "./context/WishContext";
import Wishlist from "./components/Wish/Wishlist";

import Checkout from "./components/Checkout/Checkout";
import Allorders from "./components/Allorders/Allorders";


let query = new QueryClient();

let router = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <Home />{" "}
          </ProtectedRoute>
        ),
      },
      {
        path: "about",
        element: (
          <ProtectedRoute>
            <About />
          </ProtectedRoute>
        ),
      },
      {
        path: "allorders",
        element: (
          <ProtectedRoute>
            <Allorders />
          </ProtectedRoute>
        ),
      },
      {
        path: "checkout",
        element: (
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        ),
      },
      {
        path: "products",
        element: (
          <ProtectedRoute>
            {" "}
            <Products />
          </ProtectedRoute>
        ),
      },
      {
        path: "productdetails/:id/:category",
        element: (
          <ProtectedRoute>
            <ProductDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "/branddetails/:_id",
        element: (
          <ProtectedRoute>
            <BrandDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "cart",
        element: (
          <ProtectedRoute>
            <Cart />{" "}
          </ProtectedRoute>
        ),
      },
      {
        path: "wishlist",
        element: (
          <ProtectedRoute>
            <Wishlist />{" "}
          </ProtectedRoute>
        ),
      },
      {
        path: "brands",
        element: (
          <ProtectedRoute>
            <Brands />
          </ProtectedRoute>
        ),
      },
      {
        path: "categories",
        element: (
          <ProtectedRoute>
            {" "}
            <Categories />
          </ProtectedRoute>
        ),
      },
      {
        path: "/categorydetails/:_id",
        element: (
          <ProtectedRoute>
            {" "}
            <CategoryDetails />
          </ProtectedRoute>
        ),
      },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "*", element: <Notfound /> },
    ],
  },
]);
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <QueryClientProvider client={query}>
        <UserContextProvider>
          <WishContextProvider>
            <CartContextProvider>
            <RouterProvider router={router}></RouterProvider>
            <Toaster/>
          </CartContextProvider>
          </WishContextProvider>
          
        </UserContextProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
