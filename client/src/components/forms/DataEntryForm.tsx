"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { analystURL } from "@/constants";

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
  .length(12, { message: "Row must have exactly 13 cells" });

const tableSchema = z
  .array(rowSchema)
  .length(10, { message: "Table must have exactly 11 rows" });

const formSchema = z.object({
  table: tableSchema,
});

const DataEntryForm = () => {
  const form = useForm({
    defaultValues: {
      table: Array.from({ length: 10 }, () =>
        Array.from({ length: 12 }, () => 0)
      ),
    },
    resolver: zodResolver(formSchema),
  });

  const { control, watch, handleSubmit } = form;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);

    try {
      const response = await fetch(`${analystURL}/publicKey`);
      if (!response.ok) {
        throw new Error("Network response was not ok" + response.statusText);
      }
      // Parse the JSON response to get the public key
      const data = await response.json();
      console.log(data);
      const publicKey = data.publicKey;

      // Log the public key or use it as needed
      console.log("Public Key:", publicKey);
    } catch (error) {
      console.log(error);
    }
  };

  const rowLabels = [
    "Malware",
    "Phishing",
    "Spoofing",
    "DDoS",
    "Insider Threats",
    "MiTM",
    "Code Injection",
    "Supply Chain",
    "DNS Tunneling",
    "Brute force",
  ];

  return (
    <div>
      <div className="flex mb-5">
        <span className="body-semibold w-[150px]">Attack</span>
        <div className="flex w-full place-content-between pr-6">
          <span className="body-semibold">Jan</span>
          <span className="body-semibold">Feb</span>
          <span className="body-semibold">Mar</span>
          <span className="body-semibold">Apr</span>
          <span className="body-semibold">May</span>
          <span className="body-semibold">Jun</span>
          <span className="body-semibold">Jul</span>
          <span className="body-semibold">Aug</span>
          <span className="body-semibold">Sep</span>
          <span className="body-semibold">Oct</span>
          <span className="body-semibold">Nov</span>
          <span className="body-semibold">Dec</span>
        </div>
      </div>
      <div className="">
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full">
            <div className="grid grid-cols-13 gap-2 mb-14">
              {watch("table").map((row, rowIndex) => (
                <div key={rowIndex} className="flex">
                  <div className="flex pr-2 flex-none w-[110px] body-regular pt-2">
                    {rowLabels[rowIndex]}
                  </div>
                  {row.map((_, cellIndex) => (
                    <FormField
                      key={`${rowIndex}-${cellIndex}`}
                      control={control}
                      name={`table.${rowIndex}.${cellIndex}`}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              type="number"
                              {...field}
                              className="border border-gray-300 p-2 w-full text-center"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  ))}
                </div>
              ))}
            </div>
            <div className="flex justify-center">
              <Button
                className="rounded-lg px-4 py-3 shadow-none w-[220px] cursor-pointer"
                type="submit"
              >
                Submit
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default DataEntryForm;
