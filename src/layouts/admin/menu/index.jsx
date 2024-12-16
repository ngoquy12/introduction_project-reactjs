import { ChartColumnStacked, Gauge, ShoppingBasket, Users } from "lucide-react";
import React from "react";
import { NavLink } from "react-router-dom";
import "./menu.css";

export default function Menu() {
  return (
    <>
      <menu className="w-[250px] bg-slate-800 h-[calc(100vh-64px)] text-white px-3 py-2">
        <NavLink
          end
          to="/admin"
          className="flex items-center gap-2 hover:bg-slate-700 px-3 py-2 rounded-md transition-all text-[16px]"
        >
          <Gauge size={20} />
          <span>Dashboard</span>
        </NavLink>
        <NavLink
          to="/admin/account-manager"
          className="flex items-center gap-2 hover:bg-slate-700 px-3 py-2 rounded-md transition-all text-[16px]"
        >
          <Users />
          <span>Account Manager</span>
        </NavLink>
        <NavLink
          to="/admin/category-manager"
          className="flex items-center gap-2 hover:bg-slate-700 px-3 py-2 rounded-md transition-all text-[16px]"
        >
          <ChartColumnStacked />
          <span>Category Manager</span>
        </NavLink>
        <NavLink
          to="/admin/product-manager"
          className="flex items-center gap-2 hover:bg-slate-700 px-3 py-2 rounded-md transition-all text-[16px]"
        >
          <ShoppingBasket />
          <span>Product Manager</span>
        </NavLink>
      </menu>
    </>
  );
}
