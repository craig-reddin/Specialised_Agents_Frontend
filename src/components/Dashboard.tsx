import Sidebar from "./SideBar";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import ChatbotTeam from "../images/create_team.png";
import PreviousChat from "../images/prev_chats.png";
import { useNavigate } from "react-router-dom";
// import { User } from "./User";
import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { reviewSignIn } from "../services/APIServices";
import AIImage3 from "../images/agent_create2.png";

// import jwtDecode from "jwt-decode";

// https://react-bootstrap.netlify.app/docs/components/cards

//Icons used for this page
//https://www.flaticon.com/

function Dashboard() {
  //Auth0 hooks, Authenticated boolen return is the user is authenticated.
  //user - is a token containing user information
  const { isAuthenticated, user } = useAuth0();

  //useEffect
  useEffect(() => {
    const logUserIn = async () => {
      if (isAuthenticated && user) {
        //assign token values
        const email = user.email ?? "";
        const name = user.name ?? "";

        //testing logs
        console.log(name);
        console.log(email);
        //store the email of the user in session storage
        sessionStorage.setItem("SessionEmail", email);
        //data to be sent
        const data = { email: email, name: name };
        //call the reviewSignIn to ensure if this is the users first visit to save their email to the database
        await reviewSignIn(data);
      }
    };
    //call the logUserIn method
    logUserIn(); // Add parentheses to call the function
  }, [isAuthenticated, user]); //pass dependencies for useEffect

  //used to navigate to different pages
  const navigate = useNavigate();
  return (
    <div className="dashboard-component-wrapper">
      <h1 className="dashboard-heading">Dashboard</h1>
      <div className="dashboard-container">
        <Sidebar />
        <Card className="top-dashboard-cards">
          <img src={AIImage3} className="dashboard-image" alt="Robot Image" />
          <Card.Body>
            <Card.Title>Create Agent</Card.Title>
            <Card.Text>
              Configure agents to your own needs. Add 3 of them to a team and
              converse with the team. You are required to enter a Specialisation
              and Desctiption for each agent, once filled, please submit
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
              You can build a team of collaberative agents from the agents you
              have configured and created. Once Created, navigate to Select
              existing team aqnd select your team to troubleshoot with.
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
              team. Converse with the team to solve problems collaberatively.
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
