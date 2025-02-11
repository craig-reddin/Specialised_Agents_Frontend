import { useEffect, useState } from "react";
import Sidebar from "./SideBar";
import Table from "react-bootstrap/Table";
import { gatherChatNames } from "../services/APIServices";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function PreviousChatsDashboard() {
  const [chatNames, setChatNames] = useState([]);
  const navigate = useNavigate();
  // UseEffect to fetch previous chat data
  useEffect(() => {
    async function fetchChat() {
      try {
        const email = sessionStorage.getItem("SessionEmail");
        const data = { email: email}
        //call api services using asyncronous function.
        const chatNamesReturned = await gatherChatNames(data);
        console.log(chatNamesReturned);
        //changes array contained with arrays to chang to single array.
        const flattenedChats = chatNamesReturned.message.flat();
        setChatNames(flattenedChats);
        console.log();
        //If an error occurs catch it and log the error for the moment.
      } catch (error) {
        console.log(error);
      }
    }
    fetchChat();
  }, []);
  // Handle selecting a chat (for example, navigate or display its content)
  const handleChatSelection = (chatName: string) => {
    navigate(`/display_previous_chat/${chatName}`);

    alert(`You selected: ${chatName}`);
  };

  return (
    <div className="previous-chats-dashboard-container">
      <Sidebar />
      <h1 className="previous-chats-dashboard-heading">Previous Chats</h1>
      <Table className="previous-chat-table" responsive bordered hover>
        <thead>
          <tr>
            <th>Chat Names</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {chatNames.length > 0 ? (
            chatNames.map((chatName, index) => (
              <tr key={index}>
                <td className="chat-name">{chatName}</td>
                <td>
                  <Button
                    variant="primary"
                    onClick={() => handleChatSelection(chatName)}
                  >
                    Select
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={2}>No chats available</td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
}

export default PreviousChatsDashboard;
