"use client";

import React, { useState } from "react";
import { Button, Form, Input, Link } from "@nextui-org/react";
import { signIn, signOut, useSession } from "next-auth/react";
import LoginForm from "./LoginForm";
import OAuthButtons from "../components/oauthButtons";

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

          {/* Divider with OR */}
          <div className="flex items-center justify-center my-6">
            <hr className="flex-grow border-t border-content3" />
            <span className="px-4 font-bold text-sm text-content3">OR</span>
            <hr className="flex-grow border-t border-content3" />
          </div>

          <OAuthButtons />
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
