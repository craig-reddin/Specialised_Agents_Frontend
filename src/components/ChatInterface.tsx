import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { postQuestion, storeChat } from "../services/APIServices";
import AIImage1 from "../images/CI11.png";
import AIImage2 from "../images/CI2.png";
import AIImage3 from "../images/CI3.png";
import Sidebar from "./SideBar";

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
  const [loading, setLoading] = useState<boolean>(false);

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
      setLoading(true);
      const response = await postQuestion(data);
      const formattedResponse = ChangeResponseFormat(response);

      // Update the state with the formatted response HTML
      setResponseHtml((prevHtml) => prevHtml + formattedResponse);

      // Store the formatted data to be saved in the database
      const formattedData = { message: formattedResponse };
      // asynchronous function to store the data.
      await storeChat(formattedData);
      setLoading(false);
    } catch (error) {
      console.error("Error generating response:", error);
    }
  };

  return (
    // main container
    <div id="chat-interface-container">
      <Sidebar />
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
      {/* https://uiverse.io/Z4drus/average-lizard-53 */}
      {/* Display loading icon when waiting for response */}
      {loading && (
        <div className="loading-message">
          <div className="container">
            <div className="loader">
              <div className="crystal"></div>
              <div className="crystal"></div>
              <div className="crystal"></div>
              <div className="crystal"></div>
              <div className="crystal"></div>
              <div className="crystal"></div>
            </div>
          </div>
        </div>
      )}

      {/*Bootstrap form components*/}
      <Form onSubmit={generateSubmit}>
        <Form.Group
          className="mb-3"
          controlId="chatQuestion"
          id="chat-question"
        >
          <Form.Control
            as="textarea"
            name="questionForm"
            placeholder="Write Questions Here"
            value={formData.questionForm}
            onChange={handleChange}
            rows={2}
            className="chat-question-text-area"
            required
          />
        </Form.Group>

        <Button type="submit" id="cib" className="chat-interface-button">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default ChatInterface;
