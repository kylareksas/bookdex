// app/search/page.js

// ¡Importa Suspense!
import { Suspense } from 'react';
import Link from 'next/link';
// Importa el nuevo componente
import SearchResults from '../components/SearchResults'; 

// Esta página ahora es un Server Component (no más 'use client')
export default function SearchPage() {
  
  return (
    <div style={{ padding: '20px' }}>
      <Link href="/">← Volver</Link>
      
      {/* ¡AQUÍ ESTÁ LA MAGIA! */}
      <Suspense fallback={<p style={{ marginTop: '20px' }}>Cargando resultados...</p>}>
        <SearchResults />
      </Suspense>

    </div>
  );
}