import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./Navigation";
import HomePage from "./HomePage";
import SignIn from "./SignIn";
import DisplayPreviousChat from "./DisplayPreviousChat";
import ChatInterface from "./ChatInterface";
import Dashboard from "./Dashboard.tsx";
import "./App.css";
import Footer from "./Footer";

function App() {
  return (
    <Router>
      {/*https://www.w3schools.com/react/react_router.asp*/}
      <Navigation />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/chat_interface" element={<ChatInterface />} />
          <Route path="/sign_in" element={<SignIn />} />
          <Route path="/previous_chat" element={<DisplayPreviousChat />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
