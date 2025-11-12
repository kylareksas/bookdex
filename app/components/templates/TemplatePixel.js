import styles from './TemplatePixel.module.css';
import { useState } from 'react'; // <-- ¡IMPORTANTE! Importa useState

export default function TemplatePixel({ book }) {
  const shortDescription = book.description ? 
    book.description.replace(/<[^>]+>/g, '').substring(0, 300) + '...' : 
    'No hay descripción.';

  const [rotation, setRotation] = useState(0);

  const playSound = (soundFile) => {
    try {
      const audio = new Audio(soundFile);
      audio.currentTime = 0; 
      audio.play();
    } catch (e) {
      console.error("Error al reproducir sonido:", e);
    }
  };

  const handleDpadClick = () => {
    // Suma 90 grados a la rotación anterior
    setRotation(prevRotation => prevRotation + 90);
    
    // --- ¡LÍNEA AÑADIDA! ---
    // (Asegúrate de tener 'rueda.mp3' en tu carpeta /public)
    playSound('/rueda.mp3'); 
  };

  return (
    <div className={styles.pokedexCase}>
      <div className={styles.screen}>
        {/* ... (el resto de tu pantalla no cambia) ... */}
        <div className={styles.screenContent}>
          <img 
            src={`/api/image-proxy?url=${encodeURIComponent(book.imageUrl)}`} 
            alt={book.title} 
            className={styles.cover} 
          />
          <div className={styles.data}>
            <p className={styles.title}>{book.title}</p>
            <p>AUTOR: {book.authors?.join(', ') || '??'}</p>
            <p>PÁGINAS: {book.pageCount || '??'}</p>
            
            <p style={{ marginTop: '10px' }}>EDITORIAL: {book.publisher || '??'}</p>
            <p>FECHA: {book.publishedDate || '??'}</p>
          </div>
        </div>
        <div className={styles.description}>
          <p>{shortDescription}</p>
        </div>
      </div>
      <div className={styles.controls}>
        
        <div 
          className={styles.dpad}
          onClick={handleDpadClick} // <-- Esto llama a la función de arriba
          style={{ transform: `rotate(${rotation}deg)` }}
        >
        </div>
        
        <p className={styles.brand}>Book-Dex</p> 
        <div className={styles.actionButtons}>
          <button 
            className={`${styles.button} ${styles.buttonA}`}
            onClick={() => playSound('/clicA.mp3')} 
          >
            A
          </button>
          <button 
            className={`${styles.button} ${styles.buttonB}`}
            onClick={() => playSound('/clicB.mp3')}
          >
            B
          </button>
        </div>
      </div>
    </div>
  );
}