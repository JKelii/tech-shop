import React from "react";

import { AtSign, Lock, User } from "lucide-react";
import InputComponent from "../login/Inputs/input-component";
import PasswordInputComponent from "../login/Inputs/password-input";

const Register = () => {
  return (
    <main className="flex  justify-center items-center min-h-screen w-full -mt-8">
      <div className="w-[25rem] h-[479px] ms-6 sm:ms-0 lg:mt-0 border-2 border-gradient-to-r border-mainBg rounded-e-md py-8 shadow-2xl flex justify-center items-center flex-col ">
        <p className="text-2xl font-bold text-center p-4 text-mainBg">
          Register new account
        </p>
        <div className="flex items-center flex-col h-[45rem] w-96 gap-4">
          <InputComponent
            label="Name"
            icon={<AtSign className="mt-1" />}
            name="name"
            type="name"
          />
          <InputComponent
            label="Email"
            icon={<User className="mt-1" />}
            name="email"
            type="email"
          />
          <PasswordInputComponent
            label="Password"
            type="password"
            icon={<Lock className="mt-1" />}
            name="password"
          />

          <button
            type="submit"
            className="w-48 py-2 mt-4 text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
          >
            Register
          </button>

          <div className="flex items-center gap-1">
            <p>Already have an account?</p>
            <a href="/login" className="font-bold text-mainBg">
              Login
            </a>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Register;
