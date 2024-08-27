import { BrowserRouter, Route, Routes } from "react-router-dom";

import Product from "./pages/product";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Pricing from "./pages/Pricing";
import PageNavigation from "./components/PageNavigation";

export default function App() {
  return (
    <BrowserRouter>
      <PageNavigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="product" element={<Product />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
