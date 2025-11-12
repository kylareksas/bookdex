'use client'; // Este componente es interactivo

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault(); // Evita que la página se recargue
    if (!query.trim()) return;
    // Redirige a la página de búsqueda con el término
    router.push(`/search?q=${encodeURIComponent(query)}`);
  };

  return (
    <form onSubmit={handleSearch} style={{ display: 'flex', gap: '10px' }}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Buscar libro o manga..."
        style={{ padding: '10px', fontSize: '1rem', width: '300px' }}
      />
      <button type="submit" style={{ padding: '10px 15px', fontSize: '1rem' }}>
        Buscar
      </button>
    </form>
  );
}