import React from "react";
import Header from "./header";
import Menu from "./menu";
import DashboardAdmin from "../../pages/admin/dashboard";
import { Outlet } from "react-router-dom";

export default function AdminLayout() {
  return (
    <div>
      <Header />
      <div className="flex">
        <Menu />
        <div className="flex-1 p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
