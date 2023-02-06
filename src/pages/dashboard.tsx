import Header from "../components/Header";
import Nav from "../components/Nav";
import DashboardComponent from "../components/Dashboard";
import Footer from "../components/Footer";

export default function Dashboard() {
  return (
    <>
      <Header />
      <main>
        <Nav />
        <DashboardComponent />
        <Footer />
      </main>
    </>
  );
}
