import { Navigate, Route, Routes } from "react-router";
import { HirePage } from "./pages/hire";

import { HomePage } from "./pages/home";
import { MarketplacePage } from "./pages/marketplace";
import { SellPage } from "./pages/sell";
import Profile from "./pages/profile";
import { FAQ } from "./pages/faq";
import { Contact } from "./pages/contact";

export function AppRouter() {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<Navigate to={"home"} />} />
        <Route path="home" element={<HomePage />} />
        <Route path="hire" element={<HirePage />} />
        <Route path="marketplace" element={<MarketplacePage />} />
        <Route path="sell" element={<SellPage />} />
        <Route path="profile" element={<Profile />} />
        <Route path="faq" element={<FAQ />} />
        <Route path="contact" element={<Contact />} />
      </Route>
    </Routes>
  );
}
