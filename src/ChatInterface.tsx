import { useState, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { postQuestion } from "./APIServices";
import AIImage from "./ai-image-2.jpeg";

// Function to format and return response as a string
function ChangeResponseFormat(response: any) {
  let formattedResponse = "";

  // Loop through the response array and append each message
  response.data.response.forEach((msg: string) => {
    formattedResponse += `<div id ="GeneratedResponsesContainer">${msg}</div><br /><br />`;
  });

  return formattedResponse.replace(/\n/g, "<br />");
}

function ChatInterface() {
  const [formData, setFormData] = useState({
    questionForm: "",
  });

  // Reference to the container where responses will be rendered
  const responseContainerRef = useRef<HTMLDivElement | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const generateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = { message: formData.questionForm };

    try {
      const response = await postQuestion(data);
      const formattedResponse = ChangeResponseFormat(response);

      if (responseContainerRef.current) {
        const responseDiv = document.createElement("div");
        responseDiv.innerHTML = formattedResponse;
        responseContainerRef.current.appendChild(responseDiv);
      }

      // Append the response to the state for record-keeping

      // Clear the question form
      // setFormData({ questionForm: "" });
    } catch (error) {
      console.error("Error generating response:", error);
    }
  };

  return (
    <div id="chat-interface-container">
      <h1 id="chat-interface-heading">Talk To Our Coding Agent</h1>
      <img src={AIImage} className="ai-coder-image" alt="AutoGen Image" />

      {/* Container to display responses */}
      <div ref={responseContainerRef}></div>

      <Form onSubmit={generateSubmit}>
        <Form.Group
          className="mb-3"
          controlId="chatQuestion"
          id="chat-question"
        >
          <Form.Label
            id="chat-question-title"
            className="custom-label-chat-interface"
          >
            Please Insert a Question
          </Form.Label>
          <Form.Control
            as="textarea"
            name="questionForm"
            placeholder="Write Questions Here"
            value={formData.questionForm}
            onChange={handleChange}
            rows={3}
            className="chat-question-text-area"
          />
        </Form.Group>

        <Button type="submit" className="chat-interface-button">
          Submit Question
        </Button>
      </Form>
    </div>
  );
}

export default ChatInterface;
