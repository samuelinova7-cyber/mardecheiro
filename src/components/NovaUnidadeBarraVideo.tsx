import React, { useState, useRef } from 'react';
import { 
  Play, Pause, Volume2, VolumeX, Sparkles, MapPin, 
  MessageSquare, CheckCircle2, Clock, Award, ShieldCheck, ArrowRight, Star
} from 'lucide-react';

export default function NovaUnidadeBarraVideo() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const videoUrl = "https://res.cloudinary.com/dbuiqh0ee/video/upload/v1788317978/WhatsApp_Video_2026-09-01_at_11.44.01_PM_odesum.mp4";

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const toggleAudio = () => {
    if (videoRef.current) {
      const nextMuted = !isMuted;
      videoRef.current.muted = nextMuted;
      setIsMuted(nextMuted);
    }
  };

  return (
    <section id="nova-unidade-barra" className="py-20 bg-gradient-to-b from-[#09112e] via-[#0f1d4f] to-[#09112e] text-white relative overflow-hidden">
      {/* Glow decorativo de fundo */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-sky-500/15 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Cabeçalho da Seção */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500/20 to-sky-500/20 border border-amber-400/40 backdrop-blur-md px-4 py-1.5 rounded-full text-amber-300 text-xs sm:text-sm font-bold shadow-lg mb-4">
            <Sparkles className="w-4 h-4 text-amber-400 animate-spin-slow" />
            <span>INAUGURAÇÃO • NOVA UNIDADE</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4">
            Mar de Cheiro em <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-blue-200 to-amber-300">
              Barra de São Miguel
            </span>
          </h2>
          <p className="text-slate-300 text-base sm:text-lg font-light leading-relaxed">
            Expandimos para oferecer ainda mais conforto e proximidade! Conheça nossa mais nova loja equipada com o que há de mais moderno em lavanderia 24h.
          </p>
        </div>

        {/* Grid com Vídeo de Apresentação e Diferenciais */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Coluna Esquerda: Vídeo Player em Alta Definição */}
          <div className="lg:col-span-6">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-sky-400/50 bg-slate-950 group">
              <div className="aspect-[9/16] sm:aspect-[4/5] lg:aspect-[4/5] w-full relative">
                <video
                  ref={videoRef}
                  src={videoUrl}
                  autoPlay
                  loop
                  muted={isMuted}
                  playsInline
                  className="w-full h-full object-cover"
                />

                {/* Overlay de gradiente */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/40 pointer-events-none"></div>

                {/* Badge no topo do vídeo */}
                <div className="absolute top-4 left-4 bg-[#2d3a82]/90 backdrop-blur-md px-3.5 py-1.5 rounded-full text-white text-xs font-bold flex items-center gap-2 border border-white/20 shadow-md">
                  <MapPin className="w-3.5 h-3.5 text-amber-400" />
                  <span>Unidade Barra de São Miguel • AL</span>
                </div>

                {/* Controles de Áudio e Play no rodapé do vídeo */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between z-20">
                  <button
                    onClick={togglePlay}
                    className="bg-black/70 hover:bg-black/90 backdrop-blur-md text-white p-3 rounded-full transition-all border border-white/20 shadow-lg flex items-center gap-2 text-xs font-medium cursor-pointer"
                    aria-label="Play / Pausar Vídeo Barra de São Miguel"
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
                  </button>

                  <button
                    onClick={toggleAudio}
                    className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold px-4 py-2.5 rounded-full transition-all shadow-lg flex items-center gap-2 text-xs cursor-pointer active:scale-95"
                    aria-label="Ativar ou desativar áudio"
                  >
                    {isMuted ? <VolumeX className="w-4 h-4 text-slate-950" /> : <Volume2 className="w-4 h-4 text-slate-950" />}
                    <span>{isMuted ? "Ativar Áudio do Vídeo" : "Áudio Ativo"}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Coluna Direita: Informações & Benefícios da Nova Unidade */}
          <div className="lg:col-span-6 space-y-6">
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6">
              
              <div className="space-y-2">
                <span className="text-amber-400 text-xs font-bold uppercase tracking-widest block">Estrutura Premium</span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                  Tudo o que você ama na Mar de Cheiro, agora na Barra
                </h3>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  Criada para moradores, veranistas e turistas que desejam roupas limpas, cheirosas e secas em tempo recorde, sem abrir mão de curtir as praias e passeios.
                </p>
              </div>

              {/* Lista de Recursos da Nova Unidade */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                <div className="flex items-start gap-3 bg-white/5 p-3 rounded-2xl border border-white/5">
                  <div className="p-2 bg-sky-500/20 text-sky-400 rounded-xl shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-sm text-white">Aberto 24 Horas</h4>
                    <p className="text-xs text-slate-300">Acesso livre a qualquer hora do dia ou da noite.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-white/5 p-3 rounded-2xl border border-white/5">
                  <div className="p-2 bg-amber-500/20 text-amber-400 rounded-xl shrink-0">
                    <Award className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-sm text-white">OMO & Comfort</h4>
                    <p className="text-xs text-slate-300">Produtos originais dosados automaticamente.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-white/5 p-3 rounded-2xl border border-white/5">
                  <div className="p-2 bg-emerald-500/20 text-emerald-400 rounded-xl shrink-0">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-sm text-white">Segurança & Clima</h4>
                    <p className="text-xs text-slate-300">Ar-condicionado, Wi-Fi e monitoramento 24h.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-white/5 p-3 rounded-2xl border border-white/5">
                  <div className="p-2 bg-purple-500/20 text-purple-400 rounded-xl shrink-0">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-sm text-white">Totem Digital</h4>
                    <p className="text-xs text-slate-300">Pagamento fácil e rápido via PIX e cartão.</p>
                  </div>
                </div>
              </div>

              {/* Chamada para Ação */}
              <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
                <a
                  href="https://wa.me/5521951118800"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto bg-[#25D366] hover:bg-[#20ba5a] text-white px-7 py-3.5 rounded-full font-bold text-sm shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-2 group"
                >
                  <MessageSquare className="w-4 h-4 fill-white" />
                  <span>Atendimento Barra de São Miguel</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>

                <a
                  href="#structure"
                  className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white border border-white/20 px-6 py-3.5 rounded-full font-semibold text-sm transition-all flex items-center justify-center gap-2 text-center"
                >
                  <span>Ver Fotos das Unidades</span>
                </a>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
