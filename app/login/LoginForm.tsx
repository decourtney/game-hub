import { Button, Form, Input, Link } from '@nextui-org/react';
import React, { useState } from 'react'

const LoginForm = () => {
    const [formState, setFormState] = useState({
      username: "",
      password1: "",
      password2: "",
      email: "",
    });

    const [errors, setErrors] = useState({
      passwordMatch: "",
    });

  const onSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
  
      const newErrors = { passwordMatch: "" };
  
      // Validate Password Match
      if (formState.password1 !== formState.password2) {
        newErrors.passwordMatch = "Passwords do not match.";
      }
  
      setErrors(newErrors);
  
      if (!newErrors.passwordMatch) {
        console.log("Submitting form data:", formState);
  
        // Example API call to save user data
        try {
          const response = await fetch("/api/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formState),
          });
          if (response.ok) {
            alert("Registration successful!");
          } else {
            alert("Error during registration.");
          }
        } catch (error) {
          console.error("Error:", error);
        }
      }
    };

  return (
    <Form
      className="flex flex-col w-full gap-10"
      validationBehavior="native"
      onSubmit={() => console.log("submitted")}
    >
      <Input
        isRequired
        errorMessage="Please enter a valid username"
        label="Username or Email"
        labelPlacement="outside"
        name="username"
        placeholder=" "
        type="text"
        classNames={{
          base: "max-w-[30rem] md:max-w-full",
          mainWrapper: "h-full",
          input: "text-md",
          inputWrapper: "h-full font-normal bg-content4 text-content1/50",
        }}
      />

      <Input
        isRequired
        errorMessage="Please enter a valid email"
        label="Password"
        labelPlacement="outside"
        name="email"
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
}

export default LoginForm
