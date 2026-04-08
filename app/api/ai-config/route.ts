import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase';

export async function GET() {
  const sb = createAdminClient();
  const { data, error } = await sb.from('ai_config').select('*').single();
  // لو مفيش row خالص، نرجع قيم فارغة — الـ PUT هيعملها
  if (error) return NextResponse.json({ id: null, system_prompt: '', knowledge_base: '' });
  return NextResponse.json(data);
}

export async function PUT(req: NextRequest) {
  const sb = createAdminClient();
  const { id, ...rest } = await req.json();
  const payload = { ...rest, updated_at: new Date().toISOString() };

  if (id) {
    // Row موجودة — عمل UPDATE
    const { data, error } = await sb
      .from('ai_config')
      .update(payload)
      .eq('id', id)
      .select()
      .single();
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json(data);
  } else {
    // مفيش row — عمل INSERT
    const { data, error } = await sb
      .from('ai_config')
      .insert(payload)
      .select()
      .single();
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json(data);
  }
}
