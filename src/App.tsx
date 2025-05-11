import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation.tsx";
import HomePage from "./components/HomePage.tsx";
import SignIn from "./components/SignIn.tsx";
import DisplayPreviousChat from "./components/DisplayPreviousChat.tsx";
import ChatInterface from "./components/ChatInterface.tsx";
import Dashboard from "./components/Dashboard.tsx";
import CreateTeam from "./components/CreateTeam.tsx";
import CreateAgent from "./components/CreateAgent.tsx";
import PreviousChatsDashboard from "./components/PreviousChatsDashboard.tsx";
import { AuthProvider } from "./services/AuthContext.tsx";
import "./app.css";
import SelectTeam from "./components/SelectTeam.tsx";
import TeamChatInterface from "./components/TeamChatInterface.tsx";
import DeleteAccount from "./components/DeleteAccount.tsx";
import ChatInterfaceWebsockets from "./components/ChatInterfaceWebsockets.tsx";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navigation />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/chat_interface" element={<ChatInterface />} />
            <Route path="/sign_in" element={<SignIn />} />
            <Route
              path="/display_previous_chat/:chatName"
              element={<DisplayPreviousChat />}
            />

            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/create_team" element={<CreateTeam />} />
            <Route path="/create_agent" element={<CreateAgent />} />
            <Route path="/select_team" element={<SelectTeam />} />
            <Route
              path="/team_chat_interface"
              element={<TeamChatInterface />}
            />
            <Route path="/delete_user" element={<DeleteAccount />} />
            <Route
              path="/previous_chat_dashboard"
              element={<PreviousChatsDashboard />}
            />
            <Route
              path="/chat_interface_web_socket"
              element={<ChatInterfaceWebsockets />}
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
