import { Navbar } from "./Navbar.tsx";
import logo from "../assets/images/Logo-nobackground.png";
import "./Header.css";

export function Header() {
  return (
    <header className="header">
      <div className="header-inner">
        <div className="header-left">
          <img src={logo} alt="San Valero Burger Contest" className="logo" />
        </div>

        <div className="header-center">
          <Navbar />
        </div>

        <div className="header-right">
          <button className="order-btn">Place your order</button>
        </div>
      </div>
    </header>
  );
}