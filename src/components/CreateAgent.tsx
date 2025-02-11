import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { createAgentAPICall } from "../services/APIServices";
import Sidebar from "./SideBar";

function CreateAgent() {
  const [formData, setFormData] = useState({
    agentSpecialisation: "",
    agentPrompt: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log("Form Data Submitted: ", formData);
    const email = sessionStorage.getItem("SessionEmail");

    const data = {
      specialisation: formData.agentSpecialisation,
      prompt: formData.agentPrompt,
      email: email,
    };
    try {
      const returnedMessage = await createAgentAPICall(data);
      if (returnedMessage.message === "Agent Created") {
        console.log("Hi " + returnedMessage.message);
        alert("Agent Successfully Saved");
      } else {
        alert("Agent Could Not Be Saved. \nPlease try again");
      }
    } catch {}
  };

  return (
    <div>
      <Sidebar />
      <h1>Agent Creation Page</h1>
      <br></br>
      <Form onSubmit={handleSubmit}>
        {/* Text Field */}
        <Form.Group className="mb-3">
          <Form.Label className="createAgentLabels">
            Agent Specialisation
          </Form.Label>
          <Form.Control
            className="createAgentFormInputs"
            type="text"
            name="agentSpecialisation"
            value={formData.agentSpecialisation}
            onChange={handleChange}
            placeholder="Enter specialisation here"
            required
          />
        </Form.Group>

        {/* Text Area */}
        <Form.Group className="mb-3">
          <Form.Label className="createAgentLabels">Description</Form.Label>
          <Form.Control
            className="createAgentFormInputs"
            as="textarea"
            name="agentPrompt"
            value={formData.agentPrompt}
            onChange={handleChange}
            rows={3}
            required
            placeholder="Enter the roles of your agent.
          Be precise and appoint specific roles and jobs to complete."
          />
        </Form.Group>

        {/* Submit Button */}
        <Button type="submit" id="cib" className="chat-interface-button">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default CreateAgent;
