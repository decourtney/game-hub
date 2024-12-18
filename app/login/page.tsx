"use client";

import React, { useState } from "react";
import { Button, Form, Input, Link } from "@nextui-org/react";
import { signIn, signOut, useSession } from "next-auth/react";
import LoginForm from "./LoginForm";

const LoginPage = () => {
  // const { data: session } = useSession();

  return (
    <section>
      <div className="md:max-w-[500px] md:mt-10 mx-auto bg-content2 border-b-1 md:border-1 border-content3 rounded-sm shadow-md">
        <div className="p-8 border-b-1 border-content3">
          <h2>Log in to your account</h2>
        </div>

        <div className="p-8 mx-auto">
          <LoginForm />

          <div className="grid grid-col-2 pt-8 mt-8 gap-2 border-t-1">
            <h3 className="col-span-2 text-lg ">Or log in with:</h3>
            <div className="col-span-1">
              <Button fullWidth onPress={() => signIn("github")}>
                GitHub
              </Button>
            </div>
            <div className="col-span-1">
              <Button fullWidth onPress={() => signIn("google")}>
                Google
              </Button>
            </div>
            <div className="col-span-1">
              <Button fullWidth onPress={() => signIn("facebook")}>
                Facebook
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
