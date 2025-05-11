import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../services/AuthContext";
import { useAuth0 } from "@auth0/auth0-react";

function SignIn() {
  //Router hook to navigate to dashboard
  const navigate = useNavigate();
  //assigning value to useAuth method
  const { login } = useAuth();
  //Auth0 hooks, login and redirect to dashboard, check user is authenticated
  const { loginWithRedirect, isAuthenticated } = useAuth0(); // Auth0 hooks

  // Redirect if the user is authenticated
  useEffect(() => {
    //async function to log user in
    const logUserIn = async () => {
      //if the user isnt authenticated, log them in
      if (!isAuthenticated) {
        login();

        // Redirect to Auth0 login page
        await loginWithRedirect();
      }
    };
    logUserIn();
  }, [isAuthenticated, loginWithRedirect, navigate]);
  return <></>;
}

export default SignIn;

// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import Button from "react-bootstrap/Button";
// import Form from "react-bootstrap/Form";
// import { signInUser } from "./APIServices";
// import { useAuth } from "./AuthContext";
// import { useAuth0 } from "@auth0/auth0-react";

// function SignIn() {
//   const navigate = useNavigate();
//   const { login } = useAuth(); // Custom authentication logic
//   const { loginWithRedirect, isAuthenticated } = useAuth0(); // Auth0 hooks

//   const [formData, setFormData] = useState({
//     emailAddress: "",
//     password: "",
//   });

//   // Redirect if the user is authenticated
//   useEffect(() => {
//     if (!isAuthenticated) {
//       loginWithRedirect(); // Redirect to Auth0 login page
//     } else {
//       navigate("/dashboard"); // Redirect authenticated users to the dashboard
//     }
//   }, [isAuthenticated, loginWithRedirect, navigate]);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const generateSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     try {
//       const response = await signInUser(formData);
//       console.log(response);
//       if (response === "Sign in was successful") {
//         console.log("User saved successfully:");
//         alert("Sign In successful!");
//         navigate("/dashboard");
//         login();
//       } else {
//         alert("Sign unsuccessful! Please try again.");
//       }
//     } catch (error) {
//       console.error("Error saving user:", error);
//       alert("An error occurred while signing into your account.");
//     }
//   };

//   return <div id="sign_in_page_container"></div>;
// }

// export default SignIn;
