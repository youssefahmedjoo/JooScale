import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';

export async function GET() {
  const sb = createAdminClient();
  const { data, error } = await sb.from('services').select('*').order('order_index');
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}
export async function POST(req: NextRequest) {
  const sb = createAdminClient();
  const { data, error } = await sb.from('services').insert(await req.json()).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  revalidatePath('/'); return NextResponse.json(data);
}
export async function PUT(req: NextRequest) {
  const sb = createAdminClient();
  const { id, ...rest } = await req.json();
  const { data, error } = await sb.from('services').update(rest).eq('id', id).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  revalidatePath('/'); return NextResponse.json(data);
}
export async function DELETE(req: NextRequest) {
  const sb = createAdminClient();
  const { id } = await req.json();
  const { error } = await sb.from('services').delete().eq('id', id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  revalidatePath('/'); return NextResponse.json({ ok: true });
}
