"use client";

import React from "react";
import { Form } from "@nextui-org/form";
import { Button, Input } from "@nextui-org/react";
import RegistrationForm from "./RegistrationForm";
import { signIn } from "next-auth/react";

const RegisterPage = () => {
  return (
    <section className="min-h-svh">
      <div className="md:max-w-[960px] md:mt-5 mx-auto bg-content2 border-b-1 md:border-1 border-content3 rounded-sm shadow-md">
        <div className="p-8">
          <h2>Create an account</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* OAuth Login */}
          <div className="col-span-1 p-8 border-t-1 border-content3">
            <div className="flex justify-around">
              <Button
                onClick={() => signIn("google")}
                color="primary"
                variant="solid"
              >
                Register with Google
              </Button>
              <Button
                onClick={() => signIn("github")}
                color="primary"
                variant="solid"
              >
                Register with GitHub
              </Button>
            </div>

            {/* Divider with OR */}
            <div className="flex items-center justify-center my-6">
              <hr className="flex-grow border-t border-content3" />
              <span className="px-4 font-bold text-sm text-content3">OR</span>
              <hr className="flex-grow border-t border-content3" />
            </div>

            <RegistrationForm />
          </div>

          <div className="col-span-1 p-8 border-t-1 md:border-l-1 border-content3">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorum
            quod nisi minus eligendi officia natus nihil facere, culpa sequi
            consequuntur officiis, veritatis ullam voluptate, nobis est
            reprehenderit accusantium tenetur ipsam amet. Vitae, eum maxime ab
            vero et itaque distinctio illo pariatur tempora ad, sint facilis
            numquam delectus culpa, ullam eos..
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegisterPage;
