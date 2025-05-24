import { createRoot } from "react-dom/client";
import HeroSection from "./layouts/HeroSection";
import Navbar from "./layouts/Navbar";
import Products from "./pages/Products";
import { TopProducts } from "./pages/Products";
import { MedicalProducts } from "./pages/Products";
import { UpcomingProducts } from "./pages/Products";
import Services from "./pages/Services";
import Footer from "./layouts/Footer";
import Banner from "./components/Banner";
import Blog from "./components/Blog";
import PromoCard from "./components/PromoCard";
import Stats from "./components/Stats";
import "./assets/tailwind.css";

createRoot(document.getElementById("root")).render(
  <div id="app-container">
    <Navbar />
    <HeroSection />
    <Services />
    <Products />
    <PromoCard />
    <TopProducts />
    <Stats />
    <MedicalProducts />
    <UpcomingProducts />
    <Banner />
    <Blog />
    <Footer />
  </div>
);
