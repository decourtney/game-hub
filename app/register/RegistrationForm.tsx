"use client";

import {
  Button,
  Checkbox,
  CheckboxGroup,
  Form,
  Input,
  Link,
  Radio,
  RadioGroup,
} from "@nextui-org/react";
import React, { useState } from "react";

const RegistrationForm = () => {
  const [action, setAction] = useState<string | null>(null);

  return (
    <Form
      className="flex flex-col w-full gap-4"
      validationBehavior="native"
      onReset={() => setAction("reset")}
      onSubmit={(e) => {
        e.preventDefault();
        let data = Object.fromEntries(new FormData(e.currentTarget));

        setAction(`submit ${JSON.stringify(data)}`);
      }}
    >
      <Input
        isRequired
        errorMessage="Please enter a valid username"
        label="Username"
        labelPlacement="outside"
        placeholder=" "
        name="username"
        type="text"
      />
      <Input
        isRequired
        errorMessage="Please enter a password"
        label="Password"
        labelPlacement="outside"
        placeholder=" "
        name="password1"
        type="password"
      />
      <Input
        isRequired
        errorMessage="Please enter a password"
        label="Repeat Password"
        labelPlacement="outside"
        placeholder=" "
        name="password2"
        type="password"
      />

      <Input
        isRequired
        errorMessage="Please enter a valid email"
        label="Your email address"
        labelPlacement="outside"
        placeholder=" "
        name="email"
        type="email"
      />

      <div className="w-full p-4 border space-y-4">
        <h3 className="font-bold">Useless buttons</h3>
        <CheckboxGroup defaultValue={["button1"]}>
          <Checkbox value="button1">I like this button.</Checkbox>
          <Checkbox value="button2">This button looks nice.</Checkbox>
        </CheckboxGroup>
        <p>
          You can change your selections later, however doing so will not change
          their usefullness
        </p>
      </div>

      <div className="p-2">
        <CheckboxGroup>
          <div className="group">
            <Checkbox value="newsletter" className="group">
              Sign me up for spam that I'll never read.
            </Checkbox>
            <p className="invisible group-hover:visible leading-none text-sm text-center">
              jk this button doesnt do anything either
            </p>
          </div>

          <Checkbox value="tos">
            I accept the <Link className="underline">Terms of Service</Link>
          </Checkbox>
        </CheckboxGroup>
      </div>

      <div className="flex gap-2">
        <Button color="primary" type="submit">
          Create Account
        </Button>
        <span className="content-center">
          already have an account?{" "}
          <Link href="login" className="underline">
            Log in
          </Link>
        </span>
      </div>
      {action && (
        <div className="text-small text-default-500">
          Action: <code>{action}</code>
        </div>
      )}
    </Form>
  );
};

export default RegistrationForm;
