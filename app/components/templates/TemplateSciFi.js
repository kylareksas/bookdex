import styles from './TemplateSciFi.module.css';

export default function TemplateSciFi({ book }) {
  const cleanDescription = book.description 
    ? book.description.replace(/<[^>]+>/g, '') 
    : 'No hay descripción disponible.';

  return (
    <div className={styles.hud}>
      <div className={styles.scanlines}></div>
      <div className={styles.header}>
        <h1 className={styles.title}>{book.title}</h1>
        <p className={styles.subtitle}>// REF: {book.id}</p>
      </div>
      
      <div className={styles.content}>
        <img 
          src={`/api/image-proxy?url=${encodeURIComponent(book.imageUrl)}`} 
          alt={book.title} 
          className={styles.cover} 
        />
        <div className={styles.details}>
          <p><strong>AUTOR:</strong> {book.authors?.join(', ') || 'N/A'}</p>
          <p><strong>PUBLICADO:</strong> {book.publishedDate || 'N/A'}</p>
          <p><strong>EDITORIAL:</strong> {book.publisher || 'N/A'}</p>
          <p><strong>PÁGINAS:</strong> {book.pageCount || 'N/A'}</p>
          <p><strong>CATEGORÍAS:</strong> {book.categories?.join(', ') || 'N/A'}</p>
        </div>
      </div>
      
      <div className={styles.description}>
        <h3>// ANÁLISIS DE DATOS:</h3>
        <p>{cleanDescription}</p>
      </div>
    </div>
  );
}