import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect } from "react";

// https://github.com/nextauthjs/next-auth-example/blob/main/components/header.tsx
export default function Header() {
  const { data: session } = useSession();

  useEffect(() => {
    getKey();
  }, [session]);

  const getKey = async () => {
    if (session) {
      const apiKey = await fetch("./api/auth/apiKey")
        .then((res) => res.json())
        .then((json) => json.data);
      console.log(apiKey);
    }
  };

  const getNewKey = async () => {
    const newKey = await fetch("./api/auth/newKey")
      .then((res) => res.json())
      .then((json) => json.data);
    console.log(newKey);
  };

  if (session) {
    return (
      <>
        <button onClick={() => signOut()}>Sign out</button>
        <button onClick={() => getNewKey()}>Generate new API Key</button>
      </>
    );
  }
  return (
    <>
      <button onClick={() => signIn()}>Sign in</button>
    </>
  );
}
