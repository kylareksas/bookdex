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
      padding: '20px',    // <-- ESTO ES LO IMPORTANTE PARA MÓVIL
      textAlign: 'center',
      backgroundColor: '#ffffff'
    }}>
      <h1 style={{ fontSize: '2.5rem', color: '#000' }}>Book-Dex</h1>
      <p style={{ color: '#555' }}>Encuentra tu libro o manga y crea una ficha personalizada.</p>
      <SearchBar />
    </main>
  );
}