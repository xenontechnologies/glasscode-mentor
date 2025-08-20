import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import { LandingPage } from "./pages/LandingPage";
import { Dashboard } from "./pages/Dashboard";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Settings } from "./pages/SettingsMain";
import {
  ProfileSettings,
  ApiKeysSettings,
  IntegrationsSettings,
  NotificationsSettings,
  AnalysisSettings,
  BillingSettings,
  SecuritySettings,
  ExportSettings,
  DeleteSettings
} from "./pages/settings";
import { History } from "./pages/History";
import { Team } from "./pages/Team";
import { Docs } from "./pages/Docs";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/settings/profile" element={<ProfileSettings />} />
            <Route path="/settings/api-keys" element={<ApiKeysSettings />} />
            <Route path="/settings/integrations" element={<IntegrationsSettings />} />
            <Route path="/settings/notifications" element={<NotificationsSettings />} />
            <Route path="/settings/analysis" element={<AnalysisSettings />} />
            <Route path="/settings/billing" element={<BillingSettings />} />
            <Route path="/settings/security" element={<SecuritySettings />} />
            <Route path="/settings/export" element={<ExportSettings />} />
            <Route path="/settings/delete" element={<DeleteSettings />} />
            <Route path="/history" element={<History />} />
            <Route path="/team" element={<Team />} />
            <Route path="/docs" element={<Docs />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
