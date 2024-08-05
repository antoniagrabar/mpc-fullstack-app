import mongoose from "mongoose";

const aggregateDataSchema = new mongoose.Schema(
  {
    data: {
      type: [[Number]],
      required: true,
    },
  },
  { collection: "aggregate_data" }
);

const AggregateData = mongoose.model("aggregate_data", aggregateDataSchema);

export default AggregateData;
