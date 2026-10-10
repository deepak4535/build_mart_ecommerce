
import { useMemo, useState } from "react";
import { useSelector } from "react-redux";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import SearchBar from "../components/SearchBar";

function Products() {
  const products = useSelector((state) => state.products.products);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const categories = useMemo(
    () => [...new Set(products.map((product) => product.category))],
    [products]
  );

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.description.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || product.category === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <div>
      <Navbar />

      <section className="products">
        <h2>All Construction Materials</h2>

        <SearchBar
          search={search}
          setSearch={setSearch}
          category={category}
          setCategory={setCategory}
          categories={categories}
        />

        <p>
          Showing {filteredProducts.length} of {products.length} products
        </p>

        {filteredProducts.length === 0 ? (
          <div className="product-card">
            <h3>No products found</h3>
            <p>Try another product name or category.</p>

            <button
              onClick={() => {
                setSearch("");
                setCategory("All");
              }}
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="product-container">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}

export default Products;