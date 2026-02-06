import { useEffect, useState, useMemo } from "react"; // 1. Añadimos useMemo
import { fetchAPI } from "../utils/api";
import type { Burger } from "../types/Burger";
import { BurgerCard } from "../components/BurgerCard";
import FilterBar, { type FilterState } from "../components/FilterBar";
import "./Burgers.css";
import heroImage from "../assets/images/todos.webp";

export default function Burgers() {
  const [burgers, setBurgers] = useState<Burger[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Estado para guardar qué filtros ha seleccionado el usuario
  const [filterConfig, setFilterConfig] = useState<FilterState>({
    search: "",
    property: "all",
    sort: "asc",
  });

  useEffect(() => {
    fetchAPI<Burger[]>("burgers")
      .then(setBurgers)
      .catch(() => setError("The burgers could not be loaded."))
      .finally(() => setLoading(false));
  }, []);

  const filteredBurgers = useMemo(() => {
    let result = [...burgers];

    // Filtro por texto
    if (filterConfig.search) {
      const query = filterConfig.search.toLowerCase();
      result = result.filter(b =>
        b.nombre.toLowerCase().includes(query) ||
        b.ingredientes.toLowerCase().includes(query)
      );
    }

    // Filtro por propiedad (Vegana/Cárnica)
    if (filterConfig.property !== "all") {
      const isVegan = filterConfig.property === "vegan";
      result = result.filter(b => b.opcionVegana === isVegan);
    }

    // Ordenación por precio
    result.sort((a, b) =>
      filterConfig.sort === "asc" ? a.precio - b.precio : b.precio - a.precio
    );

    return result;
  }, [burgers, filterConfig]); // Solo se ejecuta si cambian las burgers o los filtros

  if (loading) return <div className="loader">Grilling burgers... 🔥🍔</div>;
  if (error) return <div className="error-msg">{error}</div>;

  return (
    <main className="burgers-container main-content">
      <section className="hero">
        <h1>The burgers fighting for glory</h1>
        <img src={heroImage} alt="Hamburguesas gourmet" loading="lazy" />
        <p>These are the participating burgers. Only one will be chosen 👑</p>
      </section>

      {/* 3. El componente ahora solo actualiza la configuración */}
      <FilterBar
        placeholder="Search by name or ingredients..."
        filterLabel="Type"
        filterOptions={[
          { label: "Vegan 🌱", value: "vegan" },
          { label: "Meat 🥩", value: "meat" },
        ]}
        sortOptions={[
          { label: "Price: lowest first", value: "asc" },
          { label: "Price: highest first", value: "desc" },
        ]}
        onFilterChange={setFilterConfig}
      />

      <div className="results-info">
        {filteredBurgers.length > 0 ? (
          <p>
            Found <strong>{filteredBurgers.length}</strong> {filteredBurgers.length === 1 ? 'burger' : 'burgers'}
          </p>
        ) : (
          <p>No results found for this search</p>
        )}
      </div>

      <section className="burger-grid">
        {filteredBurgers.length > 0 ? (
          filteredBurgers.map((burger) => (
            <BurgerCard key={burger.id} burger={burger} />
          ))
        ) : (
          <div className="no-results">No burgers match your search 🧐</div>
        )}
      </section>
    </main>
  );
}