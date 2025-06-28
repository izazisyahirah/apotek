import "./assets/tailwind.css";
import { Route, Routes } from "react-router-dom";
import React, { Suspense } from "react";

const MainLayout = React.lazy(() => import("./layouts/MainLayout"));
const Error400 = React.lazy(() => import("./pages/Error/Error400"));
const Error401 = React.lazy(() => import("./pages/Error/Error401"));
const Error403 = React.lazy(() => import("./pages/Error/Error403"));
const Error404 = React.lazy(() => import("./pages/Error/Error404"));
const About = React.lazy(() => import("./pages/About"));
const Medicine = React.lazy(() => import("./pages/Medicine"));
const MedicineDetail = React.lazy(() => import("./pages/MedicineDetail"))
const MedicalProduct = React.lazy(() => import("./pages/MedicalProduct"));
const MedicalDetail = React.lazy(() => import("./pages/MedicalDetail"))

import Loading from"./components/Loading";
const HeroSection = React.lazy(() => import("./components/HeroSection"));
const Services = React.lazy(() => import("./components/Services"));
import Products, { TopProducts } from "./components/Products";
import Review from "./pages/Review";
import Profile from "./pages/Profile";
const PromoCard = React.lazy(() => import("./components/PromoCard"));
const Stats = React.lazy(() => import("./components/Stats"));
const Banner = React.lazy(() => import("./components/Banner"));
const Blog = React.lazy(() => import("./components/Blog"));

const AuthLayout = React.lazy(() => import("./layouts/AuthLayout"));
const Login = React.lazy(() => import("./pages/Auth/Login"));
const Register = React.lazy(() => import("./pages/Auth/Register"));
const Forgot = React.lazy(() => import("./pages/Auth/Forgot"));

function App() {
  return (
    <div id="app-container">
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route element={<MainLayout />}>
            <Route
              path="/"
              element={
                <>
                  <HeroSection />
                  <Services />
                  <Products />
                  <PromoCard />
                  <TopProducts />
                  <Stats />
                  <Banner />
                  <Blog />
                </>
              }
            />
            <Route path="/medicine" element={<Medicine />} />
            <Route path="/medicine/:id" element={<MedicineDetail />} /> 
            <Route path="/medical-product" element={<MedicalProduct />} />
            <Route path="/medical-product/:id" element={<MedicalDetail />} />
            <Route path="/review" element={<Review />} /> 
            <Route path="/about" element={<About />} />
            <Route path="/profile" element={<Profile />} />

            <Route path="/400" element={<Error400 />} />
            <Route path="/401" element={<Error401 />} />
            <Route path="/403" element={<Error403 />} />
            <Route path="*" element={<Error404 />} />
          </Route>

          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot" element={<Forgot />} />
          </Route>
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;