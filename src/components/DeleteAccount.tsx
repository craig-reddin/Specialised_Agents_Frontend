import { Button } from "react-bootstrap";

import { deleteUser } from "../services/APIServices";
import Sidebar from "./SideBar";
import { useAuth0 } from "@auth0/auth0-react";

function DeleteAccount() {
  //Assign email value from session storage
  const email = sessionStorage.getItem("SessionEmail");
  //Auth0 hooks
  const { logout: auth0Logout } = useAuth0();

  //function executes when the submit button is pressed
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      //test log
      console.log("hi");

      // payload for API call
      const data = {
        email: email,
      };
      //delete user method assigned to returned message and checked if the response is equal to user deleted.
      const returnedMessage = await deleteUser(data);
      if (returnedMessage.response === "User Deleted") {
        //if was deleted notify the user
        alert("Your account was deleted");

        const handleLogout = () => {
          //clear the session storage
          sessionStorage.clear();

          // After logout, isAuthenticated will be automatically set to false.
          // This will log out and redirect to the homepage
          auth0Logout({ returnTo: window.location.origin } as any);
        };
        //call handleLogout
        handleLogout();
      } else {
        //if any issue occurs infor the user
        alert(
          "There was an issue deleting your account please try again later."
        );
      }
    } catch {
      alert(
        "There was an issue deleting your account please try again later please."
      );
    }
  };

  return (
    <div className="delete-account-page-container">
      <Sidebar />
      <h1>Delete Account</h1>
      <br></br>
      <h2 className="delete-text">
        If you delete your account, all aegnts, agent teams, previous
        conversations and personal information will be deleted.
      </h2>
      <br />
      <Button
        type="submit"
        id="cib"
        className="chat-interface-button"
        onClick={handleSubmit}
      >
        Delete Account
      </Button>
    </div>
  );
}

export default DeleteAccount;
