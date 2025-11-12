'use client'; 

import { useState, useEffect, useRef } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link'; 
import html2canvas from 'html2canvas';

import TemplateClassic from '../../components/templates/TemplateClassic';
import TemplatePixel from '../../components/templates/TemplatePixel';

// Estilos de los botones (ahora definidos aquí)
const buttonStyle = {
  padding: '6px 12px',
  borderRadius: '6px',
  backgroundColor: '#f0f0f0',
  color: '#333',
  border: '1px solid #ccc',
  cursor: 'pointer',
  margin: '0 5px',
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
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [template, setTemplate] = useState('classic');
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

  // --- ¡¡AQUÍ ESTÁ EL CÓDIGO QUE FALTABA!! ---

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
      // Fallback para escritorio (copiar enlace)
      handleCopyLink();
    }
  };

  // --- FIN DEL CÓDIGO QUE FALTABA ---


  if (loading) return <p style={{ textAlign: 'center', padding: '50px' }}>Cargando ficha...</p>;
  if (!book) return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <p>Error: Libro no encontrado.</p>
      <Link href="/">← Volver al buscador</Link>
    </div>
  );

  return (
    <div style={{ padding: '20px', maxWidth: '1000px', margin: 'auto' }}>
      
      <Link href="/" style={{ marginBottom: '20px', display: 'inline-block', color: 'blue', textDecoration: 'underline' }}>
        ← Volver al buscador
      </Link>

      <div style={{ marginBottom: '20px', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '10px' }}>
        
        <div style={{ display: 'flex', alignItems: 'center' }}>
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
        </div>

        <div style={{ display: 'flex' }}>
          {/* Estos botones ahora funcionarán */}
          <button onClick={handleCopyLink} style={buttonStyle}>Copiar Enlace</button>
          <button onClick={handleShare} style={buttonStyle}>Compartir</button>
          <button onClick={handleDownload} style={primaryButtonStyle}>Descargar Imagen</button>
        </div>

      </div>
      {feedback && <p style={{ color: 'green', textAlign: 'center' }}>{feedback}</p>}

      <div ref={sheetRef}>
        {template === 'classic' && <TemplateClassic book={book} />}
        {template === 'pixel' && <TemplatePixel book={book} />}
      </div>

    </div>
  );
}