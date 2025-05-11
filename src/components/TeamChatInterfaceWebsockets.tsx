import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { storeChat } from "../services/APIServices";
import AIImage1 from "../images/CI11.png";
import AIImage2 from "../images/CI2.png";
import AIImage3 from "../images/CI3.png";
import Sidebar from "./SideBar";
import {
  connectSocket,
  disconnectSocket,
  sendPayload,
} from "../services/SocketService";

function TeamChatInterfaceWebsockets() {
  const [agentOne, setAgentOne] = useState("");
  const [agentTwo, setAgentTwo] = useState("");
  const [agentThree, setAgentThree] = useState("");
  let wholeData = "";

  //useState hook to change form data state
  const [formData, setFormData] = useState({
    questionForm: "",
  });
  const [loading, setLoading] = useState<boolean>(false);

  //useState hook to change the responseHTML
  const [responseHtml, setResponseHtml] = useState<string>("");

  // Added a flag to track if we've received a response

  useEffect(() => {
    loader();
  }, []);

  const loader = () => {
    setAgentOne(sessionStorage.getItem("CurrentAgentOne") || "");
    setAgentTwo(sessionStorage.getItem("CurrentAgentTwo") || "");
    setAgentThree(sessionStorage.getItem("CurrentAgentThree") || "");
  };

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

    // Format and add user message to the conversation
    const userQuestion = formData.questionForm;
    const userMessage = `<div id="GeneratedResponsesContainer">${userQuestion.replace(
      /\n/g,
      "<br />"
    )}</div><br /><br />`;

    // Update display and entireData
    setResponseHtml((prevHtml) => prevHtml + userMessage);
    wholeData += userMessage;

    // Create a new socket connection
    const socket = connectSocket();

    if (socket) {
      // Setup listeners
      socket.on("agent_message", (data) => {
        console.log(data.content + " Hi");

        const formattedMessage = `<div id="GeneratedResponsesContainer">${data.content.replace(
          /\n/g,
          "<br />"
        )}</div><br /><br />`;

        setResponseHtml((prevHtml) => prevHtml + formattedMessage);
        wholeData += formattedMessage;
      });

      socket.on("processing_status", (data) => {
        if (data.status === "started") {
          setLoading(true);
        } else if (data.status === "completed") {
          setLoading(false);
          disconnectSocket();

          const email = sessionStorage.getItem("SessionEmail");
          const dataToStore = {
            message: wholeData,
            email: email,
            chat_name: formData.questionForm,
          };

          console.log(
            "Storing chat after conversation completion:",
            dataToStore
          );

          storeChat(dataToStore).catch((error) => {
            console.error("Error storing chat:", error);
          });
          wholeData = "";
        }
      });

      if (socket) {
        // Now safely send payload after listeners are registered
        const dataPayload = {
          message: userQuestion,
          agentOne: agentOne,
          agentTwo: agentTwo,
          agentThree: agentThree,
        };

        sendPayload(dataPayload); // send over the active connection
      }
    }

    // Clear the input field after sending
    setFormData({
      questionForm: "",
    });
  };

  return (
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
      {/* Display loading message when waiting for response */}
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

export default TeamChatInterfaceWebsockets;
