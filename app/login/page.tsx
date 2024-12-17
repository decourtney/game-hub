'use client'

import React from "react";
import { Button } from "@nextui-org/react";
import { signIn, signOut, useSession } from "next-auth/react";

const LoginPage = () => {
  // const { data: session } = useSession();

  return (
    <section>
      <div className="max-w-[500px] mt-10 mx-auto bg-content2 border-1 border-content3 rounded-md shadow-md">
        <div className="p-10 border-b-1 border-content3">
          <h2>Log in to your account</h2>
        </div>

        <div className="px-10 py-7 mx-auto">
          <div className="border-b-1">Form Fields</div>
        </div>

        <div className="w-full py-7 px-10 space-y-5">
          <h3 className="flex flex-row text-lg font-bold">Or log in with:</h3>
          <div className="w-1/2">
            <Button fullWidth onPress={() => signIn("github")}>
              GitHub
            </Button>
          </div>
          <div className="w-1/2">
            <Button fullWidth onPress={() => signIn("google")}>
              Google
            </Button>
          </div>
          <div className="w-1/2">
            <Button fullWidth onPress={() => signIn("facebook")}>
              Facebook
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
