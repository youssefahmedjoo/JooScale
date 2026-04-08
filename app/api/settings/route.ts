import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';

export async function GET() {
  const sb = createAdminClient();
  const { data, error } = await sb.from('settings').select('*').single();
  if (error) return NextResponse.json({ id: null, messenger_link: 'https://m.me/jooscale', site_email: 'hello@jooscale.com' });
  return NextResponse.json(data);
}

export async function PUT(req: NextRequest) {
  const sb = createAdminClient();
  const { id, ...rest } = await req.json();
  const payload = { ...rest, updated_at: new Date().toISOString() };

  if (id) {
    const { data, error } = await sb
      .from('settings')
      .update(payload)
      .eq('id', id)
      .select()
      .single();
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    revalidatePath('/');
    return NextResponse.json(data);
  } else {
    const { data, error } = await sb
      .from('settings')
      .insert(payload)
      .select()
      .single();
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    revalidatePath('/');
    return NextResponse.json(data);
  }
}
