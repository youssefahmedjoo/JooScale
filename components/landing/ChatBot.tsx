'use client';
import { useState, useEffect, useRef } from 'react';
import { useLang } from '@/components/LangProvider';
import type { ChatMessage } from '@/types';

export function ChatBot() {
  const { lang, t, dir } = useLang();
  const [open, setOpen]         = useState(false);
  const [bubble, setBubble]     = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput]       = useState('');
  const [loading, setLoading]   = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  const BUBBLE_MSGS = {
    ar: ['محتاج مساعدة في تنمية أعمالك؟ 🚀','اسألني عن أي خدمة من خدماتنا!','خلينا نوصل لأهدافك سوا 🎯'],
    en: ['Need help scaling your business? 🚀','Ask me about any of our services!','Let\'s reach your goals together 🎯'],
  };
  const [bubbleIdx] = useState(() => Math.floor(Math.random()*3));

  // Show bubble after 4s
  useEffect(() => {
    if (dismissed || open) return;
    const timer = setTimeout(()=>setBubble(true), 4000);
    return ()=>clearTimeout(timer);
  }, [dismissed, open]);

  useEffect(()=>{ if (open) setBubble(false); }, [open]);

  // Welcome message on first open
  useEffect(()=>{
    if (open && messages.length===0) {
      setMessages([{ role:'assistant', content: t(
        'أهلاً! أنا المساعد الذكي لـ Jooscale 👋\nكيف أقدر أساعدك؟',
        "Hello! I'm Jooscale's AI assistant 👋\nHow can I help you today?"
      ) as string }]);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useEffect(()=>{ endRef.current?.scrollIntoView({ behavior:'smooth' }); }, [messages]);

  const send = async () => {
    if (!input.trim() || loading) return;
    const userMsg: ChatMessage = { role:'user', content:input.trim() };
    setMessages(p=>[...p, userMsg]);
    setInput('');
    setLoading(true);
    try {
      const res  = await fetch('/api/chat',{ method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({ messages:[...messages, userMsg] }) });
      const data = await res.json();
      setMessages(p=>[...p,{ role:'assistant', content: data.reply || t('عذراً، حدث خطأ.','Sorry, an error occurred.') as string }]);
    } catch {
      setMessages(p=>[...p,{ role:'assistant', content: t('خطأ في الاتصال.','Connection error.') as string }]);
    } finally { setLoading(false); }
  };

  const onKey = (e: React.KeyboardEvent) => { if (e.key==='Enter' && !e.shiftKey){ e.preventDefault(); send(); } };

  // FAB position: right-6 in LTR, left-6 in RTL — flips with language
  const fabPos    = dir==='rtl' ? 'left-6 right-auto' : 'right-6 left-auto';
  // Chat window aligns to same side
  const winAlign  = dir==='rtl' ? 'left-0 right-auto' : 'right-0 left-auto';

  return (
    /* exact from HTML: fixed bottom-24 right-6 md:bottom-8 md:right-8 z-[60] */
    <div className={`fixed bottom-24 md:bottom-8 z-[60] ${fabPos}`}>

      {/* Notification bubble */}
      {bubble && !open && (
        <div className={`bubble-pop absolute mb-2 ${winAlign}`} style={{ bottom:72 }}>
          <div
            onClick={()=>{ setOpen(true); setBubble(false); }}
            className="glass-card border border-white/40 rounded-2xl px-4 py-3 shadow-xl max-w-[220px] cursor-pointer relative"
          >
            <button
              onClick={e=>{ e.stopPropagation(); setBubble(false); setDismissed(true); }}
              className="absolute -top-2 -right-2 w-5 h-5 bg-on-surface text-white rounded-full text-xs flex items-center justify-center hover:bg-error transition-colors"
            >×</button>
            <p className="text-on-surface text-xs font-bold leading-relaxed">{BUBBLE_MSGS[lang][bubbleIdx]}</p>
          </div>
          <div className={`absolute -bottom-1.5 w-3 h-3 ${dir==='rtl'?'left-4':'right-4'}`}
            style={{ background:'rgba(255,255,255,0.7)', clipPath:'polygon(0 0,100% 0,0 100%)' }} />
        </div>
      )}

      {/* Chat window */}
      {open && (
        <div
          className={`absolute mb-2 flex flex-col rounded-[1.5rem] overflow-hidden shadow-2xl border border-white/30 ${winAlign}`}
          style={{ bottom:72, width:340, height:480, background:'rgba(245,250,255,0.97)', backdropFilter:'blur(32px)' }}
          dir={dir}
        >
          {/* Header */}
          <div className="bg-gradient-primary px-4 py-3 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
                <span className="material-symbols-outlined text-white" style={{ fontSize:20, fontVariationSettings:"'FILL' 1" }}>auto_awesome</span>
              </div>
              <div>
                <p className="text-white font-black text-sm">Jooscale AI</p>
                <div className="flex items-center gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-white/70 text-[10px]">{t('متصل','Online')}</span>
                </div>
              </div>
            </div>
            <button onClick={()=>setOpen(false)} className="p-1.5 rounded-xl hover:bg-white/10 transition-colors">
              <span className="material-symbols-outlined text-white" style={{ fontSize:20 }}>close</span>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 chat-scroll">
            {messages.map((msg,i)=>(
              <div key={i} className={`flex ${msg.role==='user'?'justify-end':'justify-start'}`}>
                {msg.role==='assistant' && (
                  <div className="w-7 h-7 rounded-full bg-gradient-primary flex items-center justify-center flex-shrink-0 me-2 mt-1">
                    <span className="material-symbols-outlined text-white" style={{ fontSize:14, fontVariationSettings:"'FILL' 1" }}>auto_awesome</span>
                  </div>
                )}
                <div className={`max-w-[78%] px-4 py-2.5 text-sm leading-relaxed whitespace-pre-wrap ${
                  msg.role==='user'
                    ?'bg-gradient-primary text-white rounded-2xl rounded-ee-sm'
                    :'bg-surface-container text-on-surface rounded-2xl rounded-es-sm shadow-sm'
                }`}>{msg.content}</div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="w-7 h-7 rounded-full bg-gradient-primary flex items-center justify-center flex-shrink-0 me-2 mt-1">
                  <span className="material-symbols-outlined text-white" style={{ fontSize:14, fontVariationSettings:"'FILL' 1" }}>auto_awesome</span>
                </div>
                <div className="bg-surface-container rounded-2xl rounded-es-sm px-4 py-3 flex gap-1.5 items-center">
                  {[0,0.15,0.3].map((d,i)=>(
                    <div key={i} className="w-2 h-2 rounded-full bg-primary-container animate-bounce" style={{ animationDelay:`${d}s` }} />
                  ))}
                </div>
              </div>
            )}
            <div ref={endRef} />
          </div>

          {/* Input */}
          <div className="p-3 border-t border-outline-variant/20 flex items-end gap-2 flex-shrink-0">
            <textarea
              value={input} onChange={e=>setInput(e.target.value)} onKeyDown={onKey}
              placeholder={t('اكتب رسالتك...','Type your message...') as string}
              rows={1} dir={dir}
              className="flex-1 resize-none rounded-xl border border-outline-variant/30 bg-surface-container-low px-3 py-2.5 text-sm text-on-surface placeholder-on-surface-variant/50 focus:outline-none focus:border-primary transition-colors"
              style={{ maxHeight:80 }}
            />
            <button onClick={send} disabled={!input.trim()||loading}
              className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center flex-shrink-0 disabled:opacity-40 hover:brightness-110 transition-all">
              <span className="material-symbols-outlined text-white" style={{ fontSize:18 }}>send</span>
            </button>
          </div>
        </div>
      )}

      {/* FAB — exact from landing.html */}
      <button
        onClick={()=>setOpen(o=>!o)}
        className="flex items-center gap-3 bg-white/90 backdrop-blur-xl border border-[#00AEEF]/20 px-6 py-4 rounded-full shadow-[0px_20px_40px_rgba(0,174,239,0.2)] group hover:scale-105 active:scale-95 transition-all"
      >
        <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center">
          <span className="material-symbols-outlined text-white" style={{ fontSize:22, fontVariationSettings:"'FILL' 1" }}>auto_awesome</span>
        </div>
        <span className="font-label font-extrabold text-xs uppercase tracking-widest text-primary">
          {t('مساعد ذكي','AI Support')}
        </span>
      </button>
    </div>
  );
}
