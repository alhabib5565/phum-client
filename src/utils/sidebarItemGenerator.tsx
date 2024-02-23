import { NavLink } from "react-router-dom";
import { TSidebar, TUserPath } from "../type";

export const sidebarItemGenerator = (items: TUserPath[], userRoll: string) => {
  const sideBar: TSidebar[] = [];
  items.forEach((item) => {
    if (item.path && item.element) {
      sideBar.push({
        key: item.name,
        label: <NavLink to={`/${userRoll}/${item.path}`}>{item.name}</NavLink>,
      });
    }

    if (item.name && item.children) {
      sideBar.push({
        key: item.name,
        label: item.name,
        children: item.children.map((child) => {
          if (child.name) {
            return {
              key: child.name,
              label: (
                <NavLink to={`/${userRoll}/${child.path}`}>
                  {child.name}
                </NavLink>
              ),
            };
          }
        }),
      });
    }
  });
  return sideBar;
};
