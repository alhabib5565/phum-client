import AdminDashboard from "../pages/admin/AdminDashboard";
import CreateAdmin from "../pages/admin/userManagement/CreateAdmin";
import CreateFaculty from "../pages/admin/userManagement/CreateFaculty";
import CreateStudent from "../pages/admin/userManagement/CreateStudent";
import AcademicSemester from "../pages/admin/academicManagement/AcademicSemester";
import CreateAcademicSemester from "../pages/admin/academicManagement/CreateAcademicSemester";
import CreateAcademicFaculty from "../pages/admin/academicManagement/CreateAcademicFaculty";
import AcademicFaculty from "../pages/admin/academicManagement/AcademicFaculty";
import CreateAcademicDepartment from "../pages/admin/academicManagement/CreateAcademicDepartment";
import AcademicDepartment from "../pages/admin/academicManagement/AcademicDepartment";
import SutdentsData from "../pages/admin/userManagement/SutdentsData";
import StudentDetails from "../pages/admin/userManagement/StudentDetails";

//! aikhane comment kora code gulur jonno utility bananu ache

// type TRoute = {
//   name?: string;
//   path: string;
//   element: ReactNode;
// };

// type TSidebar = {
//   key?: string;
//   label: ReactNode;
//   children?: TSidebar[];
// };

export const adminPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <AdminDashboard />,
  },
  {
    name: "Academic Management",
    children: [
      {
        name: "Create A. Semester",
        path: "create-academic-semester",
        element: <CreateAcademicSemester />,
      },
      {
        name: "Academic Semester",
        path: "academic-semester",
        element: <AcademicSemester />,
      },
      {
        name: "Create A. Faculty",
        path: "create-academic-faculty",
        element: <CreateAcademicFaculty />,
      },
      {
        name: "Academic Faculty",
        path: "academic-faculty",
        element: <AcademicFaculty />,
      },
      {
        name: "Create A. Department",
        path: "create-academic-department",
        element: <CreateAcademicDepartment />,
      },
      {
        name: "Academic Department",
        path: "academic-department",
        element: <AcademicDepartment />,
      },
    ],
  },
  {
    name: "User Management",
    children: [
      {
        name: "Create Student",
        path: "create-student",
        element: <CreateStudent />,
      },
      {
        // name: "Student Data",
        path: "student-data/:id",
        element: <StudentDetails />,
      },
      {
        name: "Student Data",
        path: "student-data",
        element: <SutdentsData />,
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
// const extractChildRoutes: TRoute[] = [];
// adminPaths.forEach((item) => {
//   if (item.name && item.children) {
//     extractChildRoutes.push(...item.children);
//   } else {
//     extractChildRoutes.push(item as TRoute);
//   }
// });

// export const adminRoutes = extractChildRoutes.map((item) => {
//   return {
//     path: item.path,
//     element: item.element,
//   };
// });

//for handle sidebar
// export const sideBar: TSidebar[] = [];
// adminPaths.forEach((item) => {
//   if (item.path && item.element) {
//     sideBar.push({
//       key: item.name,
//       label: <NavLink to={`/admin/${item.path}`}>{item.name}</NavLink>,
//     });
//   }

//   if (item.name && item.children) {
//     sideBar.push({
//       key: item.name,
//       label: item.name,
//       children: item.children.map((child) => ({
//         key: child.name,
//         label: <NavLink to={`/admin/${child.path}`}>{child.name}</NavLink>,
//       })),
//     });
//   }
// });
