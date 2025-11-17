// app/components/SearchResults.js

'use client'; 

import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q');
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (query) {
      setLoading(true);
      fetch(`/api/search?q=${query}`)
        .then((res) => res.json())
        .then((data) => {
          setBooks(data);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [query]);

  if (!query) {
    return <p style={{ padding: '20px' }}>Escribe algo en el buscador para empezar.</p>;
  }
  
  return (
    // --- CAMBIO 1: Añadido padding y maxWidth para que no se desparrame en PC ---
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      
      <h1 style={{ marginTop: '10px', fontSize: '1.5rem' }}>Resultados para: "{query}"</h1>
      
      {loading ? (
        <p>Buscando...</p>
      ) : (
        // --- CAMBIO 2: Ajuste de Grid para móviles ---
        <div style={{ 
          display: 'grid', 
          // Bajamos a 140px para asegurar 2 columnas en móviles estándar
          gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', 
          gap: '15px', // Espacio un poco más compacto
          marginTop: '20px'
        }}>
          {books.length > 0 ? books.map((book) => (
            <Link key={book.id} href={`/book/${book.id}`} style={{ textDecoration: 'none', color: 'inherit', border: '1px solid #ddd', padding: '10px', borderRadius: '8px', textAlign: 'center', background: '#fff' }}>
              <img 
                src={`/api/image-proxy?url=${encodeURIComponent(book.imageUrl)}`} 
                alt={book.title} 
                style={{ width: '100%', height: '180px', objectFit: 'cover', backgroundColor: '#eee', borderRadius: '4px' }} 
              />
              <h3 style={{ fontSize: '0.9rem', marginTop: '10px', overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: '2', WebkitBoxOrient: 'vertical' }}>
                {book.title}
              </h3>
              <p style={{ fontSize: '0.8rem', color: '#666' }}>{book.authors[0]}</p>
            </Link>
          )) : <p>No se encontraron resultados.</p>}
        </div>
      )}
    </div>
  );
}