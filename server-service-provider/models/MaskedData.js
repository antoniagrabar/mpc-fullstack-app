import mongoose from "mongoose";

const validateDataShape = (data) => {
  return (
    Array.isArray(data) &&
    data.length === 10 &&
    data.every((row) => Array.isArray(row) && row.length === 12)
  );
};

const maskedDataSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      unique: true,
    },
    data: {
      type: [[Number]],
      required: true,
      validate: [validateDataShape, "Data must be a 10x12 array"],
    },
  },
  { collection: "masked_data" }
);

const MaskedData = mongoose.model("masked_data", maskedDataSchema);

export default MaskedData;
