import styles from './TemplateComic.module.css';

export default function TemplateComic({ book }) {
  const cleanDescription = book.description 
    ? book.description.replace(/<[^>]+>/g, '') 
    : 'No hay descripción disponible.';

  return (
    <div className={styles.comicSheet}>
      <div className={styles.titleBox}>
        <h1 className={styles.title}>{book.title}</h1>
      </div>
      
      <p className={styles.author}>POR {book.authors?.join(', ') || 'DESCONOCIDO'}</p>

      <div className={styles.content}>
        <img 
          src={`/api/image-proxy?url=${encodeURIComponent(book.imageUrl)}`} 
          alt={book.title} 
          className={styles.cover} 
        />
        <div className={styles.details}>
          <p><strong>EDITORIAL:</strong> {book.publisher || 'N/A'}</p>
          <p><strong>PUBLICADO:</strong> {book.publishedDate || 'N/A'}</p>
          <p><strong>PÁGINAS:</strong> {book.pageCount || 'N/A'}</p>
          <p><strong>CATEGORÍAS:</strong> {book.categories?.join(', ') || 'N/A'}</p>
        </div>
      </div>
      
      <div className={styles.description}>
        <p>{cleanDescription}</p>
      </div>
    </div>
  );
}