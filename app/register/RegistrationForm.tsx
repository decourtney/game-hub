"use client";

import { Button, Checkbox, Form, Input, Link } from "@nextui-org/react";
import React, { useState } from "react";
import { signIn } from "next-auth/react";

const RegistrationForm = () => {
  const [formState, setFormState] = useState({
    username: "",
    password1: "",
    password2: "",
    email: "",
    button1: false,
    button2: false,
    newsletter: false,
    tos: false,
  });

  const [errors, setErrors] = useState({
    tos: "",
    passwordMatch: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    setFormState((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (name === "tos" && checked) {
      setErrors((prev) => ({ ...prev, tos: "" }));
    }
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = { tos: "", passwordMatch: "" };

    // Validate Terms of Service
    if (!formState.tos) {
      newErrors.tos = "You must accept the Terms of Service*";
    }

    // Validate Password Match
    if (formState.password1 !== formState.password2) {
      newErrors.passwordMatch = "Passwords do not match.";
    }

    setErrors(newErrors);

    if (!newErrors.tos && !newErrors.passwordMatch) {
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

  console.log(formState);
  return (
    <Form
      className="flex flex-col gap-6"
      validationBehavior="native"
      onSubmit={onSubmit}
    >
      <div className="flex flex-col w-full gap-5">
        <Input
          isRequired
          label="Username"
          labelPlacement="outside"
          placeholder=" "
          name="username"
          type="text"
          value={formState.username}
          onChange={handleChange}
        />
        <Input
          isRequired
          label="Password"
          labelPlacement="outside"
          placeholder=" "
          name="password1"
          type="password"
          value={formState.password1}
          onChange={handleChange}
        />
        <Input
          isRequired
          label="Repeat Password"
          labelPlacement="outside"
          placeholder=" "
          name="password2"
          type="password"
          value={formState.password2}
          onChange={handleChange}
        />
        {errors.passwordMatch && (
          <p className="text-red-500 text-sm">{errors.passwordMatch}</p>
        )}
        <Input
          isRequired
          label="Your email address"
          labelPlacement="outside"
          placeholder=" "
          name="email"
          type="email"
          value={formState.email}
          onChange={handleChange}
        />
      </div>

      <div className="flex flex-col gap-1 p-4 border-1 border-content3 rounded-sm">
        <h3 className="font-bold">Useless buttons</h3>
        <Checkbox
          name="button1"
          isSelected={formState.button1}
          onChange={handleChange}
        >
          I like this button.
        </Checkbox>

        <Checkbox
          name="button2"
          isSelected={formState.button2}
          onChange={handleChange}
        >
          This button looks nice.
        </Checkbox>

        <p>
          You can change your selections later, however doing so will not change
          their usefullness
        </p>
      </div>

      <div className="">
        <div className="group mb-1">
          <Checkbox
            name="newsletter"
            isSelected={formState.newsletter}
            onChange={handleChange}
          >
            Sign me up for spam that I'll never read.
          </Checkbox>
          <p className="invisible group-hover:visible leading-none text-sm text-center">
            jk this button doesnt do anything either
          </p>
        </div>

        <Checkbox name="tos" isSelected={formState.tos} onChange={handleChange}>
          I accept the <Link className="underline">Terms of Service</Link>
        </Checkbox>
        {errors.tos && (
          <p className="text-red-500 text-sm mt-1">{errors.tos}</p>
        )}
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
    </Form>
  );
};

export default RegistrationForm;
