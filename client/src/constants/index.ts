import { SidebarLink } from "../types/index";

export const serviceProviderURL = "http://localhost:5000/api";
export const analystURL = "http://localhost:5001/api";

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
