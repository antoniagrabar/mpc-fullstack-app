import crypto from "crypto";
import { AttackType } from "@/types";
import { labelMapping } from "@/constants";

export const generateRandomMask = () => {
  const min = -1_000_000;
  const max = 1_000_000;
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const encryptMask = (mask: number, publicKey: any) => {
  try {
    const buffer = Buffer.from(mask.toString(), "utf-8");
    const encrypted = crypto.publicEncrypt(publicKey, buffer);
    return encrypted.toString("base64");
  } catch (error) {
    console.error("Error encrypting mask:", error);
    throw new Error("Encryption failed");
  }
};

export const createAttackLabel = (
  attack: keyof AttackType | (keyof AttackType)[]
): string | string[] => {
  if (Array.isArray(attack)) {
    return attack.map((a) => labelMapping[a] || a);
  } else {
    return labelMapping[attack] || attack;
  }
};
