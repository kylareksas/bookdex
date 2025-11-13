'use client'; 

import { useState, useEffect, useRef } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link'; 
import html2canvas from 'html2canvas';

// Importaciones de todas las plantillas
import TemplateClassic from '../../components/templates/TemplateClassic';
import TemplatePixel from '../../components/templates/TemplatePixel';
import TemplateSciFi from '../../components/templates/TemplateSciFi';
import TemplateFantasy from '../../components/templates/TemplateFantasy';
import TemplateComic from '../../components/templates/TemplateComic';

// Estilos de los botones
const buttonStyle = {
  padding: '6px 12px',
  borderRadius: '6px',
  backgroundColor: '#f0f0f0',
  color: '#333',
  border: '1px solid #ccc',
  cursor: 'pointer',
  margin: '0 5px',
  fontSize: '0.9rem',
};

const primaryButtonStyle = {
  ...buttonStyle,
  backgroundColor: '#28a745',
  color: 'white',
  fontWeight: 'bold',
  border: 'none',
};

const disabledButtonStyle = {
  ...buttonStyle,
  backgroundColor: '#007bff',
  color: 'white',
  border: 'none',
  opacity: 1, 
};

export default function BookDetailPage() {
  const params = useParams();
  const id = params?.id;
  const [book, setBook] = useState(null); // <-- EMPIEZA COMO NULL
  const [loading, setLoading] = useState(true); // <-- EMPIEZA COMO TRUE
  const [template, setTemplate] = useState('pixel'); 
  const [feedback, setFeedback] = useState(''); 
  const sheetRef = useRef(null);

  useEffect(() => {
    if (id) {
      setLoading(true);
      fetch(`/api/book/${id}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            console.error('Error desde nuestra API:', data.error);
            setBook(null); 
          } else {
            setBook(data); 
          }
          setLoading(false);
        })
        .catch((err) => {
          console.error('Fetch fallido:', err);
          setLoading(false);
          setBook(null);
        });
    }
  }, [id]);

  // --- Funciones de los Botones ---

  const handleDownload = () => {
    if (!sheetRef.current) return;
    setFeedback('Descargando...');
    
    html2canvas(sheetRef.current, { 
      useCORS: true, 
      scale: 2 
    }).then((canvas) => {
      const link = document.createElement('a');
      link.download = `${book.title.replace(/ /g, '_')}_ficha.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
      setFeedback('¡Descargado!');
      setTimeout(() => setFeedback(''), 2000);
    });
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setFeedback('¡Enlace copiado!');
    setTimeout(() => setFeedback(''), 2000);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Ficha de ${book.title}`,
          text: `Mira la ficha de ${book.title} que he creado:`,
          url: window.location.href,
        });
      } catch (error) {
        console.error('Error al compartir', error);
      }
    } else {
      handleCopyLink();
    }
  };

  // --- ¡¡AQUÍ ESTÁ LA SOLUCIÓN!! ---
  // Estas líneas se ejecutan antes del return principal.

  // 1. Si está cargando, muestra "Cargando..." y no sigue.
  if (loading) {
    return <p style={{ textAlign: 'center', padding: '50px' }}>Cargando ficha...</p>;
  }

  // 2. Si terminó de cargar y el libro sigue siendo null (error), muestra "Error..." y no sigue.
  if (!book) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <p>Error: Libro no encontrado.</p>
        <Link href="/">← Volver al buscador</Link>
      </div>
    );
  }

  // --- FIN DE LA SOLUCIÓN ---

  // Si el código llega aquí, significa que 'loading' es false Y 'book' es un objeto válido.
  // Ahora es seguro renderizar las plantillas.
  return (
    <div style={{ padding: '20px', maxWidth: '1000px', margin: 'auto' }}>
      
      <Link href="/" style={{ marginBottom: '20px', display: 'inline-block', color: 'blue', textDecoration: 'underline' }}>
        ← Volver al buscador
      </Link>

      <div style={{ marginBottom: '20px', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '10px' }}>
        
        <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '5px' }}>
          <label style={{ marginRight: '10px' }}>Elegir plantilla: </label>
          <button 
            onClick={() => setTemplate('classic')} 
            disabled={template === 'classic'}
            style={template === 'classic' ? disabledButtonStyle : buttonStyle}
          >
            Clásica
          </button>
          <button 
            onClick={() => setTemplate('pixel')} 
            disabled={template === 'pixel'}
            style={template === 'pixel' ? disabledButtonStyle : buttonStyle}
          >
            Pixel
          </button>
          <button 
            onClick={() => setTemplate('scifi')} 
            disabled={template === 'scifi'}
            style={template === 'scifi' ? disabledButtonStyle : buttonStyle}
          >
            Sci-Fi
          </button>
          <button 
            onClick={() => setTemplate('fantasy')} 
            disabled={template === 'fantasy'}
            style={template === 'fantasy' ? disabledButtonStyle : buttonStyle}
          >
            Fantasía
          </button>
          <button 
            onClick={() => setTemplate('comic')} 
            disabled={template === 'comic'}
            style={template === 'comic' ? disabledButtonStyle : buttonStyle}
          >
            Cómic
          </button>
        </div>

        <div style={{ display: 'flex', flexShrink: 0 }}>
          <button onClick={handleCopyLink} style={buttonStyle}>Copiar Enlace</button>
          <button onClick={handleShare} style={buttonStyle}>Compartir</button>
          <button onClick={handleDownload} style={primaryButtonStyle}>Descargar Imagen</button>
        </div>

      </div>
      {feedback && <p style={{ color: 'green', textAlign: 'center' }}>{feedback}</p>}

      <div ref={sheetRef}>
        {template === 'classic' && <TemplateClassic book={book} />}
        {template === 'pixel' && <TemplatePixel book={book} />}
        {template === 'scifi' && <TemplateSciFi book={book} />}
        {template === 'fantasy' && <TemplateFantasy book={book} />}
        {template === 'comic' && <TemplateComic book={book} />}
      </div>

    </div>
  );
}