'use client'; 

import { useState, useEffect, useRef } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link'; 
import html2canvas from 'html2canvas';

// --- ¡NUEVAS IMPORTACIONES! ---
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
  fontSize: '0.9rem', // Tamaño de fuente unificado
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
  
  // Sigue en 'pixel' por defecto, como pediste
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

  // --- Funciones de los Botones (sin cambios) ---
  const handleDownload = () => { /* ...tu código... */ };
  const handleCopyLink = () => { /* ...tu código... */ };
  const handleShare = () => { /* ...tu código... */ };
  // (Asegúrate de que las funciones completas de antes están aquí)
  
  // (Código de if loading / if !book sin cambios)
  // ...

  return (
    <div style={{ padding: '20px', maxWidth: '1000px', margin: 'auto' }}>
      
      <Link href="/" style={{ marginBottom: '20px', display: 'inline-block', color: 'blue', textDecoration: 'underline' }}>
        ← Volver al buscador
      </Link>

      {/* --- ¡SECCIÓN DE CONTROLES ACTUALIZADA! --- */}
      <div style={{ marginBottom: '20px', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '10px' }}>
        
        <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '5px' }}>
          <label style={{ marginRight: '10px' }}>Elegir plantilla: </label>
          {/* Botón Clásica */}
          <button 
            onClick={() => setTemplate('classic')} 
            disabled={template === 'classic'}
            style={template === 'classic' ? disabledButtonStyle : buttonStyle}
          >
            Clásica
          </button>
          {/* Botón Pixel */}
          <button 
            onClick={() => setTemplate('pixel')} 
            disabled={template === 'pixel'}
            style={template === 'pixel' ? disabledButtonStyle : buttonStyle}
          >
            Pixel
          </button>
          {/* ¡NUEVO! Botón Sci-Fi */}
          <button 
            onClick={() => setTemplate('scifi')} 
            disabled={template === 'scifi'}
            style={template === 'scifi' ? disabledButtonStyle : buttonStyle}
          >
            Sci-Fi
          </button>
          {/* ¡NUEVO! Botón Fantasía */}
          <button 
            onClick={() => setTemplate('fantasy')} 
            disabled={template === 'fantasy'}
            style={template === 'fantasy' ? disabledButtonStyle : buttonStyle}
          >
            Fantasía
          </button>
          {/* ¡NUEVO! Botón Cómic */}
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

      {/* --- ¡SECCIÓN DE RENDERIZADO ACTUALIZADA! --- */}
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