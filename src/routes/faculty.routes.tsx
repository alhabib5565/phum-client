import FacultyDashboard from "../pages/faculty/FacultyDashboard";
import OfferdCourse from "../pages/faculty/OfferdCourse";

export const facultyPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <FacultyDashboard />,
  },
  {
    name: "Offered Course",
    path: "offered-course",
    element: <OfferdCourse />,
  },
];
