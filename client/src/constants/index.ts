import { AttackType, SidebarLink } from "../types/index";
import { ChartConfig } from "@/components/ui/chart";
import Endpoints from "./endpoints";

export const sidebarLinks: SidebarLink[] = [
  {
    icon: "home",
    route: Endpoints.HOME,
    label: "Home",
  },
  {
    icon: "edit",
    route: Endpoints.DATAENTRY,
    label: "Data Entry",
  },
  {
    icon: "lineChart",
    route: Endpoints.STATISTICS,
    label: "Statistics",
  },
];

export const attackLabels: string[] = [
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

export const attacks: string[] = [
  "malware",
  "phishing",
  "spoofing",
  "ddos",
  "insiderThreats",
  "mitm",
  "codeInjection",
  "supplyChain",
  "dnsTunneling",
  "bruteForce",
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

export const keypointCardTitles: string[] = [
  "Total Companies",
  "Total Attacks",
  "Most Common Attack",
  "Least Common Attack",
];

export const labelMapping: AttackType = {
  malware: "Malware",
  phishing: "Phishing",
  spoofing: "Spoofing",
  ddos: "DDoS",
  insiderThreats: "Insider Threats",
  mitm: "MiTM",
  codeInjection: "Code Injection",
  supplyChain: "Supply Chain",
  dnsTunneling: "DNS Tunneling",
  bruteForce: "Brute Force",
};

export const aggregateDataChartConfig = attacks.reduce((config, attack) => {
  config[attack] = { label: labelMapping[attack as keyof typeof labelMapping] };
  return config;
}, {} as ChartConfig);

export const lineChartColors = [
  "#336fd6",
  "#fc8b12",
  "#17d427",
  "#FF7F7F",
  "#fcd512",
  "#8c564b",
  "#e377c2",
  "#04780d",
  "#7705e3",
  "#40e0d0",
];
