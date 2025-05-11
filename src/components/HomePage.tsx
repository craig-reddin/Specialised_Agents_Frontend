import { useEffect } from "react";
import Image from "../images/AutoGen.jpg";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const { isAuthenticated } = useAuth0();
  const navigate = useNavigate();
  useEffect(() => {
    //check if the user is authenticated and if so , navigate to the dashboar. May change this as a user may want to visit the home page.
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  });

  return (
    //Homepage Heading, image and slogan
    <div>
      <h1 id="homepage-heading">Welcome To GenAIColab</h1>;
      <div>
        <img src={Image} className="home-page-images" alt="AutoGen Image" />
      </div>
      <h3 className="homepage-slogan">The Furtue Is Now!</h3>
    </div>
  );
}
export default HomePage;
