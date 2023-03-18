import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./../pages/Main";
import Login from "./../pages/Login";
import SignUp from "./../pages/SignUp";
import Solver from "./../pages/Solver";
import MyPage from "./../pages/MyPage";
import Detail from "../pages/Detail";
import Login2 from "../pages/Login2";
import Header from "../components/layout/Header";
import MindMap from "../pages/MindMap";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MindMap />} />
        {/* <Route path="/" element={<Main />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/login2" element={<Login2 />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/solver" element={<Solver />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/detail" element={<Detail />} />
        <Route path="/detail/:questionId" element={<Detail />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
