import React, { useEffect, useState } from "react";
import Header from "./header";
import Menu from "./menu";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export default function AdminLayout() {
  const navigate = useNavigate();

  useEffect(() => {
    // Kiểm tra token từ cookie
    const accessToken = Cookies.get("accessToken");

    const accountLogined =
      JSON.parse(localStorage.getItem("accountLogined")) || {};

    if (accessToken) {
      const checkIsAdmin = accountLogined?.roles.some(
        (role) => role === "ROLE_ADMIN"
      );

      if (!checkIsAdmin) {
        navigate("/login");
      }
    } else {
      navigate("/login");
    }
  }, []);

  return (
    <>
      <Header />
      <div className="flex">
        <Menu />
        <div className="flex-1 p-6">
          <Outlet />
        </div>
      </div>
    </>
  );
}
