import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { postQuestion } from "./APIServices";

function ChangeResponseFormat(response: any) {
  let sentence = ""; // Initialize the sentence variable to accumulate the responses

  // Iterate through the response array and append each sentence to the 'sentence' variable
  response.data.response.forEach((msg: string) => {
    sentence += msg + "\n\n"; // Add the response followed by a line break
  });


  // Return the accumulated sentence
  return sentence;
}



function ChatInterface(){
  // UseState to hold form values
  const [formData, setFormData] = useState({
    questionForm: "",
    responseAI: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const generateSubmit = async (e: any) => {
    // prevents default form submission behavior
    e.preventDefault();

    // Data to send to the API
    const data = {
      message: formData.questionForm,
      
    };

    try {
      // call the postIngredients function passing the data as a parameter
      const response = await postQuestion(data);
      const response_content = ChangeResponseFormat(response);
      console.log(response_content);
      // Updates the generated recipe in the formData
      setFormData((prevData) => ({
        ...prevData,
        responseAI: response_content,
      }));
    } catch (error) {
      console.error("Error generating response:", error);
    }
  };

  return (
    <Form onSubmit={generateSubmit}>
      <Form.Group className="mb-3" controlId="chatQuestion">
        <Form.Label>
          Questionssssssssssssssssssssssssssssssssssssssssssssssssss
        </Form.Label>
        <Form.Control
          type="text"
          name="questionForm"
          placeholder="Write Questions Here"
          value={formData.questionForm}
          onChange={handleChange}
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit Question
      </Button>
      <br />
      <br />
      <br />

      <Form.Group className="mb-3" controlId="chatResponse">
        <Form.Label>Response</Form.Label>
        <Form.Control
          as="textarea"
          name="response"
          placeholder="Response will display here"
          value={formData.responseAI}
          readOnly
          rows={5}
        />
      </Form.Group>
    </Form>
  );
}
export default ChatInterface;