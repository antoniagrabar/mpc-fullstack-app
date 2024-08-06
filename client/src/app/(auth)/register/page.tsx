"use client";

import { useState } from "react";
import RegisterForm from "@/components/forms/RegisterForm";
import SignUpSuccess from "@/components/auth/SignUpSuccess";

export default function RegisterPage() {
  const [signUpSuccess, setSignUpSuccess] = useState<boolean>(false);

  return (
    <div className="w-full h-screen bg-theme overflow-hidden flex justify-center items-center">
      <div className="rounded-xl border bg-card text-card-foreground shadow p-8 flex-center flex-col">
        {signUpSuccess ? (
          <SignUpSuccess />
        ) : (
          <RegisterForm setSignUpSuccess={setSignUpSuccess} />
        )}
      </div>
    </div>
  );
}
