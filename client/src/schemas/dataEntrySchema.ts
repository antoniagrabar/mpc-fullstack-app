import * as z from "zod";

const cellSchema = z.preprocess(
  (val) => Number(val),
  z
    .number()
    .min(0, { message: "Number must be a positive value" })
    .max(1_000_000_000, {
      message: "Number must be less than or equal to one billion",
    })
);

const rowSchema = z
  .array(cellSchema)
  .length(12, { message: "Row must have exactly 12 cells" });

const tableSchema = z
  .array(rowSchema)
  .length(10, { message: "Table must have exactly 10 rows" });

const formSchema = z.object({
  data: tableSchema,
});

export default formSchema;
