
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Categories from "./pages/Categories";
import CategoryTools from "./pages/CategoryTools";
import ToolDetail from "./pages/ToolDetail";
import SubmitTool from "./pages/SubmitTool";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import AddTool from "./pages/admin/AddTool";
import AdminTools from "./pages/admin/AdminTools";
import EditTool from "./pages/admin/EditTool";
import AdminReviews from "./pages/admin/AdminReviews";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/category/:categoryName" element={<CategoryTools />} />
          <Route path="/tool/:id" element={<ToolDetail />} />
          <Route path="/submit" element={<SubmitTool />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/admin/add-tool" element={<AddTool />} />
          <Route path="/admin/tools" element={<AdminTools />} />
          <Route path="/admin/edit-tool/:id" element={<EditTool />} />
          <Route path="/admin/reviews" element={<AdminReviews />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
