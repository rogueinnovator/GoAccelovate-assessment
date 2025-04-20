import { signIn, signOut, useSession } from "next-auth/react";

const AuthButtons = () => {
  const { data: session } = useSession();

  return session ? (
    <>
      <button onClick={() => signOut()}>Logout</button>
    </>
  ) : (
    <>
      <button onClick={() => signIn()}>Login</button>
    </>
  );
};

export default AuthButtons;
