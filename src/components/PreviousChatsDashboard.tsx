import { useEffect, useState } from "react";
import Sidebar from "./SideBar";
import Table from "react-bootstrap/Table";
import { deleteUserChat, gatherChatNames } from "../services/APIServices";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function PreviousChatsDashboard() {
  //useState to store chat names
  // const [chatNames, setChatNames] = useState([]);
  const [chatNames, setChatNames] = useState<[string, number][]>([]);
  //Router hook to navigate to the previous chat page after selected
  const navigate = useNavigate();
  // UseEffect to fetch previous chat data
  useEffect(() => {
    //asyncronous funtion to set data and pass to gather chatNames method in the APIServices.tsx file
    async function fetchChat() {
      try {
        const email = sessionStorage.getItem("SessionEmail");
        const data = { email: email };
        //call api services using asyncronous function.
        const chatNamesReturned = await gatherChatNames(data);
        console.log(chatNamesReturned);
        //changes array contained with arrays to chang to single array.
        const flattenedChats = chatNamesReturned.message;
        setChatNames(flattenedChats);
        //If an error occurs catch it and log the error for the moment.
      } catch (error) {
        console.log(error);
      }
    }
    //call the fetchData method
    fetchChat();
    //no dependencies of useEffect hook
  }, []);
  // Handle selecting a chat
  const handleChatSelection = (chatName: string, chatId: any) => {
    //navigate to the chat
    navigate(`/display_previous_chat/${chatId}`);
    // Inform the user
    alert(`You selected: ${chatName}`);
  };

  // method if the delete button is called
  const deleteChat = async (chatName: any) => {
    //email is used query database
    const email = sessionStorage.getItem("SessionEmail");

    //payload for API call
    const data = {
      email: email,
      chatName: chatName,
    };
    try {
      const deletionResult = await deleteUserChat(data);
      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
      //call the method and check if the response equals Chat Deleted
      if (deletionResult.response == "Chat Deleted") {
        //if it is update fiter out the chat from the chatNames
        setChatNames((prevChatNames) =>
          prevChatNames.filter((name) => name !== chatName)
        );
        //inform the user
        alert("Chat Deleted");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="previous-chats-dashboard-container">
      <Sidebar />
      <h1 className="previous-chats-dashboard-heading">Previous Chats</h1>
      <Table className="previous-chat-table" responsive bordered hover>
        <thead>
          <tr>
            <th>Chat Names</th>
            <th>Select to read</th>
            <th>Select to delete</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(chatNames) && chatNames.length > 0 ? (
            chatNames.map(([chatName, chatId], index) => (
              <tr key={index}>
                <td className="chat-name">{chatName}</td>
                <td>
                  <Button
                    variant="primary"
                    onClick={() => handleChatSelection(chatName, chatId)}
                  >
                    Select
                  </Button>
                </td>
                <td>
                  <Button variant="danger" onClick={() => deleteChat(chatName)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3}>No chats available</td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
}

export default PreviousChatsDashboard;
