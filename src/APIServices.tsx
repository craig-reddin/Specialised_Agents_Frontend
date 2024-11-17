import axios from "axios";

const API_URL = "http://127.0.0.1:5000/chat";
// export async function postQuestion(data: any) {
//   const response = await fetch(API_URL, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(data),
//   });
//   if (!response.ok) {
//     throw new Error("Network response was not ok");
//   }
//   const jsonResponse = await response.json();
//   console.log("Response from Flask:", jsonResponse);
//   // Convert the data to a JSON string
//   return response.json();
// }

export async function postQuestion(data: any) {
  try {
    console.log("Making API call")
    const res = await axios.post("http://127.0.0.1:5000/chat", data);
    console.log(res);
    return res;
  } catch (error) {
    console.log("API call failed")
    console.error(error);

  }
}
