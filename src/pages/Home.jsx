
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import { useSelector } from "react-redux";

function Home() {
  const products = useSelector(
    (state) => state.products.products
  );

  return (
    <div>
      <Navbar />

      <section className="home">
        <h1>Welcome to Construction Work Place</h1>

        <p>
          Buy quality construction materials at the best prices.
        </p>

        <button
          className="shop-btn"
          onClick={() => {
            window.location.href = "/products";
          }}
        >
          Explore Products
        </button>
      </section>

      <section className="products">
        <h2>Our Construction Materials</h2>

        <div className="product-container">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              {...product}
            />
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Home;