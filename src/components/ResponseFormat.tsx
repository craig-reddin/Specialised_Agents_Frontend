export default function ChangeResponseFormat(response: any) {
  let formattedResponse = "";
  let currentMessage = "";
  // Loop through the response array and append each message
  response.data.response.forEach((msg: string) => {
    if (msg != "") {
      if (currentMessage != msg) {
        console.log(msg)
        console.log(currentMessage);
        
        //adding divs around each message to ensure each message is styled.
        formattedResponse += `<div id="GeneratedResponsesContainer"><i class="bi bi-robot"></i> ${msg}</div><br /><br />`;
        currentMessage = msg;
      }
    }
  });
  // replace all \n with <br /> g is used to chang all \n values
  return formattedResponse.replace(/\n/g, "<br />");
}



