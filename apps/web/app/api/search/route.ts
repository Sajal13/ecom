import { NextResponse } from 'next/server';
import { getProducts } from 'actions/products'; // adjust path if needed

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const q = searchParams.get('q');

    if (!q || q.length < 1) {
      return NextResponse.json({ products: [] });
    }

    const data = await getProducts({
      q,
      limit: 10,
    });

    return NextResponse.json({
      products: data.products || [],
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Search failed' },
      { status: 500 }
    );
  }
}
