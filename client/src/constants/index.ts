import { SidebarLink } from "../types/index";

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

export const attacks: string[] = [
  "Malware",
  "Phishing",
  "Spoofing",
  "DDoS",
  "Insider Threats",
  "MiTM",
  "Code Injection",
  "Supply Chain",
  "DNS Tunneling",
  "Brute force",
];

export const months: string[] = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
