import { Outlet } from "react-router-dom";
import { Toaster } from 'sonner';
import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <div className="bg-bgPrimary min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow">
          <Outlet />
        </div>
        <Footer />
        <Toaster richColors position="top-center" />
      </div>
    </>
  );
}

export default App;
