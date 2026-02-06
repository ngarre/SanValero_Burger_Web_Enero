import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchAPI } from "../utils/api";
import type { Burger } from "../types/Burger";
// Tu import del placeholder
import PlaceholderImage from '../assets/images/placeholder-burger.jpg'; 
import "./BurgerDetail.css";

const API_URL_BASE = 'http://localhost:8080';

export default function BurgerDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [burger, setBurger] = useState<Burger | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Estado para manejar si la imagen de la API falla
  const [imageFailed, setImageFailed] = useState(false);

  useEffect(() => {
    if (!id) return;

    fetchAPI<Burger>(`burgers/${id}`)
      .then(setBurger)
      .catch(() => setError("The burger details could not be loaded."))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="loader">Preparing the ingredients... 🍅🔥</div>;
  if (error || !burger) return <div className="error-msg">{error ?? "Burger not found"}</div>;

  // Lógica de imagen: 
  // 1. Si no hay imagenURL o si ya detectamos un fallo de carga, usamos el Placeholder.
  // 2. Si hay URL y no ha fallado, montamos la ruta completa.
  const finalImageUrl = (burger.imagenURL && !imageFailed) 
    ? `${API_URL_BASE}${burger.imagenURL}` 
    : PlaceholderImage;

  const handleImageError = () => {
    setImageFailed(true);
  };

  return (
    <main className="burger-detail-container">
      <button className="back-btn" onClick={() => navigate(-1)}>
        ← Back to menu
      </button>

      <section className="burger-detail-card">
        <div className="detail-image-wrapper">
          <img 
            src={finalImageUrl} 
            alt={burger.nombre} 
            onError={handleImageError} // Si el link de la API se rompe, salta aquí
          />
          {burger.opcionVegana && <span className="vegan-tag">🌱 Vegan</span>}
        </div>

        <div className="detail-content">
          <header className="detail-header">
            <div>
               <h1>{burger.nombre}</h1>
               <p className="detail-date">Added on {new Date(burger.fechaCreacion).toLocaleDateString()}</p>
            </div>
            <span className="price-tag">{burger.precio.toFixed(2)} €</span>
          </header>

          <div className="detail-section">
            <h3>Ingredients</h3>
            <p className="ingredients-text">{burger.ingredientes}</p>
          </div>

          <div className="detail-divider" />

          <div className="detail-footer-actions">
            <button className="order-btn">Add to cart</button>
          </div>
        </div>
      </section>
    </main>
  );
}