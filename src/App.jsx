// src/App.jsx
import { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import Footer from "./components/layout/Footer.jsx";
import Navbar from "./components/layout/Navbar.jsx";
import ProtectedRoute from "./components/routing/ProtectedRoute.jsx";

import StarsBackground from "./components/common/StarsBackground.jsx";

import ContactPage from "./pages/Contact.jsx";
import FeaturesPage from "./pages/Features.jsx";
import ForgotPasswordPage from "./pages/ForgotPassword.jsx";
import HomePage from "./pages/Home.jsx";
import LoginPage from "./pages/Login.jsx";
import RegisterPage from "./pages/Register.jsx";
import TestimonialsPage from "./pages/Testimonials.jsx";

// ⭐ Import TestFetch
import TestFetch from "./pages/TestFetch.jsx";

import AdminDashboard from "./pages/dashboard/AdminDashboard.jsx";
import UserDashboard from "./pages/dashboard/UserDashboard.jsx";

const App = () => (
  <div className="min-h-screen text-slate-800 transition dark:text-slate-100">
    {/* Background Stars */}
    <StarsBackground />

    <Navbar />

    <Suspense
      fallback={
        <div className="flex min-h-[60vh] items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
            <p className="text-lg font-semibold text-slate-700 dark:text-slate-200">
              Loading PlanSync...
            </p>
          </div>
        </div>
      }
    >
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/features" element={<FeaturesPage />} />
          <Route path="/testimonials" element={<TestimonialsPage />} />
          <Route path="/contact" element={<ContactPage />} />

          {/* ⭐ TestFetch route */}
          <Route path="/test-fetch" element={<TestFetch />} />

          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <UserDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin"
            element={
              <ProtectedRoute requireAdmin>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </Suspense>

    <Footer />
  </div>
);

export default App;
