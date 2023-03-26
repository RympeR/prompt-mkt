import './App.css';
import { Header } from './components/app/header';
import { HomePage } from './pages/home';

function App() {
  return (
    <div className="app">
      <Header />

      <HomePage />
    </div>
  );
}

export default App;
