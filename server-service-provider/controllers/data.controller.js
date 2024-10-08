import MaskedData from "../models/MaskedData.js";
import fetch from "node-fetch";

const sendMaskedAggregateDataToAnalyst = async () => {
  try {
    const allMaskedData = await MaskedData.find({}, "data");

    // Initialize a 10x12 array filled with zeros for the sum of data
    const maskedAggregateData = Array.from({ length: 10 }, () =>
      Array(12).fill(0)
    );

    // Sum the data from each record element-wise
    allMaskedData.forEach((record) => {
      record.data.forEach((row, rowIndex) => {
        row.forEach((cell, cellIndex) => {
          if (rowIndex < 10 && cellIndex < 12) {
            maskedAggregateData[rowIndex][cellIndex] += cell;
          }
        });
      });
    });

    const response = await fetch(
      `${process.env.ANALYST_URL}/masked-aggregate-data`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({ maskedAggregateData: maskedAggregateData }),
      }
    );

    if (!response.ok) {
      throw new Error(`Analyst responded with status: ${response.status}`);
    }

    console.log("Masked aggregate data sent to analyst successfully");
    return { success: true };
  } catch (error) {
    console.error("Error sending masked data to analyst:", error);
    return { success: false, error: error.message };
  }
};

export const maskedDataController = async (req, res) => {
  try {
    const { userId, data } = req.body;

    await MaskedData.findOneAndUpdate(
      { userId },
      { data },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    const analystResult = await sendMaskedAggregateDataToAnalyst();

    if (analystResult.success) {
      res
        .status(200)
        .json({ message: "Data saved and sent to analyst successfully" });
    } else {
      res.status(500).json({
        error: "Data saved, but failed to send to analyst",
        details: analystResult.error,
      });
    }
  } catch (error) {
    console.error("Error saving data:", error);
    res.status(500).json({ error: "An error occurred while saving the data" });
  }
};
