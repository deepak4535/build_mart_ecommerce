import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProductCard from "./components/ProductCard";
import "./App.css";

function App() {
return ( <div> <Navbar />

  <section className="home">
    <h1>Welcome to Construction Work Place</h1>
    <p>
      Buy quality construction materials at the best prices.
    </p>

    <button
      className="shop-btn"
      onClick={() =>
        document.getElementById("products").scrollIntoView({
          behavior: "smooth",
        })
      }
    >
      Explore Products
    </button>
  </section>

  <section className="products" id="products">
    <h2>Our Construction Materials</h2>

    <div className="product-container">
      <ProductCard
        image="🧱"
        name="Bricks"
        description="Strong bricks for building."
        price={8}
        unit="piece"
      />

      <ProductCard
        image="🏗️"
        name="Cement"
        description="Quality cement for construction."
        price={380}
        unit="bag"
      />

      <ProductCard
        image="🔩"
        name="Steel"
        description="Strong steel for building work."
        price={65}
        unit="kg"
      />

      <ProductCard
        image="🪨"
        name="Sand"
        description="Quality sand for construction."
        price={1500}
        unit="load"
      />
    </div>
  </section>

  <Footer />
</div>


);
}

export default App;
