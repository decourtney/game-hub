import React from "react";
import RegistrationForm from "./RegistrationForm";
import OAuthButtons from "../components/OAuthButtons";

const RegisterPage = () => {
  return (
    <section className="min-h-svh">
      <div className="md:max-w-[960px] md:mt-5 mx-auto bg-content2 border-b-1 md:border-1 border-content3 rounded-sm shadow-md">
        {/* Heading */}
        <div className="p-8">
          <h2>Create an account</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* OAuth Login */}
          <div className="col-span-1 p-8 border-t-1 border-content3">
            <h3 className="">Register with</h3>
            <OAuthButtons />

            {/* Divider with OR */}
            <div className="flex items-center justify-center my-6">
              <hr className="flex-grow border-t border-content3" />
              <span className="px-4 font-bold text-sm text-content3">OR</span>
              <hr className="flex-grow border-t border-content3" />
            </div>

            {/* Registration Form */}
            <RegistrationForm />
          </div>

          {/* Information Section */}
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
