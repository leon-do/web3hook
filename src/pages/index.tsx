import Head from "next/head";
import Nav from "../components/Nav";
import Hero from "../components/Hero";
import Feature from "../components/Feature";
import Transaction from "../components/Transaction";
import Event from "../components/Event";
import ViewFunction from "../components/ViewFunction";
import Pricing from "../components/Pricing";
import Footer from "../components/Footer";

export default function Home() {
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
        <Hero />
        <Feature />
        <Transaction />
        <Event />
        <ViewFunction />
        <Pricing />
        <Footer />
      </main>
    </>
  );
}
