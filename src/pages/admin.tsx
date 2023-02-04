import Head from "next/head";
import Nav from "../components/Nav";
import AdminComponent from "../components/Admin";
import Footer from "../components/Footer";

export default function Admin() {
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
        <AdminComponent />
        <Footer />
      </main>
    </>
  );
}
