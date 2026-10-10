
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function AdminCategories() {
  const products = useSelector((state) => state.products.products);

  const categories = [
    ...new Set(products.map((product) => product.category)),
  ];

  return (
    <div>
      <Navbar />

      <section className="products">
        <h2>Manage Categories</h2>
        <p>Construction material categories based on your products.</p>

        <div className="product-container">
          {categories.map((category) => {
            const categoryProducts = products.filter(
              (product) => product.category === category
            );

            return (
              <div className="product-card" key={category}>
                <h3>{category}</h3>

                <p>
                  Total Products: {categoryProducts.length}
                </p>

                <ul>
                  {categoryProducts.map((product) => (
                    <li key={product.id}>
                      {product.name} — ₹{product.price} / {product.unit}
                    </li>
                  ))}
                </ul>

                <Link to="/admin/products">
                  <button>View Products</button>
                </Link>
              </div>
            );
          })}
        </div>

        {categories.length === 0 && (
          <p>No categories available. Add a product first.</p>
        )}

        <Link to="/admin">
          <button>Back to Dashboard</button>
        </Link>
      </section>

      <Footer />
    </div>
  );
}

export default AdminCategories;