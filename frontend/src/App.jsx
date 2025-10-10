// src/App.jsx
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
import AccountingOverview from "./pages/accounting-overview";
import AccountingInvoices from "./pages/accounting-invoices";
import AccountingPayments from "./pages/accounting-payments";
import AccountingReports from "./pages/accounting-reports";
import AccountingNewPage from "./pages/accounting-newpage";
import UnionMembers from "./pages/union-members";
import UnionContracts from "./pages/union-contracts";
import UnionNewPage from "./pages/union-newpage";
import Services from "./pages/Services";
import Alerts from "./pages/Alerts";
import AgentEvaluation from "./pages/AgentEvaluation";
import ResidenceSetup from "./pages/ResidenceSetup";
import NotFound from "@/pages/not-found";
import "./i18n";

// Define the main application router
function AppRouter() {
  return (
    <Switch>
      <Route path="/login" component={Login} />
      {/* Wrap main pages with MainLayout */}
      <Route path="/" component={() => <MainLayout><Dashboard /></MainLayout>} />
      <Route path="/dashboard" component={() => <MainLayout><Dashboard /></MainLayout>} />
      <Route path="/manage-apartments" component={() => <MainLayout><ManageApartments /></MainLayout>} />
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
      <Route path="/accounting/overview" component={() => <MainLayout><AccountingOverview /></MainLayout>} />
      <Route path="/accounting/invoices" component={() => <MainLayout><AccountingInvoices /></MainLayout>} />
      <Route path="/accounting/payments" component={() => <MainLayout><AccountingPayments /></MainLayout>} />
      <Route path="/accounting/reports" component={() => <MainLayout><AccountingReports /></MainLayout>} />
      <Route path="/accounting/new-page" component={() => <MainLayout><AccountingNewPage /></MainLayout>} />
      <Route path="/services" component={() => <MainLayout><Services /></MainLayout>} />
      <Route path="/alerts" component={() => <MainLayout><Alerts /></MainLayout>} />
      <Route path="/agents" component={() => <MainLayout><AgentEvaluation /></MainLayout>} />
      <Route path="/residences" component={() => <MainLayout><ResidenceSetup /></MainLayout>} />
      <Route path="/union/members" component={() => <MainLayout><UnionMembers /></MainLayout>} />
      <Route path="/union/contracts" component={() => <MainLayout><UnionContracts /></MainLayout>} />
      <Route path="/union/new-page" component={() => <MainLayout><UnionNewPage /></MainLayout>} />
      {/* Fallback for unknown routes */}
      <Route component={NotFound} />
    </Switch>
  );
}

// Main App component
function App() {
  return (
    // This outer div ensures the App fills the #root container provided by index.html
    // h-full, min-h-full: Takes full height of parent (#root)
    // w-full: Takes full width
    // overflow-hidden: Prevents this div itself from scrolling, containing scroll behavior within children
    // flex flex-col: Allows for flexible layout of children if needed
  <div className="h-full min-h-full w-full flex flex-col">
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <LanguageProvider>
            <AuthProvider>
              {/* Toaster for displaying notifications */}
              <Toaster />
              {/* Main application content area */}
              {/* This inner div can handle vertical scrolling for the main content area if needed */}
              {/* flex-1: Allows this area to grow and fill available vertical space */}
              {/* overflow-y-auto: Enables vertical scrolling within this area if content overflows */}
              <div className="flex-1 overflow-y-auto">
                <AppRouter />
              </div>
            </AuthProvider>
          </LanguageProvider>
        </TooltipProvider>
      </QueryClientProvider>
    </div>
  );
}

export default App;