import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(request, context) {
  
  const params = await context.params;
  const id = params.id; 

  if (!id) {
    return NextResponse.json({ error: 'Book ID is required' }, { status: 400 });
  }

  try {
    // --- AQUÍ ESTÁ LA CORRECCIÓN ---
    const response = await axios.get(`https://www.googleapis.com/books/v1/volumes/${id}`);
    
    const item = response.data;
    const imageUrl = item.volumeInfo.imageLinks?.medium || item.volumeInfo.imageLinks?.thumbnail || '/placeholder.png';
    const bookDetails = {
      id: item.id,
      title: item.volumeInfo.title,
      subtitle: item.volumeInfo.subtitle,
      authors: item.volumeInfo.authors || ['Desconocido'],
      publisher: item.volumeInfo.publisher,
      publishedDate: item.volumeInfo.publishedDate,
      description: item.volumeInfo.description,
      pageCount: item.volumeInfo.pageCount,
      categories: item.volumeInfo.categories || [],
      imageUrl: imageUrl.replace('http://', 'https://'),
    };

    return NextResponse.json(bookDetails);
  } catch (error) {
    console.error(error); // El error 404 salía aquí
    return NextResponse.json({ error: 'Error fetching book details from Google API' }, { status: 500 });
  }
}