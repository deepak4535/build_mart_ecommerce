
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Contact() {
  return (
    <div>
      <Navbar />

      <section className="products">
        <h2>Contact Us</h2>

        <p>Email: support@constructionworkplace.com</p>

        <p>Phone: +91 98765 43210</p>

        <form
          onSubmit={(event) => {
            event.preventDefault();
            alert("Your message has been submitted!");
          }}
        >
          <p>
            <input
              type="text"
              placeholder="Your Name"
              required
            />
          </p>

          <p>
            <input
              type="email"
              placeholder="Your Email"
              required
            />
          </p>

          <p>
            <textarea
              placeholder="Your Message"
              required
            />
          </p>

          <button type="submit">Send Message</button>
        </form>
      </section>

      <Footer />
    </div>
  );
}

export default Contact;