import Image from "./images/AutoGen.jpg";

function HomePage() {
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
