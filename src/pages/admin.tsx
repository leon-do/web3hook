import Header from "../components/Header";
import Nav from "../components/Nav";
import AdminComponent from "../components/Admin";
import Footer from "../components/Footer";

export default function Admin() {
  return (
    <>
      <Header />
      <main>
        <Nav />
        <AdminComponent />
        <Footer />
      </main>
    </>
  );
}
