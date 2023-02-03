import Head from "next/head";
import Nav from "../components/Nav";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();
  return (
    <>
      <Head>
        <title>Web3Hook</title>
        <meta name="description" content="No Code Web3 Automation" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Nav />
        <div>Admin</div>
      </main>
    </>
  );
}
