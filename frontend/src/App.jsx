import { Route, Switch } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "./contexts/AuthContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import MainLayout from "./layouts/MainLayout";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import UnitDetails from "./pages/UnitDetails";
import Payments from "./pages/Payments";
import Voting from "./pages/Voting";
import Complaints from "./pages/Complaints";
import Documents from "./pages/Documents";
import Social from "./pages/Social";
import Visitors from "./pages/Visitors";
import Legal from "./pages/Legal";
import Settings from "./pages/Settings";
import Meetings from "./pages/Meetings";
import Accounting from "./pages/Accounting";
import Services from "./pages/Services";
import Alerts from "./pages/Alerts";
import AgentEvaluation from "./pages/AgentEvaluation";
import ResidenceSetup from "./pages/ResidenceSetup";
import NotFound from "@/pages/not-found";
import "./i18n";

function AppRouter() {
  return (
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/" component={() => <MainLayout><Dashboard /></MainLayout>} />
      <Route path="/dashboard" component={() => <MainLayout><Dashboard /></MainLayout>} />
      <Route path="/unit-details" component={() => <MainLayout><UnitDetails /></MainLayout>} />
      <Route path="/payments" component={() => <MainLayout><Payments /></MainLayout>} />
      <Route path="/voting" component={() => <MainLayout><Voting /></MainLayout>} />
      <Route path="/complaints" component={() => <MainLayout><Complaints /></MainLayout>} />
      <Route path="/documents" component={() => <MainLayout><Documents /></MainLayout>} />
      <Route path="/social" component={() => <MainLayout><Social /></MainLayout>} />
      <Route path="/visitors" component={() => <MainLayout><Visitors /></MainLayout>} />
      <Route path="/legal" component={() => <MainLayout><Legal /></MainLayout>} />
      <Route path="/settings" component={() => <MainLayout><Settings /></MainLayout>} />
      <Route path="/meetings" component={() => <MainLayout><Meetings /></MainLayout>} />
      <Route path="/accounting" component={() => <MainLayout><Accounting /></MainLayout>} />
      <Route path="/services" component={() => <MainLayout><Services /></MainLayout>} />
      <Route path="/alerts" component={() => <MainLayout><Alerts /></MainLayout>} />
      <Route path="/agents" component={() => <MainLayout><AgentEvaluation /></MainLayout>} />
      <Route path="/residences" component={() => <MainLayout><ResidenceSetup /></MainLayout>} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <LanguageProvider>
          <AuthProvider>
            <Toaster />
            <AppRouter />
          </AuthProvider>
        </LanguageProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
