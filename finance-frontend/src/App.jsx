import "./App.css";
import Dashboard from "./components/Dashboard";
import Savings from "./components/Savings";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";
import History from "./components/History";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/history" element={<History />} />
        <Route path="/savings" element={<Savings />} />
      </Routes>
    </BrowserRouter>
  );
}
