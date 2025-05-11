import { useEffect, useState } from "react";
import Sidebar from "./SideBar";
import Table from "react-bootstrap/Table";
import { gatherTeams } from "../services/APIServices";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function SelectTeam() {
  let returnedResponse: any;
  //usestate hook to store the retrieved teams data from the database
  const [teams, setTeams] = useState<
    [string, string, number, number, number][]
  >([]);
  //Router hook used to navigate to the team_chat_interface
  const navigate = useNavigate();
  //assign email
  const email = sessionStorage.getItem("SessionEmail");
  // UseEffect to fetch previous chat data
  useEffect(() => {
    //async function to gather the team data when the page renders / component mounts
    async function fetchChat() {
      try {
        const data = {
          email: email,
        };
        //call api services using asyncronous function.
        returnedResponse = await gatherTeams(data);
        //teams is updates with teams data
        setTeams(returnedResponse.message);
        //If an error occurs catch it and log the error for the moment.
      } catch (error) {
        console.log(error);
      }
    }
    //call the fetch chat
    fetchChat();
  }, []);

  const handleChatSelection = (returnedResponse: any) => {
    //assign array to individual values
    const [agentOne, agentTwo, agentThree] = returnedResponse;

    //ensure the numbers stored are set to string for session storage
    sessionStorage.setItem("CurrentAgentOne", agentOne.toString());
    sessionStorage.setItem("CurrentAgentTwo", agentTwo.toString());
    sessionStorage.setItem("CurrentAgentThree", agentThree.toString());
    navigate("/team_chat_interface");
  };

  return (
    <div className="previous-chats-dashboard-container">
      {/* Sidebar navigation component */}
      <Sidebar />
      {/* Heading of the page */}
      <h1 className="previous-chats-dashboard-heading">
        Select Team To Converse With
      </h1>
      {/* Bootstrap table */}
      <Table className="previous-chat-table" responsive bordered hover>
        <thead>
          <tr>
            {/* Column Headings */}
            <th>Team Name</th>
            <th>Team Description</th>
            <th>Agent One Number</th>
            <th>Agent Two Number</th>
            <th>Agent Three Number</th>
            <th>Select</th>
          </tr>
        </thead>
        {/* table body */}
        <tbody>
          {/* map the teams if teams is greater than 0 into the table */}
          {Array.isArray(teams) && teams.length > 0 ? (
            //map data into columns and rows
            teams.map(([teamName, description, one, two, three], index) => (
              <tr key={index}>
                <td className="chat-name">{teamName}</td>
                <td className="chat-name">{description}</td>
                <td className="chat-name">{one}</td>
                <td className="chat-name">{two}</td>
                <td className="chat-name">{three}</td>
                <td>
                  <Button
                    variant="primary"
                    id="team-select-button"
                    //calls the handleChatSelection, passing the ids of the 3 agesnts selected
                    onClick={() => handleChatSelection([one, two, three])}
                  >
                    Select
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              {/* display text in a row if no chat are returned */}
              <td colSpan={6}>No chats available</td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
}

export default SelectTeam;
