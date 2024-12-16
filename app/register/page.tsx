import React from 'react'
import { Form } from "@nextui-org/form";
import { Button, Input } from '@nextui-org/react';
import RegistrationForm from "./RegistrationForm";

const RegisterPage = () => {
  return (
    <section className="min-h-svh">
      <div className="grid grid-cols-2 max-w-[960px] mt-10 mx-auto bg-foreground border-1 bg-opacity-20 border-foreground">
        <div className="col-span-2 p-10 border-b-1 border-foreground">
          <h2>Create an account</h2>
        </div>
        <div className="col-span-1 p-10 border-r-1 border-foreground">
          <RegistrationForm />
        </div>
        <div className="col-span-1 p-10">Stuff</div>
      </div>
    </section>
  );
}

export default RegisterPage
