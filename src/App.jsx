import { Route, Routes } from "react-router-dom";
import React, { lazy, Suspense } from "react";

// Lazy load the components (not bundled together, faster load speeds)
const Home = lazy(() => import("./pages/Home"));
const Register = lazy(() => import("./pages/Register"));
const NotFound = lazy(() => import("./pages/NotFound"));
const ServiceInfo = lazy(() => import("./pages/ServiceInfo"));

function App() {
  return (
    <div className="flex flex-col h-screen pt-6 gap-8">
      <div className="flex flex-col items-center gap-2">
        <div className="heading">TOTP Generator</div>
        <div>Generate TOTPs for 2 Factor Authentication</div>
      </div>
      <Suspense fallback={<div className="text-center">Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/:uuid" element={<ServiceInfo />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
