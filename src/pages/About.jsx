
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function About() {
  return (
    <div>
      <Navbar />

      <section className="products">
        <h2>About Construction Work Place</h2>

        <p>
          Welcome to Construction Work Place, your trusted
          online store for construction materials.
        </p>

        <p>
          We provide bricks, cement, steel, sand, and other
          essential materials for construction projects.
        </p>

        <p>
          Our goal is to make purchasing construction
          materials simple and convenient.
        </p>
      </section>

      <Footer />
    </div>
  );
}

export default About;