
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { deleteProduct } from "../redux/productSlice";

function AdminProducts() {
  const dispatch = useDispatch();

  const products = useSelector((state) => state.products.products);

  function handleDelete(product) {
    const confirmed = window.confirm(
      `Are you sure you want to delete ${product.name}?`
    );

    if (confirmed) {
      dispatch(deleteProduct(product.id));
    }
  }

  return (
    <div>
      <Navbar />

      <section className="products">
        <h2>Manage Products</h2>
        <p>Add, edit, or delete construction materials.</p>

        <Link to="/admin/add-product">
          <button>➕ Add New Product</button>
        </Link>

        {products.length === 0 ? (
          <div className="product-card">
            <h3>No Products Available</h3>
            <p>Add a product to display it here.</p>
          </div>
        ) : (
          <div className="product-container">
            {products.map((product) => (
              <div className="product-card" key={product.id}>
                <div className="product-image">{product.image}</div>

                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <h4>₹{product.price} / {product.unit}</h4>
                <p>Category: {product.category}</p>
                <p>Stock: {product.stock}</p>

                <div className="admin-product-actions">
                  <Link to={`/admin/edit-product/${product.id}`}>
                    <button>Edit Product</button>
                  </Link>

                  <button onClick={() => handleDelete(product)}>
                    Delete Product
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <Link to="/admin">
          <button>Back to Dashboard</button>
        </Link>
      </section>

      <Footer />
    </div>
  );
}

export default AdminProducts;