import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom"; // 1. Importar
import type { Burger } from '../types/Burger';
import PlaceholderImage from '../assets/images/placeholder-burger.jpg';
import './BurgerCard.css';

interface Props {
  burger: Burger;
}

const API_URL_BASE = 'http://localhost:8080';

export const BurgerCard = ({ burger }: Props) => {
  const navigate = useNavigate(); // 2. Inicializar navigate
  const [imageFailed, setImageFailed] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>(PlaceholderImage);

  useEffect(() => {
    if (burger.imagenURL && !imageFailed) {
      setImageUrl(`${API_URL_BASE}${burger.imagenURL}`);
    } else {
      setImageUrl(PlaceholderImage);
    }
  }, [burger.imagenURL, imageFailed]);

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    if (!imageFailed) {
      setImageFailed(true);
      e.currentTarget.src = PlaceholderImage;
    }
  };

  // 3. Función de navegación
  const goToDetail = () => {
    navigate(`/burgers/${burger.id}`);
  };

  return (
    <div className="burger-card">
      <div className="burger-image">
        <img src={imageUrl} alt={burger.nombre} onError={handleImageError} loading="lazy" />
        {burger.opcionVegana && (
          <span className="vegan-badge">🌱 Vegan</span>
        )}
      </div>

      <div className="burger-content">
        <h2>{burger.nombre}</h2>
        <p>{burger.ingredientes}</p>

        <div className="burger-footer">
          <span className="burger-price">{burger.precio.toFixed(2)} €</span>
          <span>{new Date(burger.fechaCreacion).toLocaleDateString()}</span>
        </div>

        {/* 4. Cambiamos la acción del botón */}
        <button aria-label="More burger details" className="btn-detail" onClick={goToDetail}>
          View Details
        </button>
      </div>
    </div>
  );
};