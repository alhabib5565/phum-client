import { ReactNode } from "react";
import AdminDashboard from "../pages/admin/AdminDashboard";
import CreateAdmin from "../pages/admin/CreateAdmin";
import CreateFaculty from "../pages/admin/CreateFaculty";
import CreateStudent from "../pages/admin/CreateStudent";
import { NavLink } from "react-router-dom";

type TRoute = {
  name: string;
  path: string;
  element: ReactNode;
};

type TSidebar = {
  key: string;
  label: ReactNode;
  children?: TSidebar[];
};

export const adminPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <AdminDashboard />,
  },
  {
    name: "Dashboard",
    children: [
      {
        name: "Create Student",
        path: "create-student",
        element: <CreateStudent />,
      },
      {
        name: "Create Faculty",
        path: "create-faculty",
        element: <CreateFaculty />,
      },
      {
        name: "Create Admin",
        path: "create-admin",
        element: <CreateAdmin />,
      },
    ],
  },
];

//  for handle route
const extractChildRoutes: TRoute[] = [];
adminPaths.forEach((item) => {
  if (item.name && item.children) {
    extractChildRoutes.push(...item.children);
  } else {
    extractChildRoutes.push(item as TRoute);
  }
});

export const adminRoutes = extractChildRoutes.map((item) => {
  return {
    path: item.path,
    element: item.element,
  };
});

//for handle sidebar
export const sideBar: TSidebar[] = [];
adminPaths.forEach((item) => {
  if (item.path && item.element) {
    sideBar.push({
      key: item.name,
      label: <NavLink to={`/admin/${item.path}`}>{item.name}</NavLink>,
    });
  }

  if (item.name && item.children) {
    sideBar.push({
      key: item.name,
      label: item.name,
      children: item.children.map((child) => ({
        key: child.name,
        label: <NavLink to={`/admin/${child.path}`}>{child.name}</NavLink>,
      })),
    });
  }
});
