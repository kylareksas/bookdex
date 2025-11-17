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
      padding: '20px',         // <-- ¡AÑADIDO PADDING!
      textAlign: 'center'      // Centra el texto en móviles
    }}>
      {/* ... resto del código ... */}
    </main>
  );
}