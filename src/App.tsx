
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from "@/contexts/UserContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import JobHistory from "./pages/JobHistory";
import AssistantProfile from "./pages/AssistantProfile";
import Messages from "./pages/Messages";
import CalendarPage from "./pages/CalendarPage";
import NotificationsPage from "./pages/NotificationsPage";
import ProfilePage from "./pages/ProfilePage";

// Create a client outside of the component to avoid re-initialization on each render
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/job-history" element={<JobHistory />} />
            <Route path="/assistant/:id" element={<AssistantProfile />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/messages/:conversationId" element={<Messages />} />
            <Route path="/calendar" element={<CalendarPage />} />
            <Route path="/notifications" element={<NotificationsPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
        <Toaster />
        <Sonner />
      </UserProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
