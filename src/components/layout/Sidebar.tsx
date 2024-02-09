import { Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import { sidebarItemGenerator } from "../../utils/sidebarItemGenerator";
import { adminPaths } from "../../routes/admin.routes";
import { studentPaths } from "../../routes/student.routes";
import { facultyPaths } from "../../routes/faculty.routes";

const Sidebar = () => {
  const userRole = {
    ADMIN: "admin",
    STUDENT: "student",
    FACULTY: "faculty",
  };
  const role = "faculty";
  let sidebarItem;

  switch (role) {
    case userRole.STUDENT:
      sidebarItem = sidebarItemGenerator(studentPaths, userRole.STUDENT);

      break;
    case userRole.ADMIN:
      sidebarItem = sidebarItemGenerator(adminPaths, userRole.ADMIN);

      break;
    case userRole.FACULTY:
      sidebarItem = sidebarItemGenerator(facultyPaths, userRole.FACULTY);

      break;

    default:
      break;
  }
  return (
    <Sider
      breakpoint="lg"
      collapsedWidth="0"
      onBreakpoint={(broken) => {
        console.log(broken);
      }}
      onCollapse={(collapsed, type) => {
        console.log(collapsed, type);
      }}
    >
      <div
        style={{
          color: "white",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "4rem",
        }}
      >
        <h1>PH-UNI</h1>
      </div>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["4"]}
        items={sidebarItem}
      />
    </Sider>
  );
};

export default Sidebar;
