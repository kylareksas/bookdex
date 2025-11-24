import styles from './TemplatePixel.module.css';
import { useState } from 'react'; 

export default function TemplatePixel({ book }) {
  
  // --- ¡CAMBIO AQUÍ! ---
  // Ya no acortamos la descripción. Solo la limpiamos de HTML.
  const cleanDescription = book.description 
    ? book.description.replace(/<[^>]+>/g, '') 
    : 'No hay descripción disponible.';

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
    setRotation(prevRotation => prevRotation + 90);
    playSound('/rueda.mp3'); 
  };

  return (
    <div className={styles.pokedexCase}>
      <div className={styles.screen}>
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
          {/* --- ¡CAMBIO AQUÍ! --- */}
          {/* Ahora usamos la descripción completa y limpia */}
          <p>{cleanDescription}</p> 
        </div>
      </div>
      <div className={styles.controls}>
        <div 
          className={styles.dpad}
          onClick={handleDpadClick}
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