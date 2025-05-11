import axios from "axios";
import crypto from "crypto";

//Post method to send prompt to agents
export async function postQuestion(data: any) {
  try {
    //Debugging log
    console.log("Making API call");
    //make post request to python flask server - data is text area message
    const response = await axios.post("http://127.0.0.1:5000/chat", data);
    //log response for debugging
    console.log(response);
    //return the response to be displayed on client interface
    return response;
  } catch (error) {
    console.log("API call failed");
    console.log(error);
    return false;
  }
}

//Post method to send prompt to agents
export async function postTeamQuestion(data: any) {
  try {
    //Debugging log
    console.log("Making API call");
    //make post request to python flask server
    const response = await axios.post("http://127.0.0.1:5000/chat_team", data);
    //log response for debugging
    //return the response to be displayed on client interface
    return response;
  } catch (error) {
    console.log("API call failed");
    console.log(error);
    return false;
  }
}

export async function storeChat(data: any) {
  try {
    //make post request to python flask server
    await axios.post("http://127.0.0.1:5000/store_chat", data);
    return true;
  } catch (error) {
    console.log("API call failed");
    console.error(error);
    return false;
  }
}

export async function signInUser(data: any) {
  try {
    const response = await axios.post(
      "http://127.0.0.1:5000/sign_in_user",
      data
    );
    console.log(response.data.message);
    return response.data.response;
  } catch (error) {
    console.log("Error saving new user");
  }
}

export async function gatherChat(name: any) {
  try {
    //get request to get chat data
    const response = await axios.post(
      "http://127.0.0.1:5000/get_previous_chat",
      { chatName: name }
    );
    //Return just the message from the response.
    return response.data.message;
  } catch (error) {
    console.log("API call failed");
    console.error(error);
    //return an error to be displayed to the user.
    return "<div id = 'previous_chat_error'><h1 id= 'returned_data'> Error fetching chat data</h1><br /><h3 id = 'previous_chat_error_sub'> Please try again later</h3></div>";
  }
}

export async function gatherChatNames(data: any) {
  try {
    //get request to get chat data
    const response = await axios.post(
      "http://127.0.0.1:5000/gather_previous_chat_names",
      data
    );
    //Return just the message from the response.
    return response.data;
  } catch (error) {
    console.log("API call failed");
    console.error(error);
    //return an error to be displayed to the user.
    return "<div id = 'previous_chat_error'><h1 id= 'returned_data'> Error fetching chat data</h1><br /><h3 id = 'previous_chat_error_sub'> Please try again later</h3></div>";
  }
}

export async function createAgentAPICall(data: any) {
  try {
    const response = await axios.post(
      "http://127.0.0.1:5000/create_agent",
      data
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log("API call failed");
    console.error(error);
    //return an error to be displayed to the user.
  }
}

export async function reviewSignIn(data: any) {
  try {
    const response = await axios.post(
      "http://127.0.0.1:5000/review_sign_in",
      data
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log("API call failed");
    console.error(error);
    //return an error to be displayed to the user.
  }
}

export async function gatherAgents(data: any) {
  try {
    const response = await axios.post(
      "http://127.0.0.1:5000/retrieve_agents",
      data
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log("API call failed");
    console.error(error);
    //return an error to be displayed to the user.
  }
}

export async function storeTeam(data: any) {
  try {
    const response = await axios.post("http://127.0.0.1:5000/store_team", data);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log("API call failed");
    console.error(error);
  }
}

export async function gatherTeams(data: any) {
  try {
    const response = await axios.post(
      "http://127.0.0.1:5000/gather_teams",
      data
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log("API call failed");
    console.error(error);
  }
}

export async function deleteUserChat(data: any) {
  try {
    const response = await axios.post(
      "http://127.0.0.1:5000/delete_chat",
      data
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log("API call failed");
    console.error(error);
  }
}

const encryptData = (data: any, publicKey: any) => {
  const encryptedData = crypto.publicEncrypt(
    {
      key: publicKey,
      padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
      oaepHash: "sha256",
    },
    Buffer.from(data)
  );
  return encryptedData.toString("base64");
};

export async function deleteUser(data: any) {
  try {
    const response = await axios.post(
      "http://127.0.0.1:5000/delete_user",
      data
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log("API call failed");
    console.error(error);
  }
}
