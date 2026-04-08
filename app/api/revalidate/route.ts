import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export async function POST(req: NextRequest) {
  try {
    // Revalidate the landing page immediately
    revalidatePath('/');
    return NextResponse.json({ revalidated: true });
  } catch (e) {
    return NextResponse.json({ error: 'Revalidation failed' }, { status: 500 });
  }
}
