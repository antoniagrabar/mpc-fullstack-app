"use client";

import { useSession } from "next-auth/react";

const Welcome = () => {
  const session = useSession();

  return (
    <>
      {session.data?.user.name && (
        <h2 className="h2-bold mb-8">Welcome, {session.data.user.name}!</h2>
      )}
    </>
  );
};

export default Welcome;
