import React from "react";
import { createBrowserRouter } from "react-router-dom";
import LazyLoadComponent from "../components/base/LazyLoadComponent";

// Cách import thông thường => Làm giảm hiệu năng ứng dụng
// import AdminLayout from "../layouts/admin/AdminLayout";
// import DashboardAdmin from "../pages/admin/dashboard";
// import AccountManager from "../pages/admin/accountManager";
// import CategoryManager from "../pages/admin/categoryManager";
// import ProductManager from "../pages/admin/productManager";

// Tải bằng lazy load
const AdminLayout = React.lazy(() => import("@/layouts/admin/AdminLayout"));

const DashboardAdmin = React.lazy(() => import("@/pages/admin/dashboard"));

const AccountManager = React.lazy(() => import("@/pages/admin/accountManager"));

const CategoryManager = React.lazy(() =>
  import("@/pages/admin/categoryManager")
);

const ProductManager = React.lazy(() => import("@/pages/admin/productManager"));

const routers = createBrowserRouter([
  {
    path: "/admin",
    element: (
      <LazyLoadComponent>
        <AdminLayout />
      </LazyLoadComponent>
    ),
    children: [
      {
        // path: "dashboard",
        index: true,
        element: (
          <LazyLoadComponent>
            <DashboardAdmin />
          </LazyLoadComponent>
        ),
      },
      {
        path: "account-manager",
        element: (
          <LazyLoadComponent>
            <AccountManager />
          </LazyLoadComponent>
        ),
      },
      {
        path: "category-manager",
        element: (
          <LazyLoadComponent>
            <CategoryManager />
          </LazyLoadComponent>
        ),
      },
      {
        path: "product-manager",
        element: (
          <LazyLoadComponent>
            <ProductManager />
          </LazyLoadComponent>
        ),
      },
    ],
  },
]);

export default routers;
