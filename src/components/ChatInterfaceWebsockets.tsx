import { useState, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { storeChat } from "../services/APIServices";
import AIImage1 from "../images/DataAnalysis.mp4";
import AIImage2 from "../images/typing.mp4";
import Sidebar from "./SideBar";
import {
  connectSocket,
  sendMessage,
} from "../services/SocketService";
import { Socket } from "socket.io-client"; // Import the Socket type
import ChangeResponseFormat2 from "./ResponseFormat2";

function ChatInterfaceWebsockets() {
  const socketRef = useRef<Socket | null | undefined>(null);
  let wholeData = "";
  // useState hook to change form data state
  const [formData, setFormData] = useState({
    questionForm: "",
  });
  const [loading, setLoading] = useState<boolean>(false);


  // useState hook to change the responseHTML
  const [responseHtml, setResponseHtml] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const generateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);

    const userQuestion = formData.questionForm;
    const userMessage = `<div id="GeneratedResponsesContainer">${userQuestion.replace(
      /\n/g,
      "<br />"
    )}</div><br /><br />`;

    setResponseHtml((prevHtml) => prevHtml + userMessage);
    wholeData += userMessage;
    const socket = connectSocket();
    socketRef.current = socket;
    sendMessage(formData.questionForm);
    if(formData.questionForm == "TERMINATE"){
      setLoading(false);
    }
    if (socketRef.current) {
      socketRef.current.on("agent_message", (data) => {
        console.log("Agent Message Received:", data);

        const responseWs = data.content;
        console.log(responseWs);
        const currentLine = sessionStorage.getItem("SingleWS");
        console.log(currentLine);
        console.log(currentLine == responseWs)
        if (currentLine != responseWs && responseWs != null) {
          const formattedMessage = ChangeResponseFormat2(data.content);

          setResponseHtml((prevHtml) => prevHtml + formattedMessage);
          wholeData += formattedMessage;
          sessionStorage.setItem("SingleWS", responseWs);
        }
      });

      socketRef.current.on("processing_status", (data) => {
        if (data.status === "started") {
          setLoading(true);
        } else if (data.status === "completed_terminated") {
          setLoading(false);
          const email = sessionStorage.getItem("SessionEmail");

          const formattedData = {
            message: wholeData,
            email: email,
            chat_name: formData.questionForm,
          };
          storeChat(formattedData);
          wholeData = "";
          setLoading(false);
        }
      });
    }

    setFormData({
      questionForm: "",
    });
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
        <video loop autoPlay muted className="ai-coder-image" src={AIImage2}>
          Your browser does not support the video tag.
        </video>
        <video loop autoPlay muted className="ai-coder-image" src={AIImage1}>
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Container to display responses */}
      <div
        dangerouslySetInnerHTML={{
          __html: responseHtml,
        }}
      ></div>

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

export default ChatInterfaceWebsockets;
