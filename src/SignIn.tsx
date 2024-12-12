import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { saveNewUser } from "./APIServices"; // Import your saveNewUser function

function SignIn() {
  //www.webrecto.com/react/navigate-to-another-page-on-button-click-in-react
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    emailAddress: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const generateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      console.log(formData);
      await saveNewUser(formData);
      console.log("User saved successfully:");
      alert("Sign In successful!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Error saving user:", error);
      alert("An error occurred while signing into your account.");
    }
  };

  return (
    <div id="sign_in_page_container">
      <h2 id="sign_in_title"> Account Sign In Page</h2>
      <div id="sign_in_container">
        <Form onSubmit={generateSubmit}>
          <Form.Group
            className="mb-3"
            controlId="formBasicEmail"
            id="chat-question"
          >
            <Form.Label id="sign_in_label">Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              name="emailAddress"
              value={formData.emailAddress}
              onChange={handleChange}
              required
            />
            <Form.Text id="sign_in_quote">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group
            className="mb-3"
            controlId="formBasicPassword"
            id="sign_in_component"
          >
            <Form.Label id="sign_in_label">Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Button className="sign_in_button" id="sib" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default SignIn;
