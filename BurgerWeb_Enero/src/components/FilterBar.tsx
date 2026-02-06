import { useState } from "react";
import "./FilterBar.css";

export interface FilterState {
  search: string;
  property: string;
  sort: string;
}

interface FilterBarProps {
  placeholder: string;
  filterLabel: string;
  filterOptions: { label: string; value: string }[];
  sortOptions: { label: string; value: string }[];
  onFilterChange: (filters: FilterState) => void;
}

export default function FilterBar({ 
  placeholder, 
  filterLabel, 
  filterOptions, 
  sortOptions, 
  onFilterChange 
}: FilterBarProps) {
  const [filters, setFilters] = useState<FilterState>({
    search: "",
    property: "all",
    sort: "asc",
  });

  // Solo avisamos al padre cuando el usuario cambia algo aquí dentro
  const handleChange = (newFilters: FilterState) => {
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="filter-bar">
      <div className="filter-group">
        <input
          type="text"
          placeholder={placeholder}
          value={filters.search}
          onChange={(e) => handleChange({ ...filters, search: e.target.value })}
        />
      </div>

      <div className="filter-group">
        <label>{filterLabel}:</label>
        <select 
          value={filters.property} 
          onChange={(e) => handleChange({ ...filters, property: e.target.value })}
        >
          <option value="all">All</option>
          {filterOptions.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label>Sort by:</label>
        <select 
          value={filters.sort} 
          onChange={(e) => handleChange({ ...filters, sort: e.target.value })}
        >
          {sortOptions.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>
    </div>
  );
}