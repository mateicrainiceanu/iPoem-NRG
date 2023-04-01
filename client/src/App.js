import Layout from "./components/Layout/Layout";

import Home from "./pages/Home";
import Generate from "./pages/Generate";
import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom";


const proxy = process.env.NODE_ENV === 'development' ? process.env.REACT_APP_DEV_PROXY : process.env.REACT_APP_BUILD_PROXY


function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home proxy={proxy}/>} />
          <Route path="generate" element={<Generate proxy={proxy}/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
