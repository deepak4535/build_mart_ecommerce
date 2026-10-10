
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { addProduct } from "../redux/productSlice";

function AddProduct() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const products = useSelector((state) => state.products.products);

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    unit: "piece",
    image: "📦",
    category: "Building Materials",
    stock: "",
  });

  const [error, setError] = useState("");

  const categories = [
    "Building Materials",
    "Steel",
    "Electrical",
    "Plumbing",
    "Tools",
    "Paints",
    "Other",
  ];

  function handleChange(event) {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
    setError("");
  }

  function handleSubmit(event) {
    event.preventDefault();

    const price = Number(form.price);
    const stock = Number(form.stock);

    if (
      !form.name.trim() ||
      !form.description.trim() ||
      form.price === "" ||
      form.stock === "" ||
      !Number.isFinite(price) ||
      !Number.isInteger(stock) ||
      price <= 0 ||
      stock < 0
    ) {
      setError("Enter valid product details, price and stock.");
      return;
    }

    const newProduct = {
      id: Date.now(),
      name: form.name.trim(),
      description: form.description.trim(),
      price,
      unit: form.unit,
      image: form.image.trim() || "📦",
      category: form.category,
      stock,
    };

    dispatch(addProduct(newProduct));
    navigate("/admin/products");
  }

  return (
    <div>
      <Navbar />

      <section className="products">
        <div className="product-card">
          <h2>Add New Product</h2>

          {error && <p style={{ color: "red" }}>{error}</p>}

          <form onSubmit={handleSubmit}>
            <p>
              <input
                name="name"
                type="text"
                placeholder="Product Name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </p>

            <p>
              <textarea
                name="description"
                placeholder="Product Description"
                value={form.description}
                onChange={handleChange}
                required
              />
            </p>

            <p>
              <input
                name="price"
                type="number"
                placeholder="Price in rupees"
                min="0.01"
                step="0.01"
                value={form.price}
                onChange={handleChange}
                required
              />
            </p>

            <p>
              <label>Unit</label>
              <select
                name="unit"
                value={form.unit}
                onChange={handleChange}
              >
                <option value="piece">Piece</option>
                <option value="bag">Bag</option>
                <option value="kg">Kg</option>
                <option value="ton">Ton</option>
                <option value="load">Load</option>
                <option value="litre">Litre</option>
                <option value="box">Box</option>
              </select>
            </p>

            <p>
              <input
                name="image"
                type="text"
                placeholder="Product emoji (example: 🧱)"
                value={form.image}
                onChange={handleChange}
              />
            </p>

            <p>
              <label>Category</label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </p>

            <p>
              <input
                name="stock"
                type="number"
                placeholder="Available Stock"
                min="0"
                step="1"
                value={form.stock}
                onChange={handleChange}
                required
              />
            </p>

            <button type="submit">Add Product</button>
            <Link to="/admin/products">
              <button type="button">Cancel</button>
            </Link>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default AddProduct;