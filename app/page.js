import SearchBar from './components/SearchBar';

export default function HomePage() {
  return (
    <main style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', gap: '20px' }}>
      <h1 style={{ fontSize: '2.5rem' }}>Book-Dex</h1>
      <p>Encuentra tu libro o manga y crea una ficha personalizada.</p>
      <SearchBar />
    </main>
  );
}