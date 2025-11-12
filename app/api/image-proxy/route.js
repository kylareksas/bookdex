import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const imageUrl = searchParams.get('url');

  if (!imageUrl) {
    return NextResponse.json({ error: 'URL is required' }, { status: 400 });
  }

  try {
    // 1. Hacemos la petición a la URL de la imagen externa
    const response = await fetch(imageUrl);

    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.statusText}`);
    }

    // 2. Obtenemos la imagen como un 'blob' (datos binarios)
    const imageBlob = await response.blob();
    
    // 3. Obtenemos el tipo de contenido original (ej: 'image/jpeg')
    const contentType = response.headers.get('content-type') || 'image/jpeg';

    // 4. Devolvemos la imagen al cliente con el tipo de contenido correcto
    return new NextResponse(imageBlob, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        // Hacemos que el navegador guarde esta imagen en caché por un año
        'Cache-Control': 'public, max-age=31536000, immutable', 
      },
    });

  } catch (error) {
    console.error('Image proxy error:', error);
    return NextResponse.json({ error: 'Error fetching image' }, { status: 500 });
  }
}