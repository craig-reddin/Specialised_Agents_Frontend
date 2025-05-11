export default function ChangeResponseFormat2(response: any) {
  let formattedResponse = "";

  //adding divs around each message to ensure each message is styled.
  formattedResponse += `<div id="GeneratedResponsesContainer"><i class="bi bi-robot"></i> ${response}</div><br /><br />`;
  // replace all \n with <br /> g is used to chang all \n values
  return formattedResponse.replace(/\n/g, "<br />");
}
