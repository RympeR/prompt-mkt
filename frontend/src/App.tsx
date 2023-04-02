import { BrowserRouter } from "react-router-dom";
import "./App.scss";

import { AppRouter } from "./AppRouter";
import { Header } from "./components/app/header";
import { Footer } from "./components/app/footer";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Header />
        <AppRouter />
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
