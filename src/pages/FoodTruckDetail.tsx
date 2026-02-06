import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchAPI } from "../utils/api";
import type { FoodTruck } from "../types/FoodTruck";
import "./FoodTruckDetail.css";

export default function FoodTruckDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [foodTruck, setFoodTruck] = useState<FoodTruck | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    fetchAPI<FoodTruck>(`foodtrucks/${id}`)
      .then(setFoodTruck)
      .catch(() => setError("No se pudo cargar la FoodTruck"))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <div className="loader">Loading FoodTruck... 🚚🔥</div>;
  }

  if (error || !foodTruck) {
    return <div className="error-msg">{error ?? "FoodTruck not found"}</div>;
  }

  const {
    nombre,
    descripcion,
    valoracion,
    opcionEnvios,
    telefono,
    email,
    fechaInscripcion,
  } = foodTruck;

  return (
  <main className="foodtruck-detail">
    <button aria-label="Get Back" className="back-btn" onClick={() => navigate(-1)}>
      ← Back
    </button>

    <section className="detail-card">
      <header className="detail-header">
        <h1>{nombre}</h1>

        <span className={`detail-badge ${opcionEnvios ? "delivery" : "local"}`}>
          {opcionEnvios ? "🚀 Home delivery" : "📍 Local only"}
        </span>
      </header>

      <div className="detail-rating">
        {"⭐".repeat(Math.floor(valoracion))} <span>({valoracion})</span>
      </div>

      <p className="detail-description">{descripcion}</p>

      <div className="detail-divider" />

      <section className="detail-info">
        <h3>Contact Information</h3>
        <ul>
          <li>📞 {telefono}</li>
          <li>📧 {email}</li>
          <li>
            📅 Registered on{" "}
            {fechaInscripcion
              ? new Date(fechaInscripcion).toLocaleDateString()
              : "—"}
          </li>
        </ul>
      </section>
    </section>
  </main>
);
}
