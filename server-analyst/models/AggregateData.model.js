import mongoose from "mongoose";

const aggregateDataSchema = new mongoose.Schema(
  {
    data: {
      type: String,
      required: true,
    },
  },
  { collection: "encrypted_aggregate_data" }
);

const AggregateData = mongoose.model(
  "encrypted_aggregate_data",
  aggregateDataSchema
);

export default AggregateData;
