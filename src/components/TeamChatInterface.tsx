import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { postTeamQuestion, storeChat } from "../services/APIServices";
import AIImage1 from "../images/DataAnalysis.mp4";
import AIImage2 from "../images/typing.mp4";
import AIImage3 from "../images/travel.mp4";

import Sidebar from "./SideBar";
import ChangeResponseFormat from "./ResponseFormat";
import "../Animation.css";

function TeamChatInterface() {
  const [agentOne, setAgentOne] = useState("");
  const [agentTwo, setAgentTwo] = useState("");
  const [agentThree, setAgentThree] = useState("");

  //useState hook to change form data state
  const [formData, setFormData] = useState({
    questionForm: "",
  });
  const [loading, setLoading] = useState<boolean>(false);

  //useState hook to change the responseHTML
  const [responseHtml, setResponseHtml] = useState<string>("");

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

    const data = {
      message: formData.questionForm,
      agentOne: agentOne,
      agentTwo: agentTwo,
      agentThree: agentThree,
    };

    try {
      setLoading(true);
      const response = await postTeamQuestion(data);
      if (!response) {
        setLoading(false);
        return;
      }
      const formattedResponse = ChangeResponseFormat(response);

      // Update the state with the formatted response HTML
      setResponseHtml((prevHtml) => prevHtml + formattedResponse);
      const email = sessionStorage.getItem("SessionEmail");
      // Store the formatted data to be saved in the database
      const formattedData = {
        message: formattedResponse,
        email: email,
        chat_name: formData.questionForm,
      };
      // asynchronous function to store the data.

      const response2 = await storeChat(formattedData);

      if (!response2) {
        setLoading(false);
        return;
      }

      setFormData({
        questionForm: "",
      });
    } catch (error) {
      console.error("Error generating response:", error);
      //Clear the input field after sending
    }
  };

  return (
    <div id="chat-interface-container">
      <Sidebar />
      <h1 id="chat-interface-heading">
        Chat with your Configured Team of Agents
      </h1>
      <div id="chat-interface-image-container">
        <video loop autoPlay muted className="ai-coder-image" src={AIImage2}>
          Your browser does not support the video tag.
        </video>
        <video loop autoPlay muted className="ai-coder-image" src={AIImage1}>
          Your browser does not support the video tag.
        </video>
        <video loop autoPlay muted className="ai-coder-image" src={AIImage3}>
          Your browser does not support the video tag.
        </video>
      </div>
      <br></br>
      <br></br>
      {/* Container to display responses */}
      <div
        dangerouslySetInnerHTML={{
          __html: responseHtml,
        }}
      ></div>
      {/* Display loading message when waiting for response */}
      {loading && (
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

export default TeamChatInterface;
