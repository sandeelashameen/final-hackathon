import './App.css';
import { Route, Routes } from "react-router-dom";
import Auth from './Pages/Auth';
import Home from './Pages/Home';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Auth />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  );
}

export default App;
