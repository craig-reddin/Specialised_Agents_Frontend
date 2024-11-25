import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./Navigation";
import HomePage from "./HomePage";
import ChatInterface from "./ChatInterface";
import "./App.css";

function App() {
  return (
    <Router>
      <Navigation />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/chat_interface" element={<ChatInterface />} />
        </Routes>
      </div>
      <Navigation />
    </Router>
  );
}

export default App;
