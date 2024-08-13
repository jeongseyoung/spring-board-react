import { AUTH_PATH } from "constant";
import Footer from "layouts/Footer";
import Header from "layouts/Header";
import React from "react";
import { Outlet, useLocation } from "react-router-dom";

// component : 레이아웃
export default function Container() {
  // state : 현재 페이지 path name 상태
  const { pathname } = useLocation();

  // render
  return (
    <>
      <Header />
      <Outlet />
      {pathname !== AUTH_PATH() && <Footer />}
    </>
  );
}
// {pathname !== "/auth" && <Footer />} -> pathname이 auth가 아니면 <Footer /> 출력
