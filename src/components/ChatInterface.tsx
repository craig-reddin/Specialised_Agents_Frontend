import { useState, useEffect, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { postQuestion, storeChat } from "../services/APIServices";
import AIImage1 from "../images/automation_cube.mp4";
import AIImage2 from "../images/education.png";
import AIImage3 from "../images/automation_lightbulb.mp4";
import Sidebar from "./SideBar";
import ChangeResponseFormat from "./ResponseFormat";
import "../Animation.css";

function ChatInterface() {
  // useState hook to change form data state
  const [formData, setFormData] = useState({
    questionForm: "",
  });
  const [loading, setLoading] = useState<boolean>(false);

  // useState hook to change the responseHTML
  // Store the HTML for responses
  const [responseHtml, setResponseHtml] = useState<string>("");
  // FUnction to handle the changes of for values and update state of form data
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Function called when the Submit button is clicked
  const generateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Display the lodingf icon
    setLoading(true);

    const data = {
      message: formData.questionForm,
    };

    try {
      const response = await postQuestion(data);
      // assign API call data returned to variable
      if (!response) {
        setLoading(false);
        return;
      }
      const formattedResponse = ChangeResponseFormat(response);

      // Update the state with the formatted response HTML
      setResponseHtml((prevHtml) => prevHtml + formattedResponse);
      //Get email from session storage
      const email = sessionStorage.getItem("SessionEmail");
      // Store the formatted data to be saved in the database
      const formattedData = {
        message: formattedResponse,
        email: email,
        chat_name: formData.questionForm,
      };
      // call asynchronous function to store the data.
      const response2 = await storeChat(formattedData);
      if (response2) {
        setFormData({
          questionForm: "",
        });
        setLoading(false);
      }
    } catch (error) {
      console.error("Error generating response:", error);
      //Clear the input field after sending
    }
  };

  return (
    // main container
    <div id="chat-interface-container">
      {/* Side bar */}
      <Sidebar />
      {/* Heading of page */}
      <h1 id="chat-interface-heading">
        Single Unspecialised Agent Conversation
      </h1>
      {/* container to wrap images */}
      <div id="chat-interface-image-container">
        <video loop autoPlay muted className="ai-coder-image" src={AIImage1}>
          Your browser does not support the video tag.
        </video>
        <img src={AIImage2} className="ai-coder-image" alt="Eductation Image" />
        <video loop autoPlay muted className="ai-coder-image" src={AIImage3}>
          Your browser does not support the video tag.
        </video>

        {/* <img src={AIImage3} className="ai-coder-image" alt="Python Image" />
        <img src={AIImage2} className="ai-coder-image" alt="HTML & CSS Image" />
        <img src={AIImage1} className="ai-coder-image" alt="Script Image" /> */}
      </div>
      <br></br>
      <br></br>

      {/* Container to display responses */}
      <div
        dangerouslySetInnerHTML={{
          __html: responseHtml,
        }}
      ></div>

      {/* Display loading icon when waiting for response */}
      {loading && (
        // <div className="loading-message">
        //   <div className="container">
        //     <div className="loader">
        //       <div className="crystal"></div>
        //       <div className="crystal"></div>
        //       <div className="crystal"></div>
        //       <div className="crystal"></div>
        //       <div className="crystal"></div>
        //       <div className="crystal"></div>
        //     </div>
        //   </div>
        // </div>
        <div className="animation-example">
          <div className="item">
            <div className="line"></div>
            <div className="dot"></div>
            <div className="circle"></div>
          </div>
          <div className="item">
            <div className="line"></div>
            <div className="dot"></div>
            <div className="circle"></div>
          </div>
          <div className="item">
            <div className="line"></div>
            <div className="dot"></div>
            <div className="circle"></div>
          </div>
          <div className="item">
            <div className="line"></div>
            <div className="dot"></div>
            <div className="circle"></div>
          </div>
          <div className="item -type2">
            <div className="line"></div>
            <div className="dot"></div>
            <div className="circle"></div>
          </div>
          <div className="item -type2">
            <div className="line"></div>
            <div className="dot"></div>
            <div className="circle"></div>
          </div>
          <div className="item -type2">
            <div className="line"></div>
            <div className="dot"></div>
            <div className="circle"></div>
          </div>
          <div className="item -type2">
            <div className="line"></div>
            <div className="dot"></div>
            <div className="circle"></div>
          </div>
          <div className="center">
            <div className="circle"></div>
            <div className="circle"></div>
            <div className="circle"></div>
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
            // input type - text area
            as="textarea"
            // name to identify input on formData
            name="questionForm"
            placeholder="Write Questions Here"
            value={formData.questionForm}
            // call handleChange when a change is made to field
            onChange={handleChange}
            //rows to display of text area
            rows={2}
            className="chat-question-text-area"
            // Field is required when submitting the form.
            required
          />
        </Form.Group>
        {/* This is the submit button for the form */}
        <Button type="submit" id="cib" className="chat-interface-button">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default ChatInterface;
