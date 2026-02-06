import "./Footer.css";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="main-footer">
      <div className="footer-container">
        {/* Sección 1: Sobre el evento */}
        <div className="footer-section">
          <h3>San Valero Burger</h3>
          <p>The competition to find the best burger in town. Vote for your favorite!</p>
        </div>

        {/* Sección 2: Enlaces rápidos */}
        <div className="footer-section">
          <h4>Explore</h4>
          <ul>
            <li><a href="#rules">Contest Rules</a></li>
            <li><a href="#map">Map of FoodTrucks</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>

        {/* Sección 3: Redes y contacto */}
        <div className="footer-section">
          <h4>Follow us!</h4>
          <div className="social-links">
            <span className="social-icon">📸 Instagram</span>
            <span className="social-icon">🐦 X (Twitter)</span>
            <span className="social-icon">📘 Facebook</span>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {currentYear} San Valero Burger Contest. Made with 🍔 for carnivores.</p>
      </div>
    </footer>
  );
}