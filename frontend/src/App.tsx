import './App.css';

import { AppRouter } from './AppRouter';
import { Header } from './components/app/header';
import { HomePage } from './pages/home';

function App() {
  return (
    <div className="app">
      <Header />

      <AppRouter />
    </div>
  );
}

export default App;
