import { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
// Importing the createAgentAPICall function from the APIServices file
import { createAgentAPICall } from "../services/APIServices";
// Importing Sidebar component for navigation
import Sidebar from "./SideBar";

// Functional component to create an agent
function CreateAgent() {
  // useState hook to manage the input values
  const [formData, setFormData] = useState({
    // State for agent specialisation input
    agentSpecialisation: "",
    // State for agent prompt input
    agentPrompt: "",
  });

  // Method used to pull the name and values of the input fields.
  // Updates the formData. Called when a change is made on the text field or text area
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      // Copying the previous state
      ...formData,
      // Updating the changed field
      [name]: value,
    });
  };

  // Method used when the submit button is clicked
  const handleSubmit = async (e: any) => {
    // Used to prevent the default form submission behavior
    e.preventDefault();
    // Console log for testing to see form data on submission
    console.log("Form Data Submitted: ", formData);
    // Session storage email is set after authentication of user using Auth0
    const email = sessionStorage.getItem("SessionEmail");

    // Data to be sent to the backend
    const data = {
      // Agent's specialisation
      specialisation: formData.agentSpecialisation,
      // Agent's prompt
      prompt: formData.agentPrompt,
      // User's email
      email: email,
    };

    // Try catch block for API call and error handling
    try {
      // Call createAgentAPICall in APIServices.tsx file
      const returnedMessage = await createAgentAPICall(data);
      // If the payload's message is 'Agent Created', alert and inform the user
      if (returnedMessage.message === "Agent Created") {
        alert("Agent Successfully Saved");
        setFormData({
          // State for agent specialisation input
          agentSpecialisation: "",
          // State for agent prompt input
          agentPrompt: "",
        });
      }
      // If the agent could not be saved, alert the user
      else {
        alert("Agent Could Not Be Saved. \nPlease try again");
      }
    } catch {
      // Catch and handle any errors during the API call
      alert("Agent Could Not Be Saved. \nPlease try again");
    }
  };

  return (
    // Sidebar for navigation
    <div>
      <Sidebar />
      {/* Heading of the page */}
      <h1>Agent Creation Page</h1>
      <br></br>
      {/* Form to create an agent */}
      <Form onSubmit={handleSubmit}>
        {/* Text Field for Agent Specialisation */}
        <Form.Group className="mb-3">
          <Form.Label className="createAgentLabels">
            Agent Specialisation
          </Form.Label>
          <Form.Control
            // Input type is text
            type="text"
            // Identifies the input in formData
            name="agentSpecialisation"
            // Binds input value
            value={formData.agentSpecialisation}
            // Calls handleChange when input changes
            onChange={handleChange}
            // Placeholder text
            placeholder="Enter specialisation here"
            // Field is required
            required
            // Styling for the input field
            className="createAgentFormInputs"
            id="agent-specialisation-create"
          />
        </Form.Group>

        {/* Text Area for Agent Description */}
        <Form.Group className="mb-3">
          <Form.Label className="createAgentLabels">Description</Form.Label>
          <Form.Control
            // Input type is a text area
            as="textarea"
            // Identifies the input in formData
            name="agentPrompt"
            // Binds input value
            value={formData.agentPrompt}
            // Calls handleChange when input changes
            onChange={handleChange}
            // Number of rows for the text area
            rows={3}
            // Field is required
            required
            // Placeholder text
            placeholder="Enter the roles of your agent.
          Be precise and appoint specific roles and jobs to complete."
            // Styling for the text area
            className="createAgentFormInputs"
            id="agent-description-create"
          />
        </Form.Group>

        {/* Submit Button for the Form */}
        <Button
          // Button type is submit
          type="submit"
          // Styling for the submit button
          id="cib"
          className="chat-interface-button"
        >
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default CreateAgent;
