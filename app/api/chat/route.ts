import { NextRequest, NextResponse } from 'next/server';
import Groq from 'groq-sdk';
import { createAdminClient } from '@/lib/supabase';

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();
    const sb = createAdminClient();
    const [{ data: ai }, { data: st }] = await Promise.all([
      sb.from('ai_config').select('system_prompt,knowledge_base').single(),
      sb.from('settings').select('messenger_link,whatsapp_number').single(),
    ]);

    const system = `${ai?.system_prompt ?? 'You are a helpful assistant for Jooscale.'}

${ai?.knowledge_base ? `=== Knowledge Base ===\n${ai.knowledge_base}` : ''}
${st?.messenger_link  ? `Messenger: ${st.messenger_link}`  : ''}
${st?.whatsapp_number ? `WhatsApp: +${st.whatsapp_number}` : ''}

Rules:
- Reply in the same language the user writes in.
- Be concise, friendly, and professional.
- Never invent information not in the knowledge base.
- If user wants contact, provide Messenger or WhatsApp.`;

    const completion = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      max_tokens: 600, temperature: 0.7,
      messages: [{ role:'system', content:system }, ...messages.slice(-10)],
    });
    return NextResponse.json({ reply: completion.choices[0]?.message?.content ?? '' });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error:'AI error' }, { status:500 });
  }
}
