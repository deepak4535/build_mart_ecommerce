
import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function AdminUsers() {
  let users = [];

  try {
    users = JSON.parse(
      localStorage.getItem("constructionUsers") || "[]"
    );
  } catch {
    users = [];
  }

  return (
    <div>
      <Navbar />

      <section className="products">
        <h2>Manage Users 👥</h2>
        <p>View customers registered on Construction Work Place.</p>

        <h3>Total Registered Users: {users.length}</h3>

        {users.length === 0 ? (
          <div className="product-card">
            <h3>No Registered Users</h3>
            <p>Customer accounts will appear here after registration.</p>
          </div>
        ) : (
          <div className="product-container">
            {users.map((user) => (
              <div className="product-card" key={user.id}>
                <h3>{user.name}</h3>

                <p>
                  <strong>User ID:</strong> {user.id}
                </p>

                <p>
                  <strong>Email:</strong> {user.email}
                </p>

                <p>
                  <strong>Phone:</strong> {user.phone}
                </p>

                <p>
                  <strong>Address:</strong>{" "}
                  {user.address || "Not provided"}
                </p>
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

export default AdminUsers;