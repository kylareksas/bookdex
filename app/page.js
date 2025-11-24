'use client'; // Asegúrate de tener esto si usas hooks, si no quítalo.
import SearchBar from './components/SearchBar';

export default function HomePage() {
  return (
    <main style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      minHeight: '100vh', 
      gap: '20px',
      padding: '20px',
      textAlign: 'center',
      // ELIMINADO: backgroundColor: '#ffffff' 
      // ELIMINADO: color fijos
    }}>
      <h1 style={{ fontSize: '2.5rem' }}>Book-Dex</h1>
      <p style={{ opacity: 0.8 }}>Encuentra tu libro o manga y crea una ficha personalizada.</p>
      <SearchBar />
    </main>
  );
}