import crypto from "crypto";

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
