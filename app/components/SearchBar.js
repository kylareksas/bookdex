// app/components/SearchBar.js

'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    router.push(`/search?q=${encodeURIComponent(query)}`);
  };

  return (
    <form onSubmit={handleSearch} style={{ 
      display: 'flex', 
      gap: '10px', 
      width: '100%',           // Ocupa todo el ancho disponible
      maxWidth: '500px',       // Pero no más de 500px
      flexWrap: 'wrap',        // Si es muy pequeño, baja el botón
      justifyContent: 'center' 
    }}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Buscar libro o manga..."
        style={{ 
          padding: '12px', 
          fontSize: '1rem', 
          flex: 1,             // Crece para ocupar el espacio
          minWidth: '200px',   // Ancho mínimo
          borderRadius: '8px',
          border: '1px solid #ccc'
        }}
      />
      <button type="submit" style={{ 
        padding: '12px 20px', 
        fontSize: '1rem',
        backgroundColor: '#333',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer'
      }}>
        Buscar
      </button>
    </form>
  );
}