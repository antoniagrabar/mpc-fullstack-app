import { SidebarLink } from "../types/index";

export const baseURL = "http://localhost:5000/api";

export const sidebarLinks: SidebarLink[] = [
  {
    icon: "home",
    route: "/",
    label: "Home",
  },
  {
    icon: "edit",
    route: "/data-entry",
    label: "Data Entry",
  },
  {
    icon: "lineChart",
    route: "/statistics",
    label: "Statistics",
  },
];
