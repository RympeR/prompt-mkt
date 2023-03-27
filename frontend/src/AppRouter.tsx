import { Navigate, Route, Routes } from "react-router";

import { HomePage } from "./pages/home";
import { MarketplacePage } from "./pages/marketplace";

export function AppRouter() {
  return (
    <Routes>
    <Route path="/">
      <Route index element={<Navigate to={"home"} />} />
      <Route path="home" element={<HomePage />} />
      <Route path="marketplace" element={<MarketplacePage />} />
    </Route>
  </Routes>
  );
}
