import styles from './TemplateClassic.module.css';

export default function TemplateClassic({ book }) {
  
  const cleanDescription = book.description 
    ? book.description.replace(/<[^>]+>/g, '') 
    : 'No hay descripción disponible.';

  return (
    <div className={styles.sheet}>
      
      <div className={styles.header}>
        <img 
          // --- ¡CAMBIO AQUÍ! ---
          src={`/api/image-proxy?url=${encodeURIComponent(book.imageUrl)}`} 
          alt={book.title} 
          className={styles.cover} 
        />
        <div className={styles.headerInfo}>
          <h1 className={styles.title}>{book.title}</h1>
          <h2 className={styles.subtitle}>{book.subtitle}</h2>
          <p className={styles.author}>por {book.authors?.join(', ') || 'Desconocido'}</p>
          
          <div className={styles.details}>
            <h3>Detalles</h3>
            <p><strong>Editorial:</strong> {book.publisher || 'N/A'}</p>
            <p><strong>Publicado:</strong> {book.publishedDate || 'N/A'}</p>
            <p><strong>Páginas:</strong> {book.pageCount || 'N/A'}</p>
            <p><strong>Categorías:</strong> {book.categories?.join(', ') || 'N/A'}</p>
          </div>
        </div>
      </div>
      
      <div className={styles.body}>
        <div className={styles.description}>
          <h3>Descripción</h3>
          <p>{cleanDescription}</p>
        </div>
      </div>
    </div>
  );
}