import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header/Header";

const Wrapper = () => {
  return (
    <>
      <Header />
      <div>
        <Outlet />
      </div>
    </>
  );
};

export default Wrapper;
