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
import { attacks, months } from "@/constants";

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
        throw new Error(response.statusText);
      }
      const data = await response.json();
      console.log(data);
      const publicKey = data.publicKey;
      console.log("Public Key:", publicKey);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="flex mb-5">
        <span className="body-semibold w-[150px]">Attack</span>
        <div className="flex w-full place-content-between pr-6">
          {months.map((month: string) => (
            <span className="body-semibold">{month}</span>
          ))}
        </div>
      </div>
      <div>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full">
            <div className="grid grid-cols-13 gap-2 mb-14">
              {watch("table").map((row, rowIndex) => (
                <div key={rowIndex} className="flex">
                  <div className="flex pr-2 flex-none w-[110px] body-regular pt-2">
                    {attacks[rowIndex]}
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
    </>
  );
};

export default DataEntryForm;
