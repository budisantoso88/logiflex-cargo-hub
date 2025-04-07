
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import CreateListing from "./pages/CreateListing";
import Profile from "./pages/Profile";
import TokenPurchase from "./pages/TokenPurchase";
import Search from "./pages/Search";
import Messages from "./pages/Messages";
import ChatPage from "./pages/ChatPage";
import ListingHistory from "./pages/ListingHistory";
import Settings from "./pages/Settings";
import NotificationsPage from "./pages/NotificationsPage";
import ListingDetail from "./pages/ListingDetail";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/create" element={<CreateListing />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/tokens" element={<TokenPurchase />} />
          <Route path="/search" element={<Search />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/chat/:id" element={<ChatPage />} />
          <Route path="/listing-history" element={<ListingHistory />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="/listing/:id" element={<ListingDetail />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
