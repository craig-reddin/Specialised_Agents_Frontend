import axios from "axios";

//Post method to send prompt to agents
export async function postQuestion(data: any) {
  try {
    //Debugging log
    console.log("Making API call")
    //make post request to python flask server - data is text area message
    const response = await axios.post("http://127.0.0.1:5000/chat", data);
    //log response for debugging
    console.log(response);
    //return the response to be displayed on client interface
    return response;
  } catch (error) {
    console.log("API call failed")
    console.error(error);

  }
}

export async function storeChat(data: any) {
  try {
    //make post request to python flask server - data is text area message
    await axios.post("http://127.0.0.1:5000/store_chat", data);
    //log response for debugging
    alert("Chat successfully saved")
  } catch (error) {
    console.log("API call failed");
    console.error(error);
  }
}

export async function saveNewUser(data:any){
  try{
    
    const response = await axios.post(
      "http://127.0.0.1:5000/sign_in_user",
      data
    );
    console.log(response.data.message);
    return response.data.response;

  }catch(error){
    console.log("Error saving new user")
  }
  
}

export async function gatherChat() {
  try {
    //get request to get chat data
    const response = await axios.get("http://127.0.0.1:5000/get_previous_chat");
    //Return just the message from the response.
    return response.data.message;
  } catch (error) {
    console.log("API call failed");
    console.error(error);
    //return an error to be displayed to the user.
    return "<div id = 'previous_chat_error'><h1 id= 'returned_data'> Error fetching chat data</h1><br /><h3 id = 'previous_chat_error_sub'> Please try again later</h3></div>";
  }
} 