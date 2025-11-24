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
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      
      <h1 style={{ marginTop: '10px', fontSize: '1.5rem' }}>Resultados para: "{query}"</h1>
      
      {loading ? (
        <p>Buscando...</p>
      ) : (
        <div style={{ 
          display: 'grid', 
          // Ajustado para móviles: mínimo 140px asegura 2 columnas en la mayoría de pantallas
          gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', 
          gap: '15px', 
          marginTop: '20px'
        }}>
          {books.length > 0 ? books.map((book) => (
            <Link key={book.id} href={`/book/${book.id}`} style={{ 
              textDecoration: 'none', 
              color: 'inherit', 
              // --- VARIABLES PARA MODO OSCURO ---
              border: '1px solid var(--border-color)', 
              background: 'var(--card-bg)',
              // ----------------------------------
              padding: '10px', 
              borderRadius: '8px', 
              textAlign: 'center',
              transition: 'transform 0.2s', // Pequeño efecto al pasar el ratón
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}>
              <div>
                <img 
                  src={`/api/image-proxy?url=${encodeURIComponent(book.imageUrl)}`} 
                  alt={book.title} 
                  style={{ 
                    width: '100%', 
                    height: '180px', 
                    objectFit: 'cover', 
                    backgroundColor: '#eee', 
                    borderRadius: '4px' 
                  }} 
                />
                <h3 style={{ 
                  fontSize: '0.9rem', 
                  marginTop: '10px', 
                  marginBottom: '5px',
                  // Limita el título a 2 líneas para que no rompa la tarjeta
                  overflow: 'hidden', 
                  textOverflow: 'ellipsis', 
                  display: '-webkit-box', 
                  WebkitLineClamp: '2', 
                  WebkitBoxOrient: 'vertical' 
                }}>
                  {book.title}
                </h3>
              </div>
              <p style={{ fontSize: '0.8rem', opacity: 0.7, marginTop: 'auto' }}>{book.authors[0]}</p>
            </Link>
          )) : <p>No se encontraron resultados.</p>}
        </div>
      )}
    </div>
  );
}