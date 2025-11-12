// app/components/SearchResults.js

'use client'; // Sigue siendo un Client Component

import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import Link from 'next/link';

// Lo hemos renombrado de SearchPage a SearchResults
export default function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q');
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // El 'if (query)' es importante
    if (query) {
      setLoading(true);
      fetch(`/api/search?q=${query}`)
        .then((res) => res.json())
        .then((data) => {
          setBooks(data);
          setLoading(false);
        });
    } else {
      setLoading(false); // Si no hay query, no hay nada que cargar
    }
  }, [query]);

  // Si no hay query, no mostramos nada
  if (!query) {
    return <p>Escribe algo en el buscador para empezar.</p>;
  }
  
  // El JSX es el mismo que tenías, pero sin el "Volver"
  return (
    <div>
      <h1 style={{ marginTop: '20px' }}>Resultados para: "{query}"</h1>
      {loading ? (
        <p>Buscando...</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '20px' }}>
          {books.length > 0 ? books.map((book) => (
            <Link key={book.id} href={`/book/${book.id}`} style={{ textDecoration: 'none', color: 'inherit', border: '1px solid #ddd', padding: '10px', borderRadius: '8px', textAlign: 'center' }}>
              <img 
                src={`/api/image-proxy?url=${encodeURIComponent(book.imageUrl)}`} 
                alt={book.title} 
                style={{ width: '100%', height: '180px', objectFit: 'cover', backgroundColor: '#eee' }} 
              />
              <h3 style={{ fontSize: '0.9rem', marginTop: '10px' }}>{book.title}</h3>
              <p style={{ fontSize: '0.8rem', color: '#666' }}>{book.authors[0]}</p>
            </Link>
          )) : <p>No se encontraron resultados.</p>}
        </div>
      )}
    </div>
  );
}