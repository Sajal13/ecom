import { NextResponse } from 'next/server';
import { getCartItems } from 'actions/products'; // adjust path if needed

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const skipParam = searchParams.get('skip');

    if (!skipParam) {
      return NextResponse.json({ products: [] });
    }

    const skip = Number(skipParam);

    if (isNaN(skip)) {
      return NextResponse.json(
        { error: 'Invalid skip value' },
        { status: 400 }
      );
    }

    const data = await getCartItems({
      userId: 33,
      skip,
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

