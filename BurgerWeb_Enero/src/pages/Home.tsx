import { useEffect, useState } from "react";
import { fetchAPI } from "../utils/api.ts";
import type { FoodTruck } from "../types/FoodTruck.ts";
import FoodTruckCard from "../components/FoodTruckCard.ts";
import "./Home.css";
import heroImage from "../assets/images/lugar.jpg";

export default function Home() {
  const [foodTrucks, setFoodTrucks] = useState<FoodTruck[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAPI<FoodTruck[]>("foodtrucks")
      .then(setFoodTrucks)
      .catch(() =>
        setError("The participating food trucks could not be loaded.")
      )
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="loader">Starting engines... 🚚🔥</div>;
  if (error) return <div className="error-msg">{error}</div>;

  return (
    <main className="home-container">
      {/* HERO */}
      <section className="hero">
        <h1>Choose the San Valero Burger champion</h1>
        <img src={heroImage} alt="Food trucks en acción" />
        <p>
          Discover the FoodTrucks competing for the throne this year.
          Vote, enjoy and savor 🔥🍔
        </p>
      </section>

      {/* GRID */}
      <section className="foodtruck-grid">
        {foodTrucks.map(ft => (
          <FoodTruckCard key={ft.id} foodTruck={ft} />
        ))}
      </section>
    </main>
  );
}