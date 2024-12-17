import React from "react";
import { Form } from "@nextui-org/form";
import { Button, Input } from "@nextui-org/react";
import RegistrationForm from "./RegistrationForm";

const RegisterPage = () => {
  return (
    <section className="min-h-svh">
      <div className="grid grid-cols-2 max-w-[960px] mt-10 mx-auto bg-content2 border-1 border-content3 rounded-md shadow-md">
        <div className="col-span-2 p-10 border-b-1 border-content3">
          <h2>Create an account</h2>
        </div>
        <div className="col-span-1 p-10 border-r-1 border-content3">
          <RegistrationForm />
        </div>
        <div className="col-span-1 p-10">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorum quod
          nisi minus eligendi officia natus nihil facere, culpa sequi
          consequuntur officiis, veritatis ullam voluptate, nobis est
          reprehenderit accusantium tenetur ipsam amet. Vitae, eum maxime ab
          vero et itaque distinctio illo pariatur tempora ad, sint facilis
          numquam delectus culpa, ullam eos..
        </div>
      </div>
    </section>
  );
};

export default RegisterPage;
