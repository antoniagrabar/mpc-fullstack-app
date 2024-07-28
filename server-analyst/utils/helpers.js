import crypto from "crypto";
import EncryptedMask from "../models/encryptedMask.model.js";
import fs from "fs";

export const decryptMask = (encryptedMask) => {
  const privateKey = fs.readFileSync(
    "/Users/antonia/Documents/projects/mpc-fullstack-app/server-analyst/keypair.pem",
    "utf8"
  );

  const decryptedMask = crypto.privateDecrypt(
    {
      key: privateKey,
    },
    Buffer.from(encryptedMask, "base64")
  );
  const mask = decryptedMask.toString("utf-8");
  return mask;
};

export const getAggregateMask = async () => {
  try {
    // Fetch all encrypted masks from the database
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
