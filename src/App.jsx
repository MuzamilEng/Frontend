import React, { Suspense, lazy, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Toaster } from "sonner";
import AllProducts from "./pages/AllProducts";
import SizeGuide from "./pages/SizeGuide";
import EmailPage from "./pages/EmailPage";
import SingleProduct from "./pages/SingleProduct";
import TableForm from "./pages/TableForm";




// Lazy load the pages
const Home = lazy(() => import("./pages/Home"));

const App = () => {
  return (
    <Suspense >
      <Toaster />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path ='/all-products' element={<AllProducts />} />
        <Route path ='/size-guide' element={<SizeGuide />} />
        <Route path ='/email' element={<EmailPage />} />
        <Route path={`/product/:id`} element={<SingleProduct />} />
        <Route path="/table" element={<TableForm/>} />
      </Routes>
    </Suspense>
  );
};

export default App;