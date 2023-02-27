import Header from "../components/Header";
import Footer from "../components/Footer";
import styles from "./index.module.scss";


const MainLayout = ({ children }) => {
  return (
    <>
      <Header />
      <main>
        <div className="flex flex-col min-h-screen">
          {children}
        </div>
      </main>
      <Footer />
    </>
  );
}

export default MainLayout;