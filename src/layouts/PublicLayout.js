import React from "react";

import { Outlet } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import ScrollToTop from "../components/ScrollToTop";

export default function PublicLayout() {
  return (
    <div className="app-layout">
      <Navbar />
      <main className="content">
        <Outlet />
      </main>
      <ScrollToTop/>
      <Footer />
    </div>
  );
}
