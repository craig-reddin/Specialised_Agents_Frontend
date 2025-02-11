import Sidebar from "./SideBar";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Chatbot from "../images/dashboard_chatbot.png";
import ChatbotTeam from "../images/dashboard_team_robots.png";
import PreviousChat from "../images/dashboard_chat.png";
import { useNavigate } from "react-router-dom";
// import { User } from "./User";
import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { SignInData } from "../components/SignInDataInterface";
import { reviewSignIn } from "../services/APIServices";
// import jwtDecode from "jwt-decode";

// https://react-bootstrap.netlify.app/docs/components/cards

//Icons used for this page
//https://www.flaticon.com/


function Dashboard() {
  const { isAuthenticated, user } = useAuth0();

  useEffect(() => {
    const logUserIn = async () => {
      if (isAuthenticated && user) {
        const email = user.email ?? "";
        const name = user.name ?? "";

        console.log(name)
        console.log(email)
        sessionStorage.setItem("SessionEmail", email);
        const data = { email: email, name: name };
        await reviewSignIn(data);
      }
    };
    logUserIn(); // Add parentheses to call the function
  }, [isAuthenticated, user]); // Add dependencies for useEffect

  const navigate = useNavigate();
  return (
    <div className="dashboard-component-wrapper">
      <h1 className="dashboard-heading">Dashboard</h1>
      <div className="dashboard-container">
        <Sidebar />
        <Card className="top-dashboard-cards">
          <img src={Chatbot} className="dashboard-image" alt="Robot Image" />
          <Card.Body>
            <Card.Title>Create Agent</Card.Title>
            <Card.Text>
              You can build a team of collaberative agents. You can choose
              preconfigured agents or configure your own agents and create a
              team.
            </Card.Text>
            <Button
              className="dashboard-buttons"
              onClick={() => navigate("/create_agent")}
            >
              Select Team
            </Button>
          </Card.Body>
        </Card>
        <Card className="top-dashboard-cards">
          <img
            src={ChatbotTeam}
            className="dashboard-image"
            alt="Robot Image"
          />
          <Card.Body>
            <Card.Title>Create Cutomised Team</Card.Title>
            <Card.Text>
              You can build a team of collaberative agents. You can choose
              preconfigured agents or configure your own agents and create a
              team.
            </Card.Text>
            <Button
              className="dashboard-buttons"
              onClick={() => navigate("/create_team")}
            >
              Create Team
            </Button>
          </Card.Body>
        </Card>

        <Card className="top-dashboard-cards">
          <img
            src={PreviousChat}
            className="dashboard-image"
            alt="Robot Image"
          />
          <Card.Body>
            <Card.Title>View Previous Chats</Card.Title>
            <Card.Text>
              You can build a team of collaberative agents. You can choose
              preconfigured agents or configure your own agents and create a
              team.
            </Card.Text>
            <Button
              className="dashboard-buttons"
              onClick={() => navigate("/previous_chat_dashboard")}
            >
              Select Team
            </Button>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}

export default Dashboard;

