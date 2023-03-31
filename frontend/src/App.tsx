import { BrowserRouter } from "react-router-dom";
import "./App.scss";

import { AppRouter } from "./AppRouter";
import { Header } from "./components/app/header";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Header />
        <AppRouter />
      </div>
    </BrowserRouter>
  );
}

export default App;
