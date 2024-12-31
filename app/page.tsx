'use client'

import Image from "next/image";
import { Button, ButtonGroup } from "@nextui-org/button";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session, status } = useSession();
  if(session) console.log(session);

  return (
    <section className="min-h-screen">
      Main Page
      <Button color="primary">Button</Button>
    </section>
  );
}
