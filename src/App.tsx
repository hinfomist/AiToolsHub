
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
import PendingTools from "./pages/admin/PendingTools";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminLayout from "./components/AdminLayout";

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
          <Route path="/admin/add-tool" element={
            <ProtectedRoute>
              <AdminLayout>
                <AddTool />
              </AdminLayout>
            </ProtectedRoute>
          } />
          <Route path="/admin/tools" element={
            <ProtectedRoute>
              <AdminLayout>
                <AdminTools />
              </AdminLayout>
            </ProtectedRoute>
          } />
          <Route path="/admin/edit-tool/:id" element={
            <ProtectedRoute>
              <AdminLayout>
                <EditTool />
              </AdminLayout>
            </ProtectedRoute>
          } />
          <Route path="/admin/reviews" element={
            <ProtectedRoute>
              <AdminLayout>
                <AdminReviews />
              </AdminLayout>
            </ProtectedRoute>
          } />
          <Route path="/admin/pending" element={
            <ProtectedRoute>
              <AdminLayout>
                <PendingTools />
              </AdminLayout>
            </ProtectedRoute>
          } />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
