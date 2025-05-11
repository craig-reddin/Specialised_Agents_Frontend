import Sidebar from "./SideBar";
import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { storeTeam, gatherAgents } from "../services/APIServices";
import { Form, Button } from "react-bootstrap";

function CreateAgentTeam() {
  // email retrived from session storage
  const email = sessionStorage.getItem("SessionEmail");
  //hoot to update number of agents selected for team
  const [selectionCount, setSelectionCount] = useState(0);

  //hook to udate the form data
  const [formData, setFormData] = useState({
    teamName: "",
    teamDescription: "",
    agentOne: -1,
    agentTwo: -1,
    agentThree: -1,
  });
  // State to store agents retrieved from the backend
  const [agents, setAgents] = useState<[string, string, number][]>([]);

  // State hook to track the Id's of selected agents
  const [selectedAgentIds, setSelectedAgentIds] = useState<number[]>([]);
  // UseEffect to fetch previous chat data
  useEffect(() => {
    //asychronous method to fetch data
    async function fetchChat() {
      try {
        // payload for api call
        const data = {
          email: email,
        };
        //call api services using asyncronous function.
        const AgentsReturned = await gatherAgents(data);
        //// Store the returned agents
        setAgents(AgentsReturned.message);
      } catch (error) {
        alert("There was an issue loading in agents. please try again please");
        console.log(error);
      }
    }
    //call async function
    fetchChat();
  }, []);
  // Handle selecting a chat (for example, navigate or display its content)
  const handleChatSelection = (agentId: number) => {
    if (selectionCount >= 3) {
      //inform the user if they try to select more than 3 agents and return so no further code is executed
      alert("You can only select three agents.");
      return;
    }
    // Update the formData state with the selected agent id
    setFormData((prevData) => {
      let updatedData = { ...prevData };
      //selection count will determine form data component update
      if (selectionCount === 0) {
        formData.agentOne = agentId;
      } else if (selectionCount === 1) {
        formData.agentTwo = agentId;
      } else if (selectionCount === 2) {
        formData.agentThree = agentId;
      }
      //logging for testing
      console.log(
        formData.agentOne,
        +" " + formData.agentTwo,
        +" " + formData.agentThree
      );

      return updatedData;
    });

    setSelectionCount((prevCount) => prevCount + 1);
    // Track selected Id's
    setSelectedAgentIds((prevIds) => [...prevIds, agentId]);
  };

  // Method used to pull the name and values of the input fields.
  // Updates the formData. Called when a change is made on the text field or text area
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  // Method called when the submit button is clicked
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    //formData agentOne, agentTwo and agentThree are Arrays, check if array or not and if so pass value from index 0 to agentOneform.
    const agentOneform = Array.isArray(formData.agentOne)
      ? formData.agentOne[0]
      : formData.agentOne;
    const agentTwoform = Array.isArray(formData.agentTwo)
      ? formData.agentTwo[0]
      : formData.agentTwo;
    const agentThreeform = Array.isArray(formData.agentThree)
      ? formData.agentThree[0]
      : formData.agentThree;

    //payload for the api call
    const data = {
      teamName: formData.teamName,
      userEmail: email,
      teamDescription: formData.teamDescription,
      agentOne: agentOneform,
      agentTwo: agentTwoform,
      agentThree: agentThreeform,
    };

    //Testing log ensuring the format is correct
    console.log(data);

    //check and ensure all agents have been select and are not equal to default value set.  notify the user.
    //If equal to default value
    if (
      data.agentOne === -1 ||
      data.agentTwo === -1 ||
      data.agentThree === -1
    ) {
      alert("Please select three agents to create a team");
      return;
    }
    try {
      // call storeTeam method from APIServices - pass data
      const returnedMessage = await storeTeam(data);
      //Check the value for returnedMessage.response and value determine action.
      if (returnedMessage.response === "Team stored") {
        //alert to user
        alert("Team Successfully Saved");
        //reset form data values
        formData.teamDescription = "";
        formData.teamName = "";
        setSelectedAgentIds([]);
        setSelectionCount(0);
      } else {
        alert("Team Could Not Be Saved. Please try again");
      }
    } catch {
      alert("Team Could Not Be Saved. Please try again");
    }
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
            id="team-name-create"
          />
        </Form.Group>

        {/* Text Area */}
        <Form.Group className="mb-3">
          {/* Label */}
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
            id="team-description-create"
          />
        </Form.Group>

        {/* Submit Button */}
        <Button type="submit" id="cib" className="chat-interface-button">
          Submit
        </Button>
      </Form>

      {/* Bootstrap Table - responsive when hover over columns*/}
      <Table className="agent-table" responsive bordered hover>
        <thead>
          <tr>
            {/* Colmumn headings */}
            <th className="agent-table-id-column">Agent Id</th>
            <th className="agent-table-specialisation-column">
              Agent Specialisation
            </th>
            <th className="agent-table-prompt-column">Agent Prompt</th>
            <th className="agent-table-button-column">Select</th>
          </tr>
        </thead>

        <tbody>
          {/* check agents is an array and the length is greater than 0
           if so, map through them and allocate the specialisations, Ids, Buttons and configurations to the table  */}
          {Array.isArray(agents) && agents.length > 0 ? (
            agents.map(([specialisation, config, id], index) => (
              <tr key={index}>
                <td>{id}</td>
                <td>{specialisation}</td>
                <td>{config}</td>
                <td>
                  <div>
                    <Button
                      id={`agent-select-team-${index}`}
                      variant="primary"
                      onClick={() => handleChatSelection(id)}
                      disabled={selectedAgentIds.includes(id)}
                    >
                      Select
                    </Button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              {/* if the agents array is empty a message will appear. made 4 cols to ensure the presentation was nicer for the user */}
              <td colSpan={4}>No Agents Available</td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
}

export default CreateAgentTeam;
