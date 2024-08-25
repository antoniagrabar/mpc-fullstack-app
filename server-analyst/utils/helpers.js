import crypto from "crypto";
import EncryptedMask from "../models/encryptedMask.model.js";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const decryptMask = (encryptedMask) => {
  const privateKeyPath = join(__dirname, "../keypair.pem");
  const privateKey = fs.readFileSync(privateKeyPath, "utf8");

  const decryptedMask = crypto.privateDecrypt(
    {
      key: privateKey,
    },
    Buffer.from(encryptedMask, "base64")
  );
  const mask = decryptedMask.toString("utf-8");
  return mask;
};

export const encryptAggregateData = (data) => {
  const keyHex = process.env.SYMMETRIC_KEY;
  const key = Buffer.from(keyHex, "hex");

  // Ensure key length is correct for AES-256
  if (key.length !== 32) {
    throw new Error(
      "Invalid key length. Key must be 32 bytes long for AES-256."
    );
  }

  const dataBuffer = Buffer.from(JSON.stringify(data), "utf-8");

  const cipher = crypto.createCipheriv("aes-256-ecb", key, null);

  const encrypted = Buffer.concat([cipher.update(dataBuffer), cipher.final()]);

  return encrypted.toString("base64");
};

export const decryptAggregateData = (data) => {
  const keyHex = process.env.SYMMETRIC_KEY;
  const key = Buffer.from(keyHex, "hex");

  // Ensure key length is correct for AES-256
  if (key.length !== 32) {
    throw new Error(
      "Invalid key length. Key must be 32 bytes long for AES-256."
    );
  }

  const encryptedBuffer = Buffer.from(data, "base64");

  const decipher = crypto.createDecipheriv("aes-256-ecb", key, null);

  const decrypted = Buffer.concat([
    decipher.update(encryptedBuffer),
    decipher.final(),
  ]);

  return JSON.parse(decrypted.toString("utf-8"));
};

export const getAggregateMask = async () => {
  try {
    const encryptedMasks = await EncryptedMask.find({}).select(
      "encryptedMask -_id"
    );

    let sum = 0;

    for (const maskRecord of encryptedMasks) {
      const decryptedMask = decryptMask(maskRecord.encryptedMask);
      sum += Number(decryptedMask);
    }

    return sum;
  } catch (error) {
    throw new Error("Error fetching or decrypting masks", error);
  }
};
