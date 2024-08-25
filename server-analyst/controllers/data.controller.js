import fs from "fs";
import EncryptedMask from "../models/encryptedMask.model.js";
import {
  decryptAggregateData,
  encryptAggregateData,
  getAggregateMask,
} from "../utils/helpers.js";
import AggregateData from "../models/AggregateData.model.js";
import { months, attackTypes } from "../utils/constants.js";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const publicKeyController = (req, res) => {
  try {
    const publicKeyPath = join(__dirname, "../publickey.crt");
    const publicKey = fs.readFileSync(publicKeyPath, "utf8");

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
      row.map((value) => value - aggregateMask)
    );

    const encryptedAggregateData = encryptAggregateData(aggregateData);

    await AggregateData.findOneAndUpdate(
      {},
      { data: encryptedAggregateData },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    res.status(200).json({ message: "Processed aggregate data!" });
  } catch (error) {
    console.error("Error processing masked aggregate data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const encryptedMaskController = async (req, res) => {
  try {
    const { userId, encryptedMask } = req.body;

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

export const statisticsController = async (req, res) => {
  try {
    const aggregateDataEntry = await AggregateData.findOne({});

    if (!aggregateDataEntry) {
      return res.status(400).json({ message: "No aggregate data found" });
    }

    const data = aggregateDataEntry.data;
    const aggregateData = decryptAggregateData(data);

    const numberOfCompanies = await EncryptedMask.countDocuments();

    if (numberOfCompanies < 3) {
      return res
        .status(400)
        .json({ message: "Not enough data entries for analysis." });
    }

    let totalAttacks = 0;
    let monthlyAttacks = new Array(12).fill(0);
    let attackTypeCounts = new Array(10).fill(0);

    aggregateData.forEach((attackTypeArray, attackTypeIndex) => {
      attackTypeArray.forEach((monthlyCount, monthIndex) => {
        totalAttacks += monthlyCount;
        monthlyAttacks[monthIndex] += monthlyCount;
        attackTypeCounts[attackTypeIndex] += monthlyCount;
      });
    });

    const maxAttackTypeCount = Math.max(...attackTypeCounts);
    const minAttackTypeCount = Math.min(...attackTypeCounts);

    const mostCommonAttack = attackTypes.filter(
      (_, index) => attackTypeCounts[index] === maxAttackTypeCount
    );
    const leastCommonAttack = attackTypes.filter(
      (_, index) => attackTypeCounts[index] === minAttackTypeCount
    );

    const formattedAggregateData = months.map((month, index) => {
      const monthData = { month };
      attackTypes.forEach((attackType, attackIndex) => {
        monthData[attackType] = aggregateData[attackIndex][index];
      });
      return monthData;
    });

    const response = {
      companies: numberOfCompanies,
      totalAttacks,
      mostCommonAttack:
        mostCommonAttack.length === 1 ? mostCommonAttack[0] : mostCommonAttack,
      leastCommonAttack:
        leastCommonAttack.length === 1
          ? leastCommonAttack[0]
          : leastCommonAttack,
      aggregateData: formattedAggregateData,
    };

    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error generating statistics." });
  }
};
