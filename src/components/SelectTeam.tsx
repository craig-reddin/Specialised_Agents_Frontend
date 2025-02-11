import { useEffect, useState } from "react";
import Sidebar from "./SideBar";
import Table from "react-bootstrap/Table";
import { gatherTeams } from "../services/APIServices";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function SelectTeam() {
  let returnedResponse: any;
  const [teams, setTeams] = useState<
    [string, string, number, number, number][]
  >([]);
  const navigate = useNavigate();
  const email = sessionStorage.getItem("SessionEmail");
  // UseEffect to fetch previous chat data
  useEffect(() => {
    async function fetchChat() {
      try {
        const data = {
          email: email,
        };
        //call api services using asyncronous function.
        returnedResponse = await gatherTeams(data);
        setTeams(returnedResponse.message);
        //If an error occurs catch it and log the error for the moment.
      } catch (error) {
        console.log(error);
      }
    }
    fetchChat();
  }, []);
  // Handle selecting a chat (for example, navigate or display its content)
  const handleChatSelection = (returnedResponse: any) => {
    const [agentOne, agentTwo, agentThree] = returnedResponse;
    sessionStorage.setItem("CurrentAgentOne", agentOne);
    sessionStorage.setItem("CurrentAgentTwo", agentTwo);
    sessionStorage.setItem("CurrentAgentThree", agentThree);
    navigate("/team_chat_interface");
  };

  return (
    <div className="previous-chats-dashboard-container">
      <Sidebar />
      <h1 className="previous-chats-dashboard-heading">
        Select Team To Converse With
      </h1>
      <Table className="previous-chat-table" responsive bordered hover>
        <thead>
          <tr>
            <th>Team Name</th>
            <th>Team Description</th>
            <th>Agent One Number</th>
            <th>Agent Two Number</th>
            <th>Agent Three Number</th>
            <th>Select</th>
          </tr>
        </thead>
        <tbody>
          {teams.length > 0 ? (
            teams.map(([teams, description, one, two, three], index) => (
              <tr key={index}>
                <td className="chat-name">{teams}</td>
                <td className="chat-name">{description}</td>
                <td className="chat-name">{one}</td>
                <td className="chat-name">{two}</td>
                <td className="chat-name">{three}</td>
                <td>
                  <Button
                    variant="primary"
                    onClick={() => handleChatSelection([one, two, three])}
                  >
                    Select
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3}>No chats available</td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
}

export default SelectTeam;
