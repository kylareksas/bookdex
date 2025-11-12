import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');

  if (!query) {
    return NextResponse.json({ error: 'Query is required' }, { status: 400 });
  }

  try {
    const response = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&maxResults=20`);
    
    // Simplificamos los datos antes de enviarlos al front-end
    const items = response.data.items || [];
    
    const books = items.map((item) => {
      // Obtenemos la URL de la imagen
      const imageUrl = item.volumeInfo.imageLinks?.thumbnail || '/placeholder.png';
      
      // Devolvemos el objeto del libro con la URL corregida
      return {
        id: item.id,
        title: item.volumeInfo.title,
        authors: item.volumeInfo.authors || ['Desconocido'],
        // --- ARREGLO APLICADO AQUÍ ---
        imageUrl: imageUrl.replace('http://', 'https://'), 
      };
    });

    return NextResponse.json(books);
    
  } catch (error) {
    console.error('Error en API Search:', error.message);
    return NextResponse.json({ error: 'Error fetching books' }, { status: 500 });
  }
}