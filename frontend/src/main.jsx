import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/root";
import LoginPage from "./routes/login";
import RegisterPage from "./routes/register";
import Home from "./routes/home";
import { Toaster } from "sonner";
import { AuthProvider } from "./provider/AuthProvider";
import ProtectedRoute from "./routes/protectedroute";
import ProfilePage from "./routes/profile";
import HealthInsight from "./routes/healthinsight";
import { GeneralDiseasePage } from "./routes/health-insights/general-disease";
import Reports from "./routes/reports/reports";
import { supabase } from "./utils/client";
import ReportDetails from "./routes/reports/reportDetails";
import { DiabetesPage } from "./routes/health-insights/diabetes";
import { KidneyPage } from "./routes/health-insights/kidney";
import { HeartPage } from "./routes/health-insights/heart";
import PatientData from "./routes/doctor-routes/patientdata";
import ManageAppointments from "./routes/doctor-routes/manageAppointments";
import Appointment from "./routes/appointment";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Root />,
      children: [
        {
          path: "/",
          element: <Home />,
        },

        {
          path: "/profile",
          element: (
            <ProtectedRoute>
              <ProfilePage></ProfilePage>
            </ProtectedRoute>
          ),
        },
        {
          path: "/login",
          element: <LoginPage />,
        },
        {
          path: "/register",
          element: <RegisterPage />,
        },
        {
          path: "/health-insights",
          element: (
            <ProtectedRoute requiredRole={"patient"}>
              <HealthInsight />
            </ProtectedRoute>
          ),
        },
        {
          path: "/health-insights/general",
          element: (
            <ProtectedRoute requiredRole={"patient"}>
              <GeneralDiseasePage />
            </ProtectedRoute>
          ),
        },
        {
          path: "/health-insights/diabetes",
          element: (
            <ProtectedRoute requiredRole={"patient"}>
              <DiabetesPage />
            </ProtectedRoute>
          ),
        },
        {
          path: "/health-insights/kidney",
          element: (
            <ProtectedRoute requiredRole={"patient"}>
              <KidneyPage />
            </ProtectedRoute>
          ),
        },
        {
          path: "/health-insights/heart",
          element: (
            <ProtectedRoute requiredRole={"patient"}>
              <HeartPage />
            </ProtectedRoute>
          ),
        },
        {
          path: "/appointments",
          element: (
            <ProtectedRoute requiredRole={"patient"}>
              <Appointment />
            </ProtectedRoute>
          ),
        },
        {
          path: "/reports",
          element: (
            <ProtectedRoute requiredRole={"patient"}>
              <Reports />
            </ProtectedRoute>
          ),
        },
        {
          path: "/reports/:id",
          element: (
            <ProtectedRoute requiredRole={"patient"}>
              <ReportDetails />
            </ProtectedRoute>
          ),
          loader: async ({ params }) => {
            const { data, error } = await supabase
              .from("reports")
              .select("*")
              .eq("id", params.id)
              .single();

            if (error) {
              throw new Error(error.message);
            }

            return data;
          },
        },
        // DOCTOR ROUTES
        {
          path: "/patient-data",
          element: (
            <ProtectedRoute requiredRole={"doctor"}>
              <PatientData />
            </ProtectedRoute>
          ),
        },
        {
          path: "/manage-appointments",
          element: (
            <ProtectedRoute requiredRole={"doctor"}>
              <ManageAppointments />
            </ProtectedRoute>
          ),
        },
      ],
    },
  ],
  {
    future: {
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_relativeSplatPath: true,
      v7_skipActionErrorRevalidation: true,
    },
  }
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <Toaster richColors />
      <RouterProvider router={router} future={{ v7_startTransition: true }} />
    </AuthProvider>
  </StrictMode>
);
