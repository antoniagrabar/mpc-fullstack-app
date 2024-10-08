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
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import formSchema from "@/schemas/loginSchema";

const LoginForm = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    await signIn("credentials", {
      redirect: false,
      email: values.email as string,
      password: values.password as string,
    })
      .then((res) => {
        if (res?.ok) {
          router.push("/");
        } else {
          setErrorMessage("User not found or password incorrect.");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2 w-300">
        <h1 className="h1-bold flex-center">Log in</h1>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>E-mail</FormLabel>
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
        {errorMessage !== "" ? (
          <p className="text-sm font-medium text-destructive">{errorMessage}</p>
        ) : (
          <></>
        )}
        <Button className="w-full" type="submit">
          Submit
        </Button>
        <Link href="/register">
          <Button className="w-full" variant={"link"}>
            Don&apos;t have an account? Register here
          </Button>
        </Link>
      </form>
    </Form>
  );
};

export default LoginForm;
