'use client'; 

import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function SearchPage() {
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
    }
  }, [query]);

  return (
    <div style={{ padding: '20px' }}>
      <Link href="/">← Volver</Link>
      <h1 style={{ marginTop: '20px' }}>Resultados para: "{query}"</h1>
      {loading ? (
        <p>Buscando...</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '20px' }}>
          {books.length > 0 ? books.map((book) => (
            <Link key={book.id} href={`/book/${book.id}`} style={{ textDecoration: 'none', color: 'inherit', border: '1px solid #ddd', padding: '10px', borderRadius: '8px', textAlign: 'center' }}>
              <img 
                // --- ¡CAMBIO AQUÍ! ---
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