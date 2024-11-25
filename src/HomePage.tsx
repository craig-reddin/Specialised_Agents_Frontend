import Image from "./AutoGen.jpg";

function HomePage() {
  return (
    <div>
      <h1 id="homepage-heading">Welcome to GenAIColab</h1>;
      <div>
        <img src={Image} className="home-page-images" alt="AutoGen Image" />
      </div>
      <h3 className="homepage-slogan">The Furtue is Now!</h3>
    </div>
  );
}
export default HomePage;
