import styles from './TemplateFantasy.module.css';

export default function TemplateFantasy({ book }) {
  const cleanDescription = book.description 
    ? book.description.replace(/<[^>]+>/g, '') 
    : 'No hay descripción disponible.';

  return (
    <div className={styles.scroll}>
      <h1 className={styles.title}>{book.title}</h1>
      <p className={styles.author}>Una crónica de {book.authors?.join(', ') || 'un autor desconocido'}</p>
      
      <div className={styles.content}>
        <img 
          src={`/api/image-proxy?url=${encodeURIComponent(book.imageUrl)}`} 
          alt={book.title} 
          className={styles.cover} 
        />
        <div className={styles.details}>
          <h3>Detalles del Tomo</h3>
          <p><strong>Editorial:</strong> {book.publisher || 'N/A'}</p>
          <p><strong>Publicado:</strong> {book.publishedDate || 'N/A'}</p>
          <p><strong>Páginas:</strong> {book.pageCount || 'N/A'}</p>
          <p><strong>Categorías:</strong> {book.categories?.join(', ') || 'N/A'}</p>
        </div>
      </div>
      
      <div className={styles.description}>
        <h3>Resumen</h3>
        <p>{cleanDescription}</p>
      </div>
    </div>
  );
}