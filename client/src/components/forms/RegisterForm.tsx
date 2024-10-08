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
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useState } from "react";
import formSchema from "@/schemas/registerSchema";
import toast from "react-hot-toast";

const RegisterForm = ({ setSignUpSuccess }: any) => {
  const [emailExistsMessage, setEmailExistsMessage] = useState<string>("");

  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVICE_PROVIDER_URL}/auth/register`,
        {
          method: "POST",
          body: JSON.stringify(values),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      );
      const json = await response.json();
      if (!response.ok) {
        setEmailExistsMessage(json.message);
        toast.error(json.message);
      } else {
        setSignUpSuccess(true);
      }
    } catch (error) {
      console.log(error);
      throw new Error("Registration error.");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 w-300">
        <h1 className="h1-bold flex-center">Register</h1>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{"Name"}</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{"E-mail"}</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{"Password"}</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {emailExistsMessage !== "" ? (
          <p className="text-sm font-medium text-destructive">
            {emailExistsMessage}
          </p>
        ) : (
          <></>
        )}
        <Button className="w-full" type="submit">
          Submit
        </Button>
        <Link href="/login">
          <Button className="w-full" variant={"link"}>
            Already have an account? Log in here
          </Button>
        </Link>
      </form>
    </Form>
  );
};

export default RegisterForm;
