const paths = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: "AdminDashboard",
  },
  {
    name: "Dashboard",
    children: [
      {
        name: "Create Student",
        path: "create-student",
        element: "CreateStudent ",
      },
      {
        name: "Create Faculty",
        path: "create-faculty",
        element: "CreateFaculty ",
      },
      {
        name: "Create Admin",
        path: "create-admin",
        element: "CreateAdmin ",
      },
    ],
  },
];

const adminRoute = [];

paths.forEach((item) => {
  if (item.path && item.element) {
    adminRoute.push({
      key: item.path,
      label: `<NavLink to= ${item.path}>${item.name}</NavLink>`,
    });
  }

  if (item.name && item.children) {
    adminRoute.push({
      key: item.name,
      label: item.name,
      children: item.children.map((child) => ({
        key: child.path,
        label: `<NavLink to= ${child.path}>${child.name}</NavLink>`,
      })),
    });
  }
});

console.log(adminRoute);
