import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';

export async function GET() {
  const sb = createAdminClient();
  const { data, error } = await sb
    .from('portfolio')
    .select('*, media:portfolio_media(*)')
    .order('order_index');
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}
export async function POST(req: NextRequest) {
  const sb = createAdminClient();
  const { media, ...body } = await req.json();
  const { data: port, error } = await sb.from('portfolio').insert(body).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  if (media?.length) {
    await sb.from('portfolio_media').insert(
      media.map((m: Record<string,unknown>, i: number) => ({ portfolio_id: port.id, media_type: m.media_type, media_url: m.media_url, order_index: i }))
    );
  }
  revalidatePath('/'); return NextResponse.json(port);
}
export async function PUT(req: NextRequest) {
  const sb = createAdminClient();
  const { id, media, ...rest } = await req.json();
  const { data, error } = await sb.from('portfolio').update(rest).eq('id', id).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  if (media !== undefined) {
    await sb.from('portfolio_media').delete().eq('portfolio_id', id);
    if (media.length) {
      await sb.from('portfolio_media').insert(
        media.map((m: Record<string,unknown>, i: number) => ({ portfolio_id: id, media_type: m.media_type, media_url: m.media_url, order_index: i }))
      );
    }
  }
  revalidatePath('/'); return NextResponse.json(data);
}
export async function DELETE(req: NextRequest) {
  const sb = createAdminClient();
  const { id } = await req.json();
  const { error } = await sb.from('portfolio').delete().eq('id', id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  revalidatePath('/'); return NextResponse.json({ ok: true });
}
