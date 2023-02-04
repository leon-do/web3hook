import Header from "../components/Header";
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
      <Header />
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
