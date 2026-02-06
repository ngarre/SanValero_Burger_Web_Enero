import { useNavigate } from "react-router-dom";
import type { FoodTruck } from "../types/FoodTruck";
import "./FoodTruckCard.css";

type Props = {
  foodTruck: FoodTruck;
};

export default function FoodTruckCard({ foodTruck }: Props) {
  const navigate = useNavigate();

  const {
    id,
    nombre,
    descripcion,
    valoracion,
    opcionEnvios,
    telefono,
    email,
  } = foodTruck;

  const goToDetail = () => {
    navigate(`/foodtrucks/${id}`);
  };

  return (
    <article className="ft-card">
      <span className={`ft-badge ${opcionEnvios ? "delivery" : "local"}`}>
        {opcionEnvios ? "🚀 Home delivery" : "📍 Local only"}
      </span>

      <h2>{nombre}</h2>

      <div className="ft-rating">
        {"⭐".repeat(Math.floor(valoracion))} <span>({valoracion})</span>
      </div>

      <p>{descripcion}</p>

      <div className="ft-info">
        <span>📞 {telefono}</span>
        <span>📧 {email}</span>
      </div>

      <button onClick={goToDetail}>
        View profile
      </button>
    </article>
  );
}
