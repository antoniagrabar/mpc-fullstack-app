export interface SidebarLink {
  icon: string;
  route: string;
  label: string;
}

interface MonthData {
  month: string;
  malware: number;
  phishing: number;
  spoofing: number;
  ddos: number;
  insiderThreats: number;
  mitm: number;
  codeInjection: number;
  supplyChain: number;
  dnsTunneling: number;
  bruteForce: number;
}

export interface Statistics {
  companies: number;
  totalAttacks: number;
  mostCommonAttack: keyof AttackType | (keyof AttackType)[];
  leastCommonAttack: keyof AttackType | (keyof AttackType)[];
  aggregateData: MonthData[];
}

export interface AttackType {
  malware: string;
  phishing: string;
  spoofing: string;
  ddos: string;
  insiderThreats: string;
  mitm: string;
  codeInjection: string;
  supplyChain: string;
  dnsTunneling: string;
  bruteForce: string;
}
