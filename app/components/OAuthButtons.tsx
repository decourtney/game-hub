"use client";

import { Button } from "@nextui-org/react";
import { signIn } from "next-auth/react";
import React from "react";

const OAuthButtons = () => {
  return (
    <div className="flex justify-around gap-2">
      <Button fullWidth onPress={() => signIn("google", { callbackUrl: "/" })}>
        Google
      </Button>
      <Button fullWidth onPress={() => signIn("github", { callbackUrl: "/" })}>
        GitHub
      </Button>
      <Button
        fullWidth
        onPress={() => signIn("facebook", { callbackUrl: "/" })}
      >
        Facebook
      </Button>
    </div>
  );
};

export default OAuthButtons;
