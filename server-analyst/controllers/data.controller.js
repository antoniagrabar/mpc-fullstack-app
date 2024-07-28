import fs from "fs";
import EncryptedMask from "../models/encryptedMask.model.js";
import { getAggregateMask } from "../utils/helpers.js";

export const publicKeyController = (req, res) => {
  try {
    const publicKey = fs.readFileSync(
      "/Users/antonia/Documents/projects/mpc-fullstack-app/server-analyst/publickey.crt",
      "utf8"
    );
    res.send({ publicKey });
  } catch (err) {
    res.status(500).send("Error reading the public key file");
  }
};

export const maskedAggregateDataController = async (req, res) => {
  try {
    const { maskedAggregateData } = req.body;

    if (!maskedAggregateData) {
      return res
        .status(400)
        .json({ error: "No masked aggregate data provided" });
    }

    const aggregateMask = await getAggregateMask();

    // Subtract the sum of masks from each value in the aggregate data
    const aggregateData = maskedAggregateData.map((row) =>
      row.map((value) => (value === 0 ? 0 : value - aggregateMask))
    );

    console.log("aggregate data", aggregateData);

    res.status(200).json({ message: "Processed aggregate data!" });
  } catch (error) {
    console.error("Error processing masked aggregate data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const encryptedMaskController = async (req, res) => {
  try {
    const { userId, encryptedMask } = req.body;

    // Store the encrypted mask in the database
    // If a record for the user already exists, replace it
    await EncryptedMask.findOneAndUpdate(
      { userId },
      { encryptedMask },
      { upsert: true, new: true }
    );

    res.status(200).json({ message: "Encrypted mask saved successfully" });
  } catch (error) {
    console.error("Error saving the encrypted mask:", error);
    res.status(500).json({ error: "Error saving the encrypted mask." });
  }
};
