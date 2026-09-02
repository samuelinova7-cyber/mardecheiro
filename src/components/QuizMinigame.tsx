/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { 
  Sparkles, CheckCircle2, XCircle, Trophy, RotateCcw, 
  ArrowRight, MessageSquare, Star, Volume2, VolumeX, MapPin, Zap, Award, Play, RefreshCw
} from 'lucide-react';

interface Question {
  question: string;
  video: string;
  image: string;
  options: string[];
  answer: number;
}

const introVideoUrl = "https://res.cloudinary.com/dbuiqh0ee/video/upload/v1788309126/grok-video-d7d4bdf6-5fbe-4c63-8703-ddf462bc20f0_kxzhru.mp4";
const resultVideoUrl = "https://res.cloudinary.com/dbuiqh0ee/video/upload/v1788314527/grok-video-f25ecaf9-acb0-4509-b1b4-e30cfe2da1a0_mjpki7.mp4";

const quizData: Question[] = [
  {
    question: "Onde estão localizadas as unidades da Mar de Cheiro Lavanderia Premium?",
    video: "https://res.cloudinary.com/dbuiqh0ee/video/upload/v1788309125/grok-video-325bd520-5577-4e1a-8302-794d8c5b8ba1_un6nyo.mp4",
    image: "https://images.unsplash.com/photo-1582653291997-079a8c0417a1?q=80&w=600&auto=format&fit=crop",
    options: [
      "Penedo e Maceió",
      "Praia do Francês e Barra de São Miguel",
      "Maragogi e Piranhas",
      "São Miguel dos Milagres e Japaratinga"
    ],
    answer: 1
  },
  {
    question: "Qual o tempo médio de um ciclo completo de lavagem e secagem nas máquinas industriais?",
    video: "https://res.cloudinary.com/dbuiqh0ee/video/upload/v1788309127/grok-video-bf1563b6-331d-4286-9877-b34dde782318_yil6cf.mp4",
    image: "https://images.unsplash.com/photo-1545173168-9f1947bcee7f?q=80&w=600&auto=format&fit=crop",
    options: [
      "20 a 30 minutos",
      "Cerca de 60 a 75 minutos",
      "3 horas completas",
      "Mais de meio dia"
    ],
    answer: 1
  },
  {
    question: "Como o cliente é avisado quando o ciclo de lavagem é finalizado?",
    video: "https://res.cloudinary.com/dbuiqh0ee/video/upload/v1788309123/grok-video-ae1b5fe9-130f-4e10-ab14-6098b28d21df_rbrqx6.mp4",
    image: "https://images.unsplash.com/photo-1614680376593-902f74bc0d41?q=80&w=600&auto=format&fit=crop",
    options: [
      "Por notificação no WhatsApp",
      "Alarme sonoro alto na rua",
      "Mensagem de e-mail automatizada",
      "Não há aviso"
    ],
    answer: 0
  },
  {
    question: "Quais produtos profissionais são dosados eletronicamente de forma automática?",
    video: "https://res.cloudinary.com/dbuiqh0ee/video/upload/v1788309122/grok-video-1aa79366-6982-4e02-a48b-62be1468cdce_nwe7jp.mp4",
    image: "https://images.unsplash.com/photo-1610551874688-cc3f6b2ff8e3?q=80&w=600&auto=format&fit=crop",
    options: [
      "Sabão em pó comum e cloro",
      "Sabão líquido OMO e amaciante Comfort",
      "Vinagre e bicarbonato",
      "Qualquer sabão trazido de casa"
    ],
    answer: 1
  },
  {
    question: "Qual o valor promocional fixo oferecido nas terças-feiras (Terça Férias)?",
    video: "https://res.cloudinary.com/dbuiqh0ee/video/upload/v1788309117/grok-video-73b857ea-e6db-4227-83a0-9b356d95c5ec_lqsc5v.mp4",
    image: "https://images.unsplash.com/photo-1606761568499-8d2450b16164?q=80&w=600&auto=format&fit=crop",
    options: [
      "R$ 10,00 por ciclo",
      "R$ 15,90 por ciclo",
      "R$ 18,90 (sem desconto)",
      "R$ 25,00 o pacote"
    ],
    answer: 1
  },
  {
    question: "Além do autoatendimento 24 horas, qual outro serviço de comodidade é disponibilizado?",
    video: "https://res.cloudinary.com/dbuiqh0ee/video/upload/v1788309125/grok-video-01056e0c-1788-4e4e-9834-70dcab1de211_rwlsbc.mp4",
    image: "https://images.unsplash.com/photo-1600565193348-f74bd3846323?q=80&w=600&auto=format&fit=crop",
    options: [
      "Serviço de alfaiataria",
      "Serviço Assistido e Delivery (Leva e Traz)",
      "Hospedagem noturna",
      "Aluguel de pranchas"
    ],
    answer: 1
  },
  {
    question: "O que torna o espaço interno da lavanderia tão agradável para aguardar as roupas?",
    video: "https://res.cloudinary.com/dbuiqh0ee/video/upload/v1788309114/grok-video-15b1563b-dfc4-421d-b970-ac20c4e59d2e_wf8eyf.mp4",
    image: "https://images.unsplash.com/photo-1522771739844-6a9f6d7f14af?q=80&w=600&auto=format&fit=crop",
    options: [
      "Ambiente climatizado com Wi-Fi de alta velocidade",
      "Mesas de sinuca profissionais",
      "Piscina interna aquecida",
      "Cafeteria exclusiva gourmet"
    ],
    answer: 0
  }
];

