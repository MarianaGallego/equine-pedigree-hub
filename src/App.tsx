import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "@/components/Layout";
import Dashboard from "./pages/Dashboard";
import Equinos from "./pages/Equinos";
import Propietarios from "./pages/Propietarios";
import Campeonatos from "./pages/Campeonatos";
import Usuarios from "./pages/Usuarios";
import Arboles from "./pages/Arboles";
import Inscripciones from "./pages/Inscripciones";
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
            <Route path="/" element={<Dashboard />} />
            <Route path="/equinos" element={<Equinos />} />
            <Route path="/propietarios" element={<Propietarios />} />
            <Route path="/campeonatos" element={<Campeonatos />} />
            <Route path="/usuarios" element={<Usuarios />} />
            <Route path="/arboles" element={<Arboles />} />
            <Route path="/inscripciones" element={<Inscripciones />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
