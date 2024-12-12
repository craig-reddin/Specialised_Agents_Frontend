import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { postQuestion, storeChat } from "./APIServices";
import AIImage1 from "./images/CI11.png";
import AIImage2 from "./images/CI2.png";
import AIImage3 from "./images/CI3.png";

// Function to format and return response as a string
function ChangeResponseFormat(response: any) {
  let formattedResponse = "";

  // Loop through the response array and append each message
  response.data.response.forEach((msg: string) => {
    //adding divs around each message to ensure each message is styled accordingly.
    formattedResponse += `<div id="GeneratedResponsesContainer">${msg}</div><br /><br />`;
  });
  // replace all \n with <br /> g is used to imply chang all \n values
  return formattedResponse.replace(/\n/g, "<br />");
}

function ChatInterface() {
  //useState hook to change form data state
  const [formData, setFormData] = useState({
    questionForm: "",
  });

  //useState hook to change the responseHTML
  const [responseHtml, setResponseHtml] = useState<string>(""); // State to store the HTML for responses

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

      // Update the state with the formatted response HTML
      setResponseHtml((prevHtml) => prevHtml + formattedResponse);

      // Store the formatted data to be saved in the database
      const formattedData = { message: formattedResponse };
      // asynchronous function to store the data.
      await storeChat(formattedData);
    } catch (error) {
      console.error("Error generating response:", error);
    }
  };

  return (
    <div id="chat-interface-container">
      <h1 id="chat-interface-heading">Talk To Our Coding Agent</h1>
      <div id="chat-interface-image-container">
        <img src={AIImage3} className="ai-coder-image" alt="Python Image" />
        <img src={AIImage2} className="ai-coder-image" alt="HTML & CSS Image" />
        <img src={AIImage1} className="ai-coder-image" alt="Script Image" />
      </div>

      {/* Container to display responses */}
      <div
        dangerouslySetInnerHTML={{
          __html: responseHtml,
        }}
      ></div>

      {/*Bootstrap form components*/}
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

        <Button type="submit" id="cib" className="chat-interface-button">
          Submit Question
        </Button>
      </Form>
    </div>
  );
}

export default ChatInterface;
