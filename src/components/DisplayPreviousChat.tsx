import { useEffect, useState } from "react";
import { gatherChat } from "../services/APIServices";
import { useParams } from "react-router-dom";
import Sidebar from "./SideBar";

function DisplayPreviousChat() {
  // State to store the chat data as a string
  const [chatData, setChatData] = useState<string>("");
  const { chatName } = useParams();

  // UseEffect to fetch previous chat data
  useEffect(() => {
    async function fetchChat() {
      try {
        //call api services - await is a key word when using an asyncronous function.
        const chatDataReturned = await gatherChat(chatName);
        //set the chat data to chatDataReturned
        setChatData(chatDataReturned);
        //If an error occurs catch it and log the error for the moment.
      } catch (error) {
        console.log(error);
      }
    }
    fetchChat();
  }, []);

  return (
    <div id="chat-interface-container">
      <Sidebar />
      {/* https://www.shecodes.io/athena/1934-creating-innerhtml-in-react-components */}
      {/*dangerouslySetInnerHTML previous chat content loaded from the database*/}
      <div
        dangerouslySetInnerHTML={{
          __html: chatData,
        }}
      ></div>
    </div>
  );
}

export default DisplayPreviousChat;
