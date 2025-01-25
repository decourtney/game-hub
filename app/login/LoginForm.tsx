"use client";

import { Button, Form, Input, Link } from "@nextui-org/react";
import { signIn } from "next-auth/react";
import React, { FormEvent } from "react";

const LoginForm = () => {
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const result = await signIn("credentials", {
      email,
      password,
      callbackUrl: "/",
    });

    console.log(result)
  };

  return (
    <Form
      className="flex flex-col w-full gap-10"
      validationBehavior="native"
      onSubmit={onSubmit}
    >
      <Input
        isRequired
        errorMessage="Please enter a valid email"
        label="Email"
        labelPlacement="outside"
        name="email"
        placeholder=" "
        type="email"
        classNames={{
          base: "max-w-[30rem] md:max-w-full",
          mainWrapper: "h-full",
          input: "text-md",
          inputWrapper: "h-full font-normal bg-content4 text-content1/50",
        }}
      />

      <Input
        isRequired
        errorMessage="Please enter a password"
        label="Password"
        labelPlacement="outside"
        name="password"
        placeholder=" "
        type="password"
        classNames={{
          base: "max-w-[30rem] md:max-w-full",
          mainWrapper: "h-full",
          input: "text-md",
          inputWrapper: "h-full font-normal bg-content4 text-content1/50",
        }}
      />

      <div className="flex gap-2 items-center">
        <Button color="primary" type="submit">
          Log in
        </Button>
        <span>
          or{" "}
          <Link href="/register" className="underline">
            Create account
          </Link>{" "}
          ·{" "}
          <Link href="/" className="underline">
            Forgot password
          </Link>
        </span>
      </div>
    </Form>
  );
};

export default LoginForm;
