import Sidebar from "./SideBar";
import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { storeTeam, gatherAgents } from "../services/APIServices";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function CreateAgentTeam() {
  const email = sessionStorage.getItem("SessionEmail");
  const [selectionCount, setSelectionCount] = useState(0);
  const [formData, setFormData] = useState({
    teamName: "",
    teamDescription: "",
    agentOne: -1,
    agentTwo: -1,
    agentThree: -1,
  });
  const [agents, setAgents] = useState<[string, string, number][]>([]);
  const [selectedAgentIds, setSelectedAgentIds] = useState<number[]>([]);
  const navigate = useNavigate();
  // UseEffect to fetch previous chat data
  useEffect(() => {
    async function fetchChat() {
      try {
        const data = {
          email: email,
        };
        //call api services using asyncronous function.
        const AgentsReturned = await gatherAgents(data);
        setAgents(AgentsReturned.message);
      } catch (error) {
        console.log(error);
      }
    }
    fetchChat();
  }, []);
  // Handle selecting a chat (for example, navigate or display its content)
  const handleChatSelection = (agentId: number) => {
    if (selectionCount >= 3) {
      alert("You can only select three agents.");
      return;
    }

    setFormData((prevData) => {
      let updatedData = { ...prevData };

      if (selectionCount === 0) {
        formData.agentOne = agentId;
      } else if (selectionCount === 1) {
        formData.agentTwo = agentId;
      } else if (selectionCount === 2) {
        formData.agentThree = agentId;
      }
      console.log(
        formData.agentOne,
        +" " + formData.agentTwo,
        +" " + formData.agentThree
      );
      return updatedData;
    });

    setSelectionCount((prevCount) => prevCount + 1);
    // Track selected IDs
    setSelectedAgentIds((prevIds) => [...prevIds, agentId]);
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const agentOneform = Array.isArray(formData.agentOne)
      ? formData.agentOne[0]
      : formData.agentOne;
    const agentTwoform = Array.isArray(formData.agentTwo)
      ? formData.agentTwo[0]
      : formData.agentTwo;
    const agentThreeform = Array.isArray(formData.agentThree)
      ? formData.agentThree[0]
      : formData.agentThree;

    const data = {
      teamName: formData.teamName,
      userEmail: email,
      teamDescription: formData.teamDescription,
      agentOne: agentOneform,
      agentTwo: agentTwoform,
      agentThree: agentThreeform,
    };

    console.log(data);

    if (
      data.agentOne === -1 ||
      data.agentTwo === -1 ||
      data.agentThree === -1
    ) {
      alert("Please select three agents to create a team");
      return;
    }
    try {
      const returnedMessage = await storeTeam(data);
      if (returnedMessage.response === "Team stored") {
        alert("Team Successfully Saved");
        formData.teamDescription = "";
        formData.teamName = "";
      } else {
        alert("Agent Could Not Be Saved. \nPlease try again");
      }
    } catch {}
  };

  return (
    <div className="previous-chats-dashboard-container">
      <Sidebar />
      <h1 className="team-agent-heading">Create Team Page</h1>
      <Form className="create-team-form" onSubmit={handleSubmit}>
        {/* Text Field */}
        <Form.Group className="mb-3">
          <Form.Label className="create-agent-labels">Team Name</Form.Label>
          <Form.Control
            className="createAgentFormInputs"
            type="text"
            name="teamName"
            value={formData.teamName}
            onChange={handleChange}
            placeholder="Enter Team Name Here"
            required
          />
        </Form.Group>

        {/* Text Area */}
        <Form.Group className="mb-3">
          <Form.Label className="create-agent-labels">
            Team Description
          </Form.Label>
          <Form.Control
            className="createAgentFormInputs"
            as="textarea"
            name="teamDescription"
            value={formData.teamDescription}
            onChange={handleChange}
            rows={3}
            required
            placeholder="Describe the teams potential uses."
          />
        </Form.Group>

        {/* Submit Button */}
        <Button type="submit" id="cib" className="chat-interface-button">
          Submit
        </Button>
      </Form>

      <Table className="agent-table" responsive bordered hover>
        <thead>
          <tr>
            <th className="agent-table-id-column">Agent Id</th>
            <th className="agent-table-specialisation-column">
              Agent Specialisation
            </th>
            <th className="agent-table-prompt-column">Agent Prompt</th>
            <th className="agent-table-button-column">Select</th>
          </tr>
        </thead>

        <tbody>
          {Array.isArray(agents) && agents.length > 0 ? (
            agents.map(([specialisation, config, id], index) => (
              <tr key={index}>
                <td>{id}</td>
                <td>{specialisation}</td>
                <td>{config}</td>
                <td>
                  <Button
                    variant="primary"
                    onClick={() => handleChatSelection(id)}
                    disabled={selectedAgentIds.includes(id)}
                  >
                    Select
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4}>No Agents Available</td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
}

export default CreateAgentTeam;
