
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import Index from "./pages/Index";
import Categories from "./pages/Categories";
import CategoryTools from "./pages/CategoryTools";
import CategoryPage from "./pages/CategoryPage";
import ToolDetail from "./pages/ToolDetail";
import SubmitTool from "./pages/SubmitTool";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import AddTool from "./pages/admin/AddTool";
import AdminTools from "./pages/admin/AdminTools";
import EditTool from "./pages/admin/EditTool";
import AdminReviews from "./pages/admin/AdminReviews";
import PendingTools from "./pages/admin/PendingTools";
import ManageBlogs from "./pages/admin/ManageBlogs";
import AddBlog from "./pages/admin/AddBlog";
import EditBlog from "./pages/admin/EditBlog";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Privacy from "./pages/Privacy";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminLayout from "./components/AdminLayout";
import DatabaseInitializer from "./components/DatabaseInitializer";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <TooltipProvider>
        <DatabaseInitializer />
        <Toaster />
        <Sonner />
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/category/:categoryName" element={<CategoryPage />} />
          <Route path="/tool/:id" element={<ToolDetail />} />
          <Route path="/submit" element={<SubmitTool />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<Privacy />} />
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
          <Route path="/admin/blogs" element={
            <ProtectedRoute>
              <AdminLayout>
                <ManageBlogs />
              </AdminLayout>
            </ProtectedRoute>
          } />
          <Route path="/admin/add-blog" element={
            <ProtectedRoute>
              <AdminLayout>
                <AddBlog />
              </AdminLayout>
            </ProtectedRoute>
          } />
          <Route path="/admin/edit-blog/:id" element={
            <ProtectedRoute>
              <AdminLayout>
                <EditBlog />
              </AdminLayout>
            </ProtectedRoute>
          } />
          <Route path="*" element={<NotFound />} />
        </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
