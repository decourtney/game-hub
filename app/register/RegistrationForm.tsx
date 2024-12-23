"use client";

import { Button, Checkbox, Form, Input, Link } from "@nextui-org/react";
import React, { useState, useCallback, ChangeEvent, FormEvent } from "react";
import { debounce } from "../utils/debounce";
import { signIn } from "next-auth/react";

const RegistrationForm = () => {
  const [formState, setFormState] = useState({
    username: "",
    password: "",
    repassword: "",
    email: "",
    button1: false,
    button2: false,
    newsletter: false,
    tos: false,
  });

  const [usernameStatus, setUsernameStatus] = useState<
    "available" | "taken" | "checking" | ""
  >("");
  const [errors, setErrors] = useState({
    tos: "",
    passwordMatch: "",
  });

  const checkUsername = async (username: string) => {
    if (username.trim() === "") {
      setUsernameStatus("");
      return;
    }

    setUsernameStatus("checking");

    try {
      const response = await fetch(`/api/check-username?username=${username}`);
      const data = await response.json();

      if (data.available) {
        setUsernameStatus("available");
      } else {
        setUsernameStatus("taken");
      }
    } catch (error) {
      console.error("Error checking username:", error);
      setUsernameStatus("");
    }
  };

  const debouncedCheckUsername = useCallback(debounce(checkUsername, 500), []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    setFormState((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (name === "username") {
      debouncedCheckUsername(value); // Check username availability
    }

    if (name === "tos" && checked) {
      setErrors((prev) => ({ ...prev, tos: "" }));
    }
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const newErrors = { tos: "", passwordMatch: "" };

    // Validate Terms of Service
    if (!formState.tos) {
      newErrors.tos = "You must accept the Terms of Service*";
    }

    // Validate Password Match
    if (formState.password !== formState.repassword) {
      newErrors.passwordMatch = "Passwords do not match.";
    }

    setErrors(newErrors);

    if (!newErrors.tos && !newErrors.passwordMatch) {
      try {
        const response = await fetch("/api/auth/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formState),
        });

        if (response.ok) {
          const result = await signIn("credentials", {
            email: formState.email.toLowerCase(),
            password: formState.password,
            callbackUrl: "/",
          });

          if (result?.error) {
            alert("Error during sign-in: " + result.error);
          } else {
            alert("Registration and sign-in successful!");
          }
        } else {
          const errorData = await response.json();
          alert("Error during registration: " + errorData.message);
        }
      } catch (error) {
        console.error("Error:", error);
        alert("An error occurred during registration.");
      }
    }
  };

  return (
    <Form
      className="flex flex-col gap-6"
      validationBehavior="native"
      onSubmit={onSubmit}
    >
      <div className="flex flex-col w-full gap-5">
        <div>
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
          {/* Display Username Status */}
          {usernameStatus === "checking" && (
            <p className="ml-4 text-gray-500 text-sm">Checking username...</p>
          )}
          {usernameStatus === "available" && (
            <p className="ml-4 text-green-700 text-sm">Username is available</p>
          )}
          {usernameStatus === "taken" && (
            <p className="ml-4 text-red-500 text-sm">
              Username is already taken
            </p>
          )}
        </div>

        <Input
          isRequired
          label="Password"
          labelPlacement="outside"
          placeholder=" "
          name="password"
          type="password"
          value={formState.password}
          onChange={handleChange}
        />
        <Input
          isRequired
          label="Repeat Password"
          labelPlacement="outside"
          placeholder=" "
          name="repassword"
          type="password"
          value={formState.repassword}
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
