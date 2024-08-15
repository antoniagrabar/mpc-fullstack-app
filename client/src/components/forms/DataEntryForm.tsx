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
import { attackLabels, months } from "@/constants";
import { useEffect, useState } from "react";
import { encryptMask, generateRandomMask } from "@/utils/helpers";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import formSchema from "@/schemas/dataEntrySchema";

const DataEntryForm = () => {
  const [publicKey, setPublicKey] = useState<string>();
  const session = useSession();

  const fetchPublicKey = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_ANALYST_URL}/public-key`,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
          },
        }
      );

      const responseData = await response.json();
      if (!response.ok) {
        toast.error(responseData.message);
      }
      const fetchedPublicKey = responseData.publicKey;
      setPublicKey(fetchedPublicKey);
    } catch (error) {
      console.log(error);
      throw new Error("Cannot fetch public key.");
    }
  };

  useEffect(() => {
    if (!publicKey) {
      fetchPublicKey();
    }
  }, []);

  const form = useForm({
    defaultValues: {
      data: Array.from({ length: 10 }, () =>
        Array.from({ length: 12 }, () => 0)
      ),
    },
    resolver: zodResolver(formSchema),
  });

  const { control, watch, handleSubmit } = form;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const mask = generateRandomMask();
    const encryptedMask = encryptMask(mask, publicKey);

    const maskedValues = values.data.map((row) =>
      row.map((cell: number) => cell + mask)
    );

    if (session.data) {
      try {
        const dataObject = {
          userId: session.data.user.id,
          data: maskedValues,
        };

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_SERVICE_PROVIDER_URL}/masked-data`,
          {
            method: "POST",
            body: JSON.stringify(dataObject),
            headers: {
              "Content-type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
          }
        );

        const json = await response.json();
        if (!response.ok) {
          toast.error(json.message);
        }

        const dataObjectAnalyst = {
          userId: session.data.user.id,
          encryptedMask: encryptedMask,
        };

        await fetch(`${process.env.NEXT_PUBLIC_ANALYST_URL}/encrypted-mask`, {
          method: "POST",
          body: JSON.stringify(dataObjectAnalyst),
          headers: {
            "Content-type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        });

        toast.success("Data entry submitted!");
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <>
      <div className="flex mb-5">
        <span className="body-semibold w-[150px]">Attack</span>
        <div className="flex w-full place-content-between pr-6">
          {months.map((month: string) => (
            <span className="body-semibold" key={month}>
              {month}
            </span>
          ))}
        </div>
      </div>
      <div>
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full">
            <div className="grid grid-cols-13 gap-2 mb-8">
              {watch("data").map((row, rowIndex) => (
                <div key={rowIndex} className="flex">
                  <div className="flex pr-2 flex-none w-[110px] body-regular pt-2">
                    {attackLabels[rowIndex]}
                  </div>
                  {row.map((_, cellIndex) => (
                    <FormField
                      key={`${rowIndex}-${cellIndex}`}
                      control={control}
                      name={`data.${rowIndex}.${cellIndex}`}
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