export default function QuizMinigame() {
  const [currentStep, setCurrentStep] = useState<'start' | 'game' | 'result'>('start');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [introMuted, setIntroMuted] = useState(true);
  const [questionVideoEnded, setQuestionVideoEnded] = useState(false);
  const [resultVideoEnded, setResultVideoEnded] = useState(false);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const introVideoRef = useRef<HTMLVideoElement | null>(null);
  const questionVideoRef = useRef<HTMLVideoElement | null>(null);
  const resultVideoRef = useRef<HTMLVideoElement | null>(null);

  // Web Audio API Synthesizer with rich animated sound effects
  const playSound = (type: 'hover' | 'click' | 'start' | 'correct' | 'incorrect' | 'unmute' | 'victory') => {
    if (!soundEnabled) return;
    try {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioCtxClass();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const now = ctx.currentTime;

      if (type === 'hover') {
        // Soft animated blip on hover
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(550, now);
        osc.frequency.exponentialRampToValueAtTime(750, now + 0.05);
        gain.gain.setValueAtTime(0.04, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.05);
      } else if (type === 'click') {
        // Crisp punchy button click
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(420, now);
        osc.frequency.exponentialRampToValueAtTime(850, now + 0.08);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.08);
      } else if (type === 'unmute') {
        // Cheerful neon unmuting tone
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.12);
        osc.frequency.exponentialRampToValueAtTime(1320, now + 0.25);
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.25);
      } else if (type === 'start') {
        // Arcade power-up sequence
        const freqs = [330, 440, 550, 660, 880];
        freqs.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, now + idx * 0.06);
          gain.gain.setValueAtTime(0.12, now + idx * 0.06);
          gain.gain.exponentialRampToValueAtTime(0.01, now + (idx + 1) * 0.06);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + idx * 0.06);
          osc.stop(now + (idx + 1) * 0.06);
        });
      } else if (type === 'correct') {
        // Triumphant double chime
        const freqs = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
        freqs.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now + idx * 0.07);
          gain.gain.setValueAtTime(0.18, now + idx * 0.07);
          gain.gain.exponentialRampToValueAtTime(0.005, now + idx * 0.07 + 0.35);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + idx * 0.07);
          osc.stop(now + idx * 0.07 + 0.35);
        });
      } else if (type === 'incorrect') {
        // Retro buzz tone
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(190, now);
        osc.frequency.setValueAtTime(130, now + 0.12);
        gain.gain.setValueAtTime(0.22, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.3);
      } else if (type === 'victory') {
        // Fanfare chord progression
        const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51];
        notes.forEach((freq, i) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, now + i * 0.08);
          gain.gain.setValueAtTime(0.2, now + i * 0.08);
          gain.gain.exponentialRampToValueAtTime(0.01, now + i * 0.08 + 0.5);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + i * 0.08);
          osc.stop(now + i * 0.08 + 0.5);
        });
      }
    } catch {
      // Ignore audio initialization restrictions
    }
  };

  // Toggle audio of the first intro video
  const toggleIntroSound = () => {
    const nextState = !introMuted;
    setIntroMuted(nextState);
    if (introVideoRef.current) {
      introVideoRef.current.muted = nextState;
      if (!nextState) {
        introVideoRef.current.play().catch(() => {});
        playSound('unmute');
      } else {
        playSound('click');
      }
    }
  };

  // Start game flow
  const handleStart = () => {
    playSound('start');
    setCurrentStep('game');
    setCurrentQuestion(0);
    setScore(0);
    setSelectedOption(null);
    setAnswered(false);
    setQuestionVideoEnded(false);
  };

  // Ensure question video plays unmuted and only once when a new question arrives
  useEffect(() => {
    if (currentStep === 'game' && questionVideoRef.current) {
      setQuestionVideoEnded(false);
      questionVideoRef.current.currentTime = 0;
      questionVideoRef.current.muted = !soundEnabled ? true : false;
      questionVideoRef.current.play().catch(() => {
        // Fallback: If autoplay with sound is blocked by browser policy, play muted and let user unmute
        if (questionVideoRef.current) {
          questionVideoRef.current.muted = true;
          questionVideoRef.current.play().catch(() => {});
        }
      });
    } else if (currentStep === 'result' && resultVideoRef.current) {
      setResultVideoEnded(false);
      resultVideoRef.current.currentTime = 0;
      resultVideoRef.current.muted = !soundEnabled ? true : false;
      resultVideoRef.current.play().catch(() => {
        if (resultVideoRef.current) {
          resultVideoRef.current.muted = true;
          resultVideoRef.current.play().catch(() => {});
        }
      });
    }
  }, [currentQuestion, currentStep, soundEnabled]);

  const handleSelectOption = (index: number) => {
    if (answered) return;
    setAnswered(true);
    setSelectedOption(index);

    const q = quizData[currentQuestion];
    const isCorrect = index === q.answer;

    if (isCorrect) {
      playSound('correct');
      setScore(prev => prev + 1);
    } else {
      playSound('incorrect');
    }

    // Auto advance after 1.2s
    setTimeout(() => {
      if (currentQuestion + 1 < quizData.length) {
        setCurrentQuestion(prev => prev + 1);
        setSelectedOption(null);
        setAnswered(false);
      } else {
        playSound('victory');
        setCurrentStep('result');
      }
    }, 1200);
  };

  const q = quizData[currentQuestion];
  const progressPercent = ((currentQuestion) / quizData.length) * 100;

  return (
    <section id="quiz" className="py-20 bg-[#0a0a16] text-white relative overflow-hidden flex justify-center items-center px-4 sm:px-6">
      {/* Background radial gradients for Neon look */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-[#00f3ff]/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-[#ff007f]/10 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Main Neon Card Container */}
      <div className="w-full max-w-2xl bg-[#101023]/90 border-2 border-[#00f3ff] rounded-3xl overflow-hidden backdrop-blur-xl animate-neon-glow shadow-[0_0_30px_rgba(0,243,255,0.35)] relative z-10 transition-all duration-500">
        
        {/* Master Sound toggle button */}
        <button
          onClick={() => {
            playSound('click');
            setSoundEnabled(!soundEnabled);
          }}
          onMouseEnter={() => playSound('hover')}
          className="absolute top-4 right-4 z-30 p-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-all shadow-md active:scale-90"
          title={soundEnabled ? "Desativar efeitos sonoros e vídeos com som" : "Ativar som completo"}
          aria-label="Controle de Som do Quiz"
        >
          {soundEnabled ? <Volume2 className="w-4 h-4 text-[#00f3ff]" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
        </button>

        {/* 1. TELA DE INÍCIO */}
        {currentStep === 'start' && (
          <div className="p-6 sm:p-10 text-center space-y-6">
            <div className="inline-flex items-center gap-2 bg-[#00f3ff]/15 border border-[#00f3ff]/40 px-4 py-1.5 rounded-full text-[#00f3ff] text-xs font-bold tracking-wider uppercase mb-1">
              <Sparkles className="w-4 h-4 text-[#00f3ff]" />
              <span>Quiz Animado Mar de Cheiro</span>
            </div>

            {/* Primeiro Vídeo da Intro - Reproduzindo em loop sem som com aviso 'Aperte para sair som' */}
            <div className="relative rounded-2xl overflow-hidden border-2 border-[#00f3ff]/50 shadow-[0_0_25px_rgba(0,243,255,0.35)] h-52 sm:h-64 bg-slate-950 mx-auto max-w-lg group">
              <video
                ref={introVideoRef}
                src={introVideoUrl}
                autoPlay
                loop
                muted={introMuted}
                playsInline
                className="w-full h-full object-cover cursor-pointer"
                onClick={toggleIntroSound}
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-[#101023] via-transparent to-transparent pointer-events-none"></div>

              {/* Botão/Aviso destacado na tela: "Aperte para sair som" */}
              <div className="absolute top-3 left-3 z-20">
                <button
                  type="button"
                  onClick={toggleIntroSound}
                  onMouseEnter={() => playSound('hover')}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-full font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-lg cursor-pointer ${
                    introMuted 
                      ? 'bg-black/85 hover:bg-black text-[#00f3ff] border-2 border-[#00f3ff] shadow-[0_0_20px_rgba(0,243,255,0.7)] animate-pulse hover:scale-105'
                      : 'bg-emerald-600/90 text-white border border-emerald-400 shadow-[0_0_15px_rgba(40,167,69,0.5)]'
                  }`}
                >
                  {introMuted ? (
                    <>
                      <VolumeX className="w-4 h-4 text-[#ff007f] animate-bounce" />
                      <span className="font-extrabold text-[#00f3ff]">Aperte para sair som 🔊</span>
                    </>
                  ) : (
                    <>
                      <Volume2 className="w-4 h-4 text-emerald-300" />
                      <span>Som Ativado 🔊 (Mudo)</span>
                    </>
                  )}
                </button>
              </div>

              {/* Banner inferior */}
              <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-[#00f3ff] font-semibold bg-black/60 px-3 py-1.5 rounded-xl backdrop-blur-sm border border-white/10">
                <span className="flex items-center gap-1.5">
                  <Play className="w-3.5 h-3.5 fill-[#00f3ff]" /> Vídeo Animado Oficial
                </span>
                <span className="text-[#ffcc00] font-bold">7 Perguntas com Vídeo & Som ⚡</span>
              </div>
            </div>

            <div>
              <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-[#00f3ff] tracking-wide uppercase drop-shadow-[0_0_12px_rgba(0,243,255,0.8)]">
                MAR DE CHEIRO
              </h2>
              
              <p className="text-slate-300 text-sm sm:text-base max-w-md mx-auto leading-relaxed mt-2">
                Descubra tudo sobre a lavanderia mais tecnológica do litoral alagoano e ganhe benefícios!
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-lg mx-auto text-left pt-1">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-3 flex items-center gap-2.5">
                <Zap className="w-4 h-4 text-[#ffcc00] shrink-0" />
                <span className="text-xs text-slate-200">Vídeos com Som Único</span>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-3 flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-[#00f3ff] shrink-0" />
                <span className="text-xs text-slate-200">Francês & Barra</span>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-3 flex items-center gap-2.5">
                <Award className="w-4 h-4 text-[#ff007f] shrink-0" />
                <span className="text-xs text-slate-200">Cupom Exclusivo</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                id="start-neon-quiz-btn"
                onClick={handleStart}
                onMouseEnter={() => playSound('hover')}
                className="bg-gradient-to-r from-[#00f3ff] to-[#ff007f] hover:from-[#38bdf8] hover:to-[#f43f5e] text-white font-bold py-3.5 px-8 sm:px-10 rounded-full text-sm sm:text-base tracking-wider uppercase shadow-[0_0_20px_rgba(0,243,255,0.6)] hover:shadow-[0_0_30px_rgba(255,0,127,0.8)] transform hover:scale-105 active:scale-95 transition-all duration-300 inline-flex items-center gap-2 cursor-pointer"
              >
                <span>Iniciar Desafio ⚡</span>
              </button>
            </div>
          </div>
        )}

        {/* 2. TELA DO JOGO (VÍDEOS COM SOM E APENAS UMA VEZ) */}
        {currentStep === 'game' && q && (
          <div>
            {/* Header com gradiente neon */}
            <div className="bg-gradient-to-r from-[#00f3ff]/20 via-[#ff007f]/15 to-[#ffcc00]/20 p-4 sm:p-5 text-center border-b border-white/10 relative">
              <div className="flex items-center justify-between px-2">
                <span className="text-xs font-bold text-[#00f3ff] uppercase tracking-wider flex items-center gap-1.5">
                  <Volume2 className="w-3.5 h-3.5 text-emerald-400" /> Som Ativo (Reprodução Única)
                </span>
                <span className="text-xs font-mono font-bold text-[#ffcc00]">
                  {currentQuestion + 1} / {quizData.length}
                </span>
              </div>

              <h3 className="text-sm sm:text-base font-bold uppercase tracking-widest text-white drop-shadow-[0_0_10px_#00f3ff] mt-1">
                Questão {currentQuestion + 1} de {quizData.length}
              </h3>
              
              {/* Barra de Progresso Neon Gold */}
              <div className="w-full h-2 bg-white/10 mt-3 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[#ffcc00] transition-all duration-400 ease-out shadow-[0_0_12px_#ffcc00]"
                  style={{ width: `${progressPercent}%` }}
                ></div>
              </div>
            </div>

            {/* Corpo da Pergunta */}
            <div className="p-5 sm:p-7 space-y-4">
              {/* Vídeo da Pergunta (Reproduz com Som e Apenas Uma Vez, loop={false}) */}
              <div className="relative rounded-2xl overflow-hidden border border-[#00f3ff]/40 shadow-[0_0_20px_rgba(0,0,0,0.7)] h-48 sm:h-56 bg-slate-950">
                <video 
                  key={`question-video-${currentQuestion}`}
                  ref={questionVideoRef}
                  src={q.video}
                  autoPlay
                  loop={false}
                  muted={!soundEnabled}
                  playsInline
                  onEnded={() => setQuestionVideoEnded(true)}
                  className="w-full h-full object-cover"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none"></div>

                {/* Status da reprodução única */}
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span className="bg-black/70 text-white text-[11px] font-semibold px-2.5 py-1 rounded-full backdrop-blur-sm border border-white/20 flex items-center gap-1.5">
                    <Volume2 className="w-3 h-3 text-[#00f3ff]" />
                    {questionVideoEnded ? "Vídeo finalizado" : "Reproduzindo com áudio..."}
                  </span>
                </div>

                {/* Botão para Replay do vídeo se o usuário quiser rever */}
                {questionVideoEnded && (
                  <button
                    onClick={() => {
                      playSound('click');
                      if (questionVideoRef.current) {
                        setQuestionVideoEnded(false);
                        questionVideoRef.current.currentTime = 0;
                        questionVideoRef.current.play().catch(() => {});
                      }
                    }}
                    onMouseEnter={() => playSound('hover')}
                    className="absolute top-3 right-3 bg-black/80 hover:bg-[#00f3ff] text-white hover:text-slate-950 px-2.5 py-1 rounded-full text-xs font-bold transition-all border border-[#00f3ff]/50 flex items-center gap-1 shadow-md cursor-pointer"
                  >
                    <RefreshCw className="w-3 h-3" /> Rever Vídeo
                  </button>
                )}
              </div>

              {/* Texto da Pergunta */}
              <h4 className="text-sm sm:text-base font-semibold text-slate-100 leading-snug">
                {q.question}
              </h4>

              {/* Grid de Opções */}
              <div className="grid gap-2.5">
                {q.options.map((opt, idx) => {
                  const isSelected = selectedOption === idx;
                  const isCorrect = idx === q.answer;

                  let optionClasses = "bg-white/5 border-white/20 hover:bg-[#00f3ff]/15 hover:border-[#00f3ff] hover:shadow-[0_0_15px_rgba(0,243,255,0.4)] hover:-translate-y-0.5 text-white active:scale-[0.99]";

                  if (answered) {
                    if (isCorrect) {
                      optionClasses = "bg-emerald-600/40 border-emerald-400 text-emerald-100 shadow-[0_0_20px_rgba(40,167,69,0.8)] ring-1 ring-emerald-400 animate-pulse";
                    } else if (isSelected && !isCorrect) {
                      optionClasses = "bg-rose-600/40 border-rose-500 text-rose-100 shadow-[0_0_20px_rgba(220,53,69,0.8)] ring-1 ring-rose-500";
                    } else {
                      optionClasses = "bg-white/5 border-white/10 text-slate-400 opacity-50";
                    }
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(idx)}
                      onMouseEnter={() => !answered && playSound('hover')}
                      disabled={answered}
                      className={`w-full text-left p-3.5 sm:p-4 rounded-xl border transition-all duration-300 font-medium text-xs sm:text-sm flex items-center justify-between gap-3 cursor-pointer ${optionClasses}`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-lg bg-white/10 flex items-center justify-center text-xs font-bold text-slate-300 shrink-0">
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span className="leading-snug">{opt}</span>
                      </div>

                      {answered && isCorrect && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      )}
                      {answered && isSelected && !isCorrect && (
                        <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* 3. TELA DE RESULTADO */}
        {currentStep === 'result' && (
          <div className="p-6 sm:p-10 text-center space-y-6">
            <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-[#ffcc00] tracking-wide uppercase drop-shadow-[0_0_12px_rgba(255,204,0,0.8)]">
              FIM DO QUIZ!
            </h2>

            {/* Video de celebração / Parte 7 com som e reprodução única */}
            <div className="relative rounded-2xl overflow-hidden border-2 border-[#ffcc00]/50 shadow-[0_0_25px_rgba(255,204,0,0.35)] h-48 sm:h-56 bg-slate-950 mx-auto max-w-sm">
              <video
                key="result-video"
                ref={resultVideoRef}
                src={resultVideoUrl}
                autoPlay
                loop={false}
                muted={!soundEnabled}
                playsInline
                onEnded={() => setResultVideoEnded(true)}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#101023] via-transparent to-transparent pointer-events-none"></div>
              
              {/* Status da reprodução / Aviso de benefício */}
              <div className="absolute top-2.5 left-2.5 flex items-center gap-2">
                <span className="bg-black/75 text-[#ffcc00] text-[11px] font-bold px-2.5 py-1 rounded-full backdrop-blur-sm border border-[#ffcc00]/40 flex items-center gap-1.5 shadow-md">
                  <Sparkles className="w-3 h-3 text-[#ffcc00]" />
                  {resultVideoEnded ? "Benefício Desbloqueado! 🎉" : "Ouvindo mensagem especial... 🔊"}
                </span>
              </div>

              {/* Botão para rever vídeo do benefício */}
              {resultVideoEnded && (
                <button
                  onClick={() => {
                    playSound('click');
                    if (resultVideoRef.current) {
                      setResultVideoEnded(false);
                      resultVideoRef.current.currentTime = 0;
                      resultVideoRef.current.play().catch(() => {});
                    }
                  }}
                  onMouseEnter={() => playSound('hover')}
                  className="absolute top-2.5 right-2.5 bg-black/80 hover:bg-[#ffcc00] text-white hover:text-slate-950 px-2.5 py-1 rounded-full text-xs font-bold transition-all border border-[#ffcc00]/50 flex items-center gap-1 shadow-md cursor-pointer"
                >
                  <RefreshCw className="w-3 h-3" /> Rever Vídeo
                </button>
              )}

              <div className="absolute bottom-2 inset-x-0 text-center text-xs font-bold text-[#ffcc00] drop-shadow-md">
                🌟 Parabéns! Você desbloqueou um benefício exclusivo!
              </div>
            </div>

            <div className="text-2xl sm:text-3xl font-extrabold text-white drop-shadow-[0_0_10px_#00f3ff]">
              {score} de {quizData.length} Acertos!
            </div>

            <p className="text-slate-300 text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
              {score >= 5 
                ? "Incrível! Você conhece muito bem a Mar de Cheiro! Suas roupas merecem esse padrão de tecnologia e perfume." 
                : "Quase lá! Visite nosso site ou conheça nossas unidades para aproveitar toda essa praticidade!"}
            </p>

            {/* Cupom Desbloqueado */}
            <div className="bg-gradient-to-r from-[#00f3ff]/15 via-[#ff007f]/15 to-[#ffcc00]/15 border-2 border-dashed border-[#00f3ff] rounded-2xl p-4 max-w-md mx-auto space-y-1.5 shadow-[0_0_20px_rgba(0,243,255,0.25)]">
              <div className="flex items-center justify-center gap-2 text-[#00f3ff] font-bold text-xs uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-[#00f3ff]" />
                <span>Cupom Exclusivo Desbloqueado</span>
              </div>
              <div className="font-mono text-xl sm:text-2xl font-black text-[#ffcc00] tracking-widest bg-black/60 py-1.5 px-4 rounded-xl border border-white/20">
                MARDECHEIRO10
              </div>
              <p className="text-xs text-slate-300">10% de desconto ou brinde de perfumação no seu atendimento!</p>
            </div>

            {/* Avaliação no Google */}
            <div className="pt-1 space-y-2">
              <p className="text-xs sm:text-sm font-semibold text-[#00f3ff] flex items-center justify-center gap-1.5">
                <Star className="w-3.5 h-3.5 fill-[#ffcc00] text-[#ffcc00]" />
                <span>Avalie nossas unidades no Google:</span>
              </p>

              <div className="flex flex-col sm:flex-row gap-2.5 justify-center max-w-md mx-auto">
                <div className="bg-white/5 border border-[#00f3ff]/50 p-3.5 rounded-2xl flex-1 text-center space-y-1.5">
                  <h4 className="font-bold text-[#ffcc00] text-xs sm:text-sm">Praia do Francês</h4>
                  <a 
                    href="https://g.page/r/CZm98FRTjnpKEBM/review" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    onMouseEnter={() => playSound('hover')}
                    onClick={() => playSound('click')}
                    className="w-full bg-transparent hover:bg-[#ff007f] border border-[#ff007f] text-white py-1.5 px-3 rounded-xl text-xs font-semibold inline-block transition-all shadow-[0_0_10px_rgba(255,0,127,0.4)] active:scale-95"
                  >
                    Avaliar Unidade ⭐
                  </a>
                </div>

                <div className="bg-white/5 border border-[#00f3ff]/50 p-3.5 rounded-2xl flex-1 text-center space-y-1.5">
                  <h4 className="font-bold text-[#ffcc00] text-xs sm:text-sm">Barra de São Miguel</h4>
                  <a 
                    href="https://g.page/r/CZm98FRTjnpKEBM/review" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    onMouseEnter={() => playSound('hover')}
                    onClick={() => playSound('click')}
                    className="w-full bg-transparent hover:bg-[#ff007f] border border-[#ff007f] text-white py-1.5 px-3 rounded-xl text-xs font-semibold inline-block transition-all shadow-[0_0_10px_rgba(255,0,127,0.4)] active:scale-95"
                  >
                    Avaliar Unidade ⭐
                  </a>
                </div>
              </div>
            </div>

            {/* Botões de Ação */}
            <div className="pt-3 flex flex-col sm:flex-row gap-2.5 justify-center max-w-md mx-auto">
              <a
                href={`https://wa.me/5521951118800?text=${encodeURIComponent(`Olá! Acabei de jogar o Quiz Neon no site da Mar de Cheiro, fiz ${score}/${quizData.length} pontos e desbloqueei o cupom MARDECHEIRO10! Gostaria de agendar meu atendimento/coleta.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => playSound('hover')}
                onClick={() => playSound('click')}
                className="bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold py-3 px-5 rounded-full text-xs sm:text-sm shadow-lg transition-all flex items-center justify-center gap-2 active:scale-95 cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 fill-white" />
                <span>Resgatar no WhatsApp</span>
              </a>

              <button
                onClick={handleStart}
                onMouseEnter={() => playSound('hover')}
                className="bg-gradient-to-r from-[#00f3ff] to-[#ff007f] hover:from-[#38bdf8] hover:to-[#f43f5e] text-white font-bold py-3 px-5 rounded-full text-xs sm:text-sm uppercase tracking-wider shadow-[0_0_15px_rgba(0,243,255,0.5)] hover:shadow-[0_0_25px_rgba(255,0,127,0.7)] transition-all flex items-center justify-center gap-2 active:scale-95 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Jogar Novamente 🔄</span>
              </button>
            </div>

          </div>
        )}

      </div>
    </section>
  );
}
