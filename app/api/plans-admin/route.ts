import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase';
import { revalidatePath } from 'next/cache';

export async function GET() {
  const sb = createAdminClient();
  const { data, error } = await sb.from('plans').select('*, features:plan_features(*)').order('order_index');
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}
export async function POST(req: NextRequest) {
  const sb = createAdminClient();
  const { features, ...body } = await req.json();
  const { data: plan, error } = await sb.from('plans').insert(body).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  if (features?.length) {
    await sb.from('plan_features').insert(
      features.map((f: Record<string, unknown>, i: number) => ({
        plan_id: plan.id, text_ar: f.text_ar, text_en: f.text_en, included: f.included ?? true, order_index: i,
      }))
    );
  }
  revalidatePath('/');
  return NextResponse.json(plan);
}
export async function PUT(req: NextRequest) {
  const sb = createAdminClient();
  const { id, features, ...rest } = await req.json();
  const { data, error } = await sb.from('plans').update(rest).eq('id', id).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  if (features !== undefined) {
    await sb.from('plan_features').delete().eq('plan_id', id);
    if (features.length) {
      await sb.from('plan_features').insert(
        features.map((f: Record<string, unknown>, i: number) => ({
          plan_id: id, text_ar: f.text_ar, text_en: f.text_en, included: f.included ?? true, order_index: i,
        }))
      );
    }
  }
  revalidatePath('/');
  return NextResponse.json(data);
}
export async function DELETE(req: NextRequest) {
  const sb = createAdminClient();
  const { id } = await req.json();
  const { error } = await sb.from('plans').delete().eq('id', id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  revalidatePath('/');
  return NextResponse.json({ ok: true });
}
