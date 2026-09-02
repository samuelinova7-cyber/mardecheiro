/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { 
  Sparkles, Clock, MapPin, Phone, Instagram, Star, ShieldCheck, 
  Droplet, Wind, Sun, CheckCircle2, ChevronDown, ChevronUp, 
  Play, Pause, Volume2, VolumeX, MessageSquare, Award, Flame, Menu, X, ArrowRight,
  Package, DollarSign, Calendar, Maximize2, ExternalLink, RefreshCw, Zap, Trophy
} from 'lucide-react';
import QuizMinigame from './components/QuizMinigame';
import UnitPhotoSlider, { UnitPhoto } from './components/UnitPhotoSlider';
import NovaUnidadeBarraVideo from './components/NovaUnidadeBarraVideo';

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Hero Video States
  const [heroMuted, setHeroMuted] = useState(true);
  const [heroPlaying, setHeroPlaying] = useState(true);
  const heroVideoRef = useRef<HTMLVideoElement>(null);

  // Structure Video States
  const [structureMuted, setStructureMuted] = useState(true);
  const [structurePlaying, setStructurePlaying] = useState(true);
  const structureVideoRef = useRef<HTMLVideoElement>(null);

  // Google Reviews Video States
  const [reviewMuted, setReviewMuted] = useState(true);
  const [reviewPlaying, setReviewPlaying] = useState(true);
  const reviewVideoRef = useRef<HTMLVideoElement>(null);

  // Sustainability / About Video States
  const [aboutMuted, setAboutMuted] = useState(true);
  const [aboutPlaying, setAboutPlaying] = useState(true);
  const aboutVideoRef = useRef<HTMLVideoElement>(null);

  // Reels Videos audio state map (index -> boolean isMuted)
  const [reelsMuted, setReelsMuted] = useState<{ [key: number]: boolean }>({
    0: true,
    1: true,
    2: true,
    3: true,
    4: true,
  });
  const reelsRefs = useRef<{ [key: number]: HTMLVideoElement | null }>({});

  // Lightbox Modal for Photo Gallery
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  // Simulator State
  const [simMode, setSimMode] = useState<'padrao' | 'terca' | 'corujao' | 'ouro' | 'diamante'>('padrao');
  const [simService, setSimService] = useState<'wash' | 'dry' | 'combo'>('combo');

  // Fabric guide tab
  const [activeTab, setActiveTab] = useState<'algodao' | 'sinteticos' | 'la' | 'seda'>('algodao');

  // FAQ state
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Toggle audio for hero
  const toggleHeroAudio = () => {
    if (heroVideoRef.current) {
      const nextMute = !heroMuted;
      heroVideoRef.current.muted = nextMute;
      setHeroMuted(nextMute);
    }
  };

  // Toggle play/pause for hero
  const toggleHeroPlay = () => {
    if (heroVideoRef.current) {
      if (heroPlaying) {
        heroVideoRef.current.pause();
        setHeroPlaying(false);
      } else {
        heroVideoRef.current.play();
        setHeroPlaying(true);
      }
    }
  };

  // Toggle structure video audio
  const toggleStructureAudio = () => {
    if (structureVideoRef.current) {
      const nextMute = !structureMuted;
      structureVideoRef.current.muted = nextMute;
      setStructureMuted(nextMute);
    }
  };

  // Toggle structure video play
  const toggleStructurePlay = () => {
    if (structureVideoRef.current) {
      if (structurePlaying) {
        structureVideoRef.current.pause();
        setStructurePlaying(false);
      } else {
        structureVideoRef.current.play();
        setStructurePlaying(true);
      }
    }
  };

  // Toggle review video audio
  const toggleReviewAudio = () => {
    if (reviewVideoRef.current) {
      const nextMute = !reviewMuted;
      reviewVideoRef.current.muted = nextMute;
      setReviewMuted(nextMute);
    }
  };

  // Toggle sustainability/about video audio
  const toggleAboutAudio = () => {
    if (aboutVideoRef.current) {
      const nextMute = !aboutMuted;
      aboutVideoRef.current.muted = nextMute;
      setAboutMuted(nextMute);
    }
  };

  // Toggle sustainability/about video play
  const toggleAboutPlay = () => {
    if (aboutVideoRef.current) {
      if (aboutPlaying) {
        aboutVideoRef.current.pause();
        setAboutPlaying(false);
      } else {
        aboutVideoRef.current.play();
        setAboutPlaying(true);
      }
    }
  };

  // Toggle reel audio
  const toggleReelAudio = (idx: number) => {
    const isCurrentlyMuted = reelsMuted[idx] !== false;
    const nextState = !isCurrentlyMuted;
    if (reelsRefs.current[idx]) {
      reelsRefs.current[idx]!.muted = nextState;
    }
    setReelsMuted(prev => ({ ...prev, [idx]: nextState }));
  };

  // Calculate simulated price
  const getSimPrice = () => {
    if (simMode === 'terca') return 16.90;
    if (simMode === 'corujao') return 14.90;
    if (simMode === 'ouro') return 289.00;
    if (simMode === 'diamante') return 499.00;
    return simService === 'combo' ? 32.90 : 18.90;
  };

  const getSimTime = () => {
    if (simMode === 'ouro' || simMode === 'diamante') return 'Mensal / Pacote';
    return simService === 'combo' ? '50 Minutos (Lava + Seca)' : '30 Minutos';
  };

  // Fotos da Unidade Praia do Francês (8 Fotos)
  const praiaDoFrancesPhotos: UnitPhoto[] = [
    {
      url: "https://res.cloudinary.com/dbuiqh0ee/image/upload/v1780171328/02_y9vhxw.jpg",
      title: "Fachada & Totem Digital",
      desc: "Acesso 24 horas moderno e autoatendimento com pagamento via PIX ou cartão."
    },
    {
      url: "https://res.cloudinary.com/dbuiqh0ee/image/upload/v1780171328/06_jc2lsl.jpg",
      title: "Lavadoras Industriais de Alta Performance",
      desc: "Capacidade até 15kg com ciclos rápidos e eficientes de lavagem profunda."
    },
    {
      url: "https://res.cloudinary.com/dbuiqh0ee/image/upload/v1780171328/01_uhhi5t.jpg",
      title: "Visão Geral do Espaço Climatizado",
      desc: "Ambiente limpo, seguro, com ar-condicionado e Wi-Fi gratuito para seu conforto."
    },
    {
      url: "https://res.cloudinary.com/dbuiqh0ee/image/upload/v1780171328/03_gzxee2.jpg",
      title: "Bancada Higienizada para Dobradura",
      desc: "Área ampla e higienizada para organizar e dobrar suas roupas limpas."
    },
    {
      url: "https://res.cloudinary.com/dbuiqh0ee/image/upload/v1780171328/05_gj9x0h.jpg",
      title: "Secadoras Rápidas e Silenciosas",
      desc: "Secagem profissional com controle térmico para preservar as fibras."
    },
    {
      url: "https://res.cloudinary.com/dbuiqh0ee/image/upload/v1780171328/04_cxgo7g.jpg",
      title: "Iluminação & Sinalização Completa",
      desc: "Instruções passo a passo ilustradas e visualização clara de todos os processos."
    },
    {
      url: "https://res.cloudinary.com/dbuiqh0ee/image/upload/v1780171329/09_hgqdcj.jpg",
      title: "Equipamentos de Última Geração",
      desc: "Tecnologia industrial que poupa água, energia e cuida dos seus tecidos."
    },
    {
      url: "https://res.cloudinary.com/dbuiqh0ee/image/upload/v1780171329/07_mddnla.jpg",
      title: "Acolhimento & Segurança 24h",
      desc: "Monitoramento por câmeras e tranquilidade para qualquer horário."
    }
  ];

  // Fotos da Nova Unidade Barra de São Miguel (6 Fotos)
  const barraDeSaoMiguelPhotos: UnitPhoto[] = [
    {
      url: "https://res.cloudinary.com/dbuiqh0ee/image/upload/v1788317365/WhatsApp_Image_2026-09-01_at_11.42.42_PM_bwdcgx.jpg",
      title: "Fachada Nova Unidade Barra de São Miguel",
      desc: "Nova estrutura moderna, iluminada e aberta 24 horas por dia."
    },
    {
      url: "https://res.cloudinary.com/dbuiqh0ee/image/upload/v1788317366/WhatsApp_Image_2026-09-01_at_11.42.43_PM_zmyxyt.jpg",
      title: "Salão Interno & Máquinas Novas",
      desc: "Ambiente amplo, climatizado e equipado com maquinário industrial de ponta."
    },
    {
      url: "https://res.cloudinary.com/dbuiqh0ee/image/upload/v1788317366/WhatsApp_Image_2026-09-01_at_11.42.41_PM_2_wysku2.jpg",
      title: "Bancada Moderna de Organização",
      desc: "Bancadas higienizadas e cestos organizadores para maior praticidade."
    },
    {
      url: "https://res.cloudinary.com/dbuiqh0ee/image/upload/v1788317366/WhatsApp_Image_2026-09-01_at_11.42.43_PM_1_sltylr.jpg",
      title: "Secadoras Industriais de Alta Capacidade",
      desc: "Suas roupas secas e perfumadas com dosagem automática OMO e Comfort."
    },
    {
      url: "https://res.cloudinary.com/dbuiqh0ee/image/upload/v1788317370/WhatsApp_Image_2026-09-01_at_11.42.41_PM_rrqz9x.jpg",
      title: "Espaço Climatizado & Totem Autoatendimento",
      desc: "Conforto total com ar-condicionado e pagamento ágil no totem digital."
    },
    {
      url: "https://res.cloudinary.com/dbuiqh0ee/image/upload/v1788317371/WhatsApp_Image_2026-09-01_at_11.42.40_PM_dihzcl.jpg",
      title: "Estrutura Completa e Acolhedora",
      desc: "A melhor experiência de lavanderia self-service agora na Barra de São Miguel."
    }
  ];

  // Influencer Reels videos
  const reelsVideos = [
    {
      url: "https://res.cloudinary.com/dbuiqh0ee/video/upload/v1780171343/SnapInsta.to_AQMw0evuZYb8K26sTIjhVd9YCQtieS3s5u1tnOcI9fJN0g7t2noR-_zpyVj3ZfkXbBcB6pOjEEzYFio2gdxV-4xT_dmpkxx.mp4",
      user: "@lavanderiamardecheiroofc",
      tag: "Experiência Real"
    },
    {
      url: "https://res.cloudinary.com/dbuiqh0ee/video/upload/v1780171343/SnapInsta.to_AQOylbhWFc6pmiUnnznfHzlpc5JYyrCk2Tk2rR1w7qNHphU4zuTT2CYtYnsnm7oR_ktyetpOgA8A1unHnHvi4ecyMU8tprIdWevz5BE_ayr8kl.mp4",
      user: "@lavanderiamardecheiroofc",
      tag: "Roupas Impecáveis"
    },
    {
      url: "https://res.cloudinary.com/dbuiqh0ee/video/upload/v1780171344/SnapInsta.to_AQNP3AH3cjJaUGtu9KrV8VK1NV0OEQzjE7dqNXFEevk4qAKZnvDG0W5Xs0lSPOj2vbu0kSux6fnOoWjuRrAjxV75_cra5zz.mp4",
      user: "@lavanderiamardecheiroofc",
      tag: "Dica de Veraneio"
    },
    {
      url: "https://res.cloudinary.com/dbuiqh0ee/video/upload/v1780171345/SnapInsta.to_AQPsgNWgoW9Li88_6u1qAKddAvCZiiwHIOOUoo6Q5QK-LhP-tGi92uraeolfVp0OBKEInXFbPUsjshjyUct2NYLX_fbtcxc.mp4",
      user: "@lavanderiamardecheiroofc",
      tag: "Praticidade 24h"
    },
    {
      url: "https://res.cloudinary.com/dbuiqh0ee/video/upload/v1780171343/SnapInsta.to_AQMd9Zh_O3uiVFtRTqOKwbYTSVmpHaba3xzCAXsbrrBhpZ0-MqxHYP_Di01IOHj-NZCxeiBOeMwxY4CmW8rZSISg5rKhAyIa3EabLnY_b9zca3.mp4",
      user: "@lavanderiamardecheiroofc",
      tag: "Perfume OMO & Comfort"
    }
  ];

  const faqs = [
    {
      q: "Como funciona o autoatendimento 24h?",
      a: "Nossa lavanderia opera 24 horas por dia, 7 dias por semana. Você pode ir a qualquer momento, utilizar nossas máquinas modernas de última geração, efetuar o pagamento diretamente no totem digital via PIX ou cartão, e desfrutar do ambiente climatizado e seguro."
    },
    {
      q: "Preciso levar sabão e amaciante?",
      a: "Não! Todas as nossas lavagens já incluem a dosagem automática de produtos profissionais de alta qualidade das marcas OMO e Comfort, garantindo limpeza profunda e perfume duradouro sem nenhuma preocupação para você."
    },
    {
      q: "Quanto tempo dura o ciclo completo de lavagem e secagem?",
      a: "O ciclo de lavagem leva cerca de 30 a 35 minutos, e o ciclo de secagem mais 35 a 45 minutos. Em menos de 1 hora você sai com suas roupas limpas, secas e prontas para usar ou dobrar!"
    },
    {
      q: "Posso lavar edredons e peças pesadas?",
      a: "Com certeza! Nossas máquinas possuem grande capacidade (até 15kg), sendo perfeitas para edredons king/queen, cobertores, cortinas e peças volumosas que não cabem na máquina de casa."
    },
    {
      q: "Como funciona o Serviço Premium Assistido e a Coleta?",
      a: "Se preferir não ir até a loja, oferecemos o Serviço Premium onde buscamos suas roupas em casa (ou você deixa conosco), lavamos, secamos, dobramos com todo carinho e entregamos limpinhas e embaladas."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col font-sans text-slate-700 bg-[#f8fafc]">
      
      {/* 1. BARRA DE ANÚNCIOS ROTATIVA (Marquee Superior) */}
      <div id="top-marquee" className="bg-[#2d3a82] text-white py-2 px-4 text-xs md:text-sm font-medium overflow-hidden relative border-b border-white/10 z-50">
        <div className="flex whitespace-nowrap animate-marquee items-center gap-12">
          <span className="flex items-center gap-1.5"><Sparkles className="w-4 h-4 text-amber-400" /> Nova Unidade Barra de São Miguel Inaugurada!</span>
          <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-sky-400" /> Unidades: Praia do Francês & Barra de São Miguel</span>
          <span className="flex items-center gap-1.5"><Sparkles className="w-4 h-4 text-sky-400" /> Aberto 24h via Totem Digital</span>
          <span className="flex items-center gap-1.5"><Package className="w-4 h-4 text-sky-400" /> Coleta e Entrega Disponível</span>
          <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-sky-400" /> Lave e Seque em Apenas 1h</span>
          <span className="flex items-center gap-1.5"><Award className="w-4 h-4 text-sky-400" /> Produtos OMO e Comfort Inclusos</span>
          <span className="flex items-center gap-1.5"><Sparkles className="w-4 h-4 text-amber-400" /> Nova Unidade Barra de São Miguel Inaugurada!</span>
          <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-sky-400" /> Unidades: Praia do Francês & Barra de São Miguel</span>
          <span className="flex items-center gap-1.5"><Sparkles className="w-4 h-4 text-sky-400" /> Aberto 24h via Totem Digital</span>
          <span className="flex items-center gap-1.5"><Package className="w-4 h-4 text-sky-400" /> Coleta e Entrega Disponível</span>
        </div>
      </div>

      {/* 2. CABEÇALHO (Header Fixo com Animação de Levitação e Brilho) */}
      <header id="main-header" className="sticky top-0 bg-white/95 backdrop-blur-md shadow-sm z-40 transition-all border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <a href="#home" className="flex items-center gap-3.5 group">
            {/* Logo com Levitação e Brilho Contínuo */}
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-sky-400/40 blur-md animate-pulse"></div>
              <img 
                src="https://res.cloudinary.com/dbuiqh0ee/image/upload/v1780171336/WhatsApp_Image_2026-02-08_at_3.57.44_PM_ltkmqn.jpg" 
                alt="Mar de Cheiro Lavanderia Logo" 
                className="w-13 h-13 rounded-full object-cover shadow-lg animate-float-glow relative z-10 border-2 border-sky-400/60"
              />
            </div>
            <div>
              <span className="font-serif text-xl md:text-2xl font-bold text-[#2d3a82] block leading-tight">Mar de Cheiro</span>
              <span className="text-xs uppercase tracking-widest text-sky-600 font-semibold block">Lavanderia 24h</span>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-5 text-sm font-medium text-slate-600">
            <a href="#home" className="hover:text-[#2563eb] transition-colors">Início</a>
            <a href="#nova-unidade-barra" className="hover:text-[#2563eb] text-amber-600 font-semibold flex items-center gap-1 transition-colors">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Nova Unidade Barra
            </a>
            <a href="#structure" className="hover:text-[#2563eb] transition-colors">Nossas Unidades</a>
            <a href="#simulator" className="hover:text-[#2563eb] transition-colors">Simulador</a>
            <a href="#premium" className="hover:text-[#2563eb] transition-colors">Serviço Premium</a>
            <a href="#plans" className="hover:text-[#2563eb] transition-colors">Planos & Preços</a>
            <a href="#reels" className="hover:text-[#2563eb] transition-colors">Reels</a>
            <a href="#quiz" className="hover:text-[#2563eb] transition-colors font-bold text-[#2563eb] flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" /> Quiz
            </a>
            <a href="#contact" className="hover:text-[#2563eb] transition-colors">Contato</a>
          </nav>

          <div className="hidden sm:flex items-center gap-3">
            <a 
              href="https://wa.me/5521951118800" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-[#25D366] hover:bg-[#20ba5a] text-white px-5 py-2.5 rounded-full font-medium text-sm flex items-center gap-2 shadow-md hover:shadow-lg transition-all"
            >
              <MessageSquare className="w-4 h-4 fill-white" />
              <span>WhatsApp</span>
            </a>
          </div>

          {/* Mobile menu button */}
          <button 
            id="mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-700 hover:text-[#2d3a82]"
            aria-label="Abrir menu"
          >
            {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>

        {/* Mobile menu drawer */}
        {mobileMenuOpen && (
          <div id="mobile-drawer" className="lg:hidden bg-white border-b border-slate-200 px-6 py-4 space-y-3 shadow-xl">
            <a href="#home" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-slate-700 font-medium">Início</a>
            <a href="#nova-unidade-barra" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-amber-600 font-bold flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-500" /> Nova Unidade Barra de São Miguel
            </a>
            <a href="#structure" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-slate-700 font-medium">Nossas Unidades & Fotos</a>
            <a href="#simulator" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-slate-700 font-medium">Simulador</a>
            <a href="#premium" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-slate-700 font-medium">Serviço Premium</a>
            <a href="#plans" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-slate-700 font-medium">Planos & Preços</a>
            <a href="#about" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-slate-700 font-medium">Sobre Nós</a>
            <a href="#reels" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-slate-700 font-medium">Reels & Clientes</a>
            <a href="#quiz" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-[#2563eb] font-bold flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" /> Quiz Interativo
            </a>
            <a href="#faq" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-slate-700 font-medium">FAQ</a>
            <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-slate-700 font-medium">Contato</a>
            <div className="pt-2">
              <a 
                href="https://wa.me/5521951118800" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full bg-[#25D366] text-white py-3 rounded-xl font-medium flex items-center justify-center gap-2 shadow-md"
              >
                <MessageSquare className="w-5 h-5 fill-white" />
                <span>Falar no WhatsApp (24h)</span>
              </a>
            </div>
          </div>
        )}
      </header>

      {/* 3. SEÇÃO HERO (Apresentação Inicial com Vídeo Principal ao Lado do Texto de Boas-Vindas) */}
      <section id="home" className="relative min-h-[92vh] flex items-center bg-[#070e27] text-white py-12 lg:py-20 overflow-hidden">
        {/* Ambient background glow */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-sky-500/15 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* Left Column: Headline, Copy & CTAs */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-sky-500/20 border border-sky-400/40 backdrop-blur-md px-4 py-1.5 rounded-full text-sky-300 text-xs md:text-sm font-semibold shadow-sm">
                <Sparkles className="w-4 h-4 text-sky-400" />
                <span>Praia do Francês • Aberto 24h Todos os Dias</span>
              </div>

              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
                Suas roupas impecáveis <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-blue-300 to-white">
                  em menos de 1 hora.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed font-light mx-auto lg:mx-0">
                Autoatendimento moderno 24h, tecnologia industrial de ponta, produtos <strong>OMO e Comfort inclusos</strong> e total cuidado com cada tecido. Venha conhecer ou solicite nossa coleta!
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <a 
                  id="hero-whatsapp-btn"
                  href="https://wa.me/5521951118800" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto bg-[#25D366] hover:bg-[#20ba5a] text-white px-8 py-4 rounded-full font-semibold text-base shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-3 group"
                >
                  <MessageSquare className="w-5 h-5 fill-white" />
                  <span>Agendar Coleta / Atendimento</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
                
                <a 
                  id="hero-plans-btn"
                  href="#plans" 
                  className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white border border-white/30 backdrop-blur-md px-8 py-4 rounded-full font-semibold text-base transition-all flex items-center justify-center gap-2"
                >
                  <DollarSign className="w-4 h-4 text-sky-400" />
                  <span>Ver Planos e Preços</span>
                </a>
              </div>

              {/* Key Metrics Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 border-t border-white/10">
                <div className="bg-white/5 backdrop-blur-sm p-3.5 rounded-2xl border border-white/10 text-center lg:text-left">
                  <span className="block font-serif text-2xl font-bold text-sky-400">24 Horas</span>
                  <span className="text-xs text-slate-300">Aberto Todos os Dias</span>
                </div>
                <div className="bg-white/5 backdrop-blur-sm p-3.5 rounded-2xl border border-white/10 text-center lg:text-left">
                  <span className="block font-serif text-2xl font-bold text-sky-400">35 min</span>
                  <span className="text-xs text-slate-300">Ciclo Rápido & Eficaz</span>
                </div>
                <div className="bg-white/5 backdrop-blur-sm p-3.5 rounded-2xl border border-white/10 text-center lg:text-left">
                  <span className="block font-serif text-2xl font-bold text-sky-400">100%</span>
                  <span className="text-xs text-slate-300">OMO & Comfort</span>
                </div>
                <div className="bg-white/5 backdrop-blur-sm p-3.5 rounded-2xl border border-white/10 text-center lg:text-left">
                  <span className="block font-serif text-2xl font-bold text-amber-400 flex items-center justify-center lg:justify-start gap-1">
                    5.0 <Star className="w-4 h-4 fill-amber-400" />
                  </span>
                  <span className="text-xs text-slate-300">Google Reviews</span>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Video Showcase Card with Audio Controls */}
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-sky-400/40 bg-slate-950 group">
                <div className="aspect-[9/14] sm:aspect-[4/5] lg:aspect-[4/5] w-full relative">
                  <video 
                    ref={heroVideoRef}
                    autoPlay 
                    muted={heroMuted} 
                    loop 
                    playsInline 
                    className="w-full h-full object-cover"
                    src="https://res.cloudinary.com/dbuiqh0ee/video/upload/v1780171333/grok-video-6519da2c-cc0c-4315-89f6-1093d69f7cb9_l5jtby.mp4"
                  ></video>

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/30 pointer-events-none"></div>

                  {/* Top Badge */}
                  <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-full text-white text-xs font-semibold flex items-center gap-2 border border-white/20">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                    <span>Ao Vivo na Loja • Praia do Francês</span>
                  </div>

                  {/* Video Controls Bar */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between z-20">
                    <button 
                      onClick={toggleHeroPlay}
                      className="bg-black/70 hover:bg-black/90 backdrop-blur-md text-white p-3 rounded-full transition-all border border-white/20 shadow-lg flex items-center gap-2 text-xs font-medium"
                      aria-label="Play/Pause"
                    >
                      {heroPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
                    </button>

                    <button 
                      id="hero-audio-toggle"
                      onClick={toggleHeroAudio}
                      className="bg-sky-500/90 hover:bg-sky-400 text-slate-950 px-4 py-2.5 rounded-full font-bold transition-all shadow-lg flex items-center gap-2 text-xs"
                    >
                      {heroMuted ? <VolumeX className="w-4 h-4 text-slate-950" /> : <Volume2 className="w-4 h-4 text-slate-950" />}
                      <span>{heroMuted ? "Ativar Som" : "Som Ativado"}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. MINIGAME SIMULADOR DE LAVANDERIA */}
      <section id="simulator" className="py-20 bg-[#0f172a] text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <span className="text-sky-400 text-xs font-semibold uppercase tracking-widest block mb-2">Simulador Interativo</span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold">Calcule seu Ciclo & Economize</h2>
            <p className="text-slate-400 text-sm mt-2">Escolha o serviço ou plano ideal para a sua rotina na Mar de Cheiro.</p>
          </div>

          <div className="bg-[#1e293b] border border-slate-700/60 rounded-3xl p-6 md:p-10 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: Controls */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <label className="block text-xs uppercase tracking-wider text-slate-400 font-semibold mb-3">1. Selecione o Tipo de Serviço</label>
                <div className="grid grid-cols-3 gap-3">
                  <button 
                    id="sim-btn-wash"
                    onClick={() => { setSimService('wash'); setSimMode('padrao'); }}
                    className={`py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all border ${simService === 'wash' && simMode === 'padrao' ? 'bg-blue-600 border-blue-500 text-white shadow-lg ring-2 ring-sky-400/50' : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'}`}
                  >
                    Só Lavar
                  </button>
                  <button 
                    id="sim-btn-dry"
                    onClick={() => { setSimService('dry'); setSimMode('padrao'); }}
                    className={`py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all border ${simService === 'dry' && simMode === 'padrao' ? 'bg-blue-600 border-blue-500 text-white shadow-lg ring-2 ring-sky-400/50' : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'}`}
                  >
                    Só Secar
                  </button>
                  <button 
                    id="sim-btn-combo"
                    onClick={() => { setSimService('combo'); setSimMode('padrao'); }}
                    className={`py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all border ${simService === 'combo' && simMode === 'padrao' ? 'bg-blue-600 border-blue-500 text-white shadow-lg ring-2 ring-sky-400/50' : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'}`}
                  >
                    Lava + Seca (Combo)
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-slate-400 font-semibold mb-3">2. Planos Promocionais & Horários</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <button 
                    id="sim-mode-padrao"
                    onClick={() => setSimMode('padrao')}
                    className={`py-2.5 px-3 rounded-xl text-xs font-medium border transition-all ${simMode === 'padrao' ? 'bg-sky-500 text-slate-950 font-bold border-sky-400' : 'bg-slate-800 border-slate-700 text-slate-300'}`}
                  >
                    Padrão Diário
                  </button>
                  <button 
                    id="sim-mode-terca"
                    onClick={() => setSimMode('terca')}
                    className={`py-2.5 px-3 rounded-xl text-xs font-medium border transition-all ${simMode === 'terca' ? 'bg-amber-500 text-slate-950 font-bold border-amber-400' : 'bg-slate-800 border-slate-700 text-slate-300'}`}
                  >
                    Terça Promocional
                  </button>
                  <button 
                    id="sim-mode-corujao"
                    onClick={() => setSimMode('corujao')}
                    className={`py-2.5 px-3 rounded-xl text-xs font-medium border transition-all ${simMode === 'corujao' ? 'bg-purple-600 text-white font-bold border-purple-500' : 'bg-slate-800 border-slate-700 text-slate-300'}`}
                  >
                    Tarifa Corujão
                  </button>
                  <button 
                    id="sim-mode-ouro"
                    onClick={() => setSimMode('ouro')}
                    className={`py-2.5 px-3 rounded-xl text-xs font-medium border transition-all ${simMode === 'ouro' ? 'bg-yellow-400 text-slate-950 font-bold border-yellow-300' : 'bg-slate-800 border-slate-700 text-slate-300'}`}
                  >
                    Plano Ouro (10x)
                  </button>
                  <button 
                    id="sim-mode-diamante"
                    onClick={() => setSimMode('diamante')}
                    className={`py-2.5 px-3 rounded-xl text-xs font-medium border transition-all ${simMode === 'diamante' ? 'bg-cyan-400 text-slate-950 font-bold border-cyan-300' : 'bg-slate-800 border-slate-700 text-slate-300'}`}
                  >
                    Plano Diamante (20x)
                  </button>
                </div>
              </div>

              <div className="p-4 bg-slate-900/80 rounded-2xl border border-slate-800 text-xs text-slate-300 flex items-center gap-3">
                <Sparkles className="w-5 h-5 text-sky-400 shrink-0" />
                <span>Sabão profissional OMO e amaciante Comfort já dosados automaticamente em cada ciclo!</span>
              </div>
            </div>

            {/* Right: Digital Display & Animated Drum Graphic */}
            <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 to-[#020617] p-8 rounded-3xl border border-slate-700 text-center flex flex-col items-center justify-center relative overflow-hidden shadow-inner">
              <div className="absolute -top-12 -right-12 w-32 h-32 bg-sky-500/10 rounded-full blur-2xl"></div>

              {/* Animated Drum Graphic */}
              <div className="w-36 h-36 rounded-full border-4 border-dashed border-sky-400/60 animate-spin-slow flex items-center justify-center mb-6 relative">
                <div className="w-28 h-28 rounded-full bg-blue-950/80 flex items-center justify-center border border-sky-400/40">
                  <Droplet className="w-10 h-10 text-sky-400 animate-pulse" />
                </div>
              </div>

              <span className="text-xs uppercase tracking-widest text-slate-400 mb-1">Valor Estimado</span>
              <div className="font-serif text-4xl sm:text-5xl font-bold text-sky-400 mb-2">
                R$ {getSimPrice().toFixed(2).replace('.', ',')}
              </div>
              <span className="text-xs text-slate-300 mb-6 block font-medium">Tempo estimado: {getSimTime()}</span>

              <a 
                href="https://wa.me/5521951118800" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full bg-[#25D366] hover:bg-[#20ba5a] text-white py-3.5 rounded-full font-bold text-sm shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4 fill-white" />
                <span>Garantir Este Preço no WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* QUIZ INTERATIVO MINIGAME */}
      <QuizMinigame />

      {/* 5. SEÇÃO EXCLUSIVA: VÍDEO DA NOVA UNIDADE BARRA DE SÃO MIGUEL */}
      <NovaUnidadeBarraVideo />

      {/* 6. SEÇÃO "NOSSAS UNIDADES & ESTRUTURA" (Blocos com Fotos Alternadas de Cada Unidade e Tour em Vídeo) */}
      <section id="structure" className="py-20 bg-slate-50 border-t border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 bg-blue-100 border border-blue-200 text-[#2d3a82] px-4 py-1 rounded-full text-xs font-bold mb-3 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>GALERIA OFICIAL DAS UNIDADES</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#2d3a82] mb-4">Conheça Nossas Unidades 24h</h2>
            <p className="text-slate-600 text-base sm:text-lg">
              Estruturas completas, climatizadas e tecnológicas na <strong className="text-[#2d3a82]">Praia do Francês</strong> e na <strong className="text-[#2d3a82]">Barra de São Miguel</strong>. Veja as fotos de cada loja abaixo:
            </p>
          </div>

          {/* Grid com os 2 Blocos Independentes de Fotos Alternadas */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 mb-14">
            
            {/* Bloco 1: Unidade Praia do Francês (8 fotos alternando entre si) */}
            <UnitPhotoSlider
              id="fotos-praia-frances"
              unitName="Unidade Praia do Francês"
              badgeText="Unidade 1 • Praia do Francês"
              locationTag="Mal. Deodoro - AL"
              photos={praiaDoFrancesPhotos}
              onOpenLightbox={(url) => setSelectedPhoto(url)}
              accentColor="#2563eb"
            />

            {/* Bloco 2: Unidade Barra de São Miguel (6 fotos alternando entre si) */}
            <UnitPhotoSlider
              id="fotos-barra-miguel"
              unitName="Unidade Barra de São Miguel"
              badgeText="Unidade 2 • Nova Inauguração"
              locationTag="Barra de São Miguel - AL"
              photos={barraDeSaoMiguelPhotos}
              onOpenLightbox={(url) => setSelectedPhoto(url)}
              accentColor="#0284c7"
            />

          </div>

          {/* Tour em Vídeo do Espaço Físico & Diferenciais */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Coluna Esquerda: Vídeo Tour */}
            <div className="lg:col-span-5">
              <div className="bg-slate-900 rounded-2xl overflow-hidden shadow-lg border border-slate-300 relative aspect-[16/10] sm:aspect-[4/3] group">
                <video 
                  ref={structureVideoRef}
                  autoPlay 
                  muted={structureMuted} 
                  loop 
                  playsInline 
                  className="absolute inset-0 w-full h-full object-cover"
                  src="https://res.cloudinary.com/dbuiqh0ee/video/upload/v1780171342/SnapInsta.to_AQOWmFlbfp7qMWRdssRlVHD39pOrk6ILVwNA-UnAPo-IROkhVUAjNki3UwTNPqTStuFT5z3WeKeasoVX6qxtUklz59JANb_xFSLffGI_w5e5w8.mp4"
                ></video>
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none"></div>

                <div className="absolute top-3 left-3 bg-[#2d3a82]/90 backdrop-blur-md px-3 py-1 rounded-full text-white text-[11px] font-semibold flex items-center gap-1.5 border border-white/20">
                  <Sparkles className="w-3 h-3 text-sky-400" />
                  <span>Tour em Vídeo pelo Espaço</span>
                </div>

                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between z-20">
                  <button 
                    onClick={toggleStructurePlay}
                    className="bg-black/60 hover:bg-black/80 text-white p-2 rounded-full backdrop-blur-md transition-all border border-white/20 cursor-pointer"
                    aria-label="Play/Pause Tour"
                  >
                    {structurePlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-white" />}
                  </button>

                  <button 
                    id="structure-audio-toggle"
                    onClick={toggleStructureAudio}
                    className="bg-white/20 hover:bg-white/30 backdrop-blur-md text-white px-3 py-1.5 rounded-full text-xs font-medium transition-all border border-white/30 flex items-center gap-1.5 cursor-pointer"
                  >
                    {structureMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-sky-400" />}
                    <span>{structureMuted ? "Ouvir Tour" : "Áudio Ativo"}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Coluna Direita: Diferenciais e Conveniência */}
            <div className="lg:col-span-7 space-y-4">
              <div className="space-y-1">
                <span className="text-sky-600 text-xs font-bold uppercase tracking-wider">Padrão Mar de Cheiro</span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#2d3a82]">Conforto & Praticidade em Cada Detalhe</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Todas as nossas unidades são climatizadas, monitoradas 24h por dia e contam com bancadas para dobrar, cestos higienizados, Wi-Fi gratuito e totens de autoatendimento práticos.
                </p>
              </div>

              {/* 4 Feature Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                <div className="bg-[#f8fafc] p-3 rounded-2xl border border-slate-200 text-center">
                  <Wind className="w-5 h-5 text-blue-600 mx-auto mb-1.5" />
                  <span className="font-serif font-bold text-xs text-[#2d3a82] block">Climatizado</span>
                  <span className="text-[10px] text-slate-500">Ar 100% fresco</span>
                </div>

                <div className="bg-[#f8fafc] p-3 rounded-2xl border border-slate-200 text-center">
                  <Clock className="w-5 h-5 text-blue-600 mx-auto mb-1.5" />
                  <span className="font-serif font-bold text-xs text-[#2d3a82] block">Totem 24h</span>
                  <span className="text-[10px] text-slate-500">PIX & Cartão</span>
                </div>

                <div className="bg-[#f8fafc] p-3 rounded-2xl border border-slate-200 text-center">
                  <Award className="w-5 h-5 text-blue-600 mx-auto mb-1.5" />
                  <span className="font-serif font-bold text-xs text-[#2d3a82] block">OMO & Comfort</span>
                  <span className="text-[10px] text-slate-500">Inclusos no ciclo</span>
                </div>

                <div className="bg-[#f8fafc] p-3 rounded-2xl border border-slate-200 text-center">
                  <ShieldCheck className="w-5 h-5 text-blue-600 mx-auto mb-1.5" />
                  <span className="font-serif font-bold text-xs text-[#2d3a82] block">Segurança</span>
                  <span className="text-[10px] text-slate-500">Câmeras 24h</span>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <a
                  href="https://wa.me/5521951118800"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#25D366] hover:bg-[#20ba5a] text-white px-5 py-2.5 rounded-full font-bold text-xs flex items-center gap-2 shadow-md transition-all"
                >
                  <MessageSquare className="w-3.5 h-3.5 fill-white" />
                  <span>Tirar Dúvidas no WhatsApp</span>
                </a>
                <a
                  href="#contact"
                  className="bg-slate-100 hover:bg-slate-200 text-[#2d3a82] px-5 py-2.5 rounded-full font-semibold text-xs transition-all flex items-center gap-1.5"
                >
                  <MapPin className="w-3.5 h-3.5 text-blue-600" />
                  <span>Ver Endereços no Mapa</span>
                </a>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* 6. SEÇÃO "SERVIÇO PREMIUM ASSISTIDO" (Cards com Imagens dos Serviços) */}
      <section id="premium" className="py-20 bg-[#f1f5f9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[#2d3a82] text-xs font-semibold uppercase tracking-widest block mb-2">Comodidade Absoluta</span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#2d3a82] mb-4">Serviço Premium Assistido</h2>
            <p className="text-slate-600 text-base sm:text-lg">
              Sem tempo ou prefere relaxar na praia? Nós cuidamos de tudo por você com cuidado artesanal e produtos de elite.
            </p>
          </div>

          {/* 3 Premium Service Cards with Specified Images */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            
            {/* Card 1: Coleta & Entrega (Leva e Traz) */}
            <div className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-slate-200 flex flex-col group">
              <div 
                className="relative h-60 overflow-hidden bg-slate-100 cursor-pointer"
                onClick={() => setSelectedPhoto("https://res.cloudinary.com/dbuiqh0ee/image/upload/v1780171332/Captura_de_tela_2026-02-08_102428_rf64xc.png")}
              >
                <img 
                  src="https://res.cloudinary.com/dbuiqh0ee/image/upload/v1780171332/Captura_de_tela_2026-02-08_102428_rf64xc.png" 
                  alt="Coleta & Entrega (Leva e Traz)" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-[#2d3a82] text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
                  Delivery Express
                </div>
                <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-md text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 className="w-4 h-4" />
                </div>
              </div>
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif font-bold text-xl text-[#2d3a82] mb-3">Coleta & Entrega (Leva e Traz)</h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-4">
                    Buscamos suas roupas no seu endereço ou pousada na Praia do Francês e entregamos limpas, secas e cheirosas no prazo combinado.
                  </p>
                </div>
                <ul className="space-y-2 text-xs text-slate-600 border-t border-slate-100 pt-4">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> Agendamento rápido via WhatsApp</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> Atendimento para moradores e turistas</li>
                </ul>
              </div>
            </div>

            {/* Card 2: Roupas Dobradas & Embaladas */}
            <div className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-slate-200 flex flex-col group">
              <div 
                className="relative h-60 overflow-hidden bg-slate-100 cursor-pointer"
                onClick={() => setSelectedPhoto("https://res.cloudinary.com/dbuiqh0ee/image/upload/v1780171330/Captura_de_tela_2026-04-09_001013_ep79t9.png")}
              >
                <img 
                  src="https://res.cloudinary.com/dbuiqh0ee/image/upload/v1780171330/Captura_de_tela_2026-04-09_001013_ep79t9.png" 
                  alt="Roupas Dobradas & Embaladas" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-sky-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow">
                  Pronto para o Armário
                </div>
                <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-md text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 className="w-4 h-4" />
                </div>
              </div>
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif font-bold text-xl text-[#2d3a82] mb-3">Roupas Dobradas & Embaladas</h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-4">
                    Acabamento impecável com dobras simétricas e embalagens protetoras higienizadas para você apenas guardar direto na gaveta.
                  </p>
                </div>
                <ul className="space-y-2 text-xs text-slate-600 border-t border-slate-100 pt-4">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> Dobras perfeitas sem amassados</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> Proteção contra poeira e umidade</li>
                </ul>
              </div>
            </div>

            {/* Card 3: Produtos OMO & Comfort Concentrados */}
            <div className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-slate-200 flex flex-col group">
              <div 
                className="relative h-60 overflow-hidden bg-slate-100 cursor-pointer"
                onClick={() => setSelectedPhoto("https://res.cloudinary.com/dbuiqh0ee/image/upload/v1780171330/Captura_de_tela_2026-02-08_102323_psdh93.png")}
              >
                <img 
                  src="https://res.cloudinary.com/dbuiqh0ee/image/upload/v1780171330/Captura_de_tela_2026-02-08_102323_psdh93.png" 
                  alt="Produtos OMO & Comfort" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-amber-500 text-slate-950 text-xs font-bold px-3 py-1 rounded-full shadow">
                  Qualidade Máxima
                </div>
                <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-md text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 className="w-4 h-4" />
                </div>
              </div>
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif font-bold text-xl text-[#2d3a82] mb-3">Produtos OMO & Comfort</h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-4">
                    Dosagem automática profissional com sabão líquido OMO e amaciante Comfort Concentrado para proteger as fibras e prolongar o perfume.
                  </p>
                </div>
                <ul className="space-y-2 text-xs text-slate-600 border-t border-slate-100 pt-4">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> Fórmula anti-manchas e preserva as cores</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> Toque suave e fragrância duradoura</li>
                </ul>
              </div>
            </div>

          </div>

          {/* Premium Call to Action Banner */}
          <div className="bg-gradient-to-r from-[#2d3a82] to-[#1e293b] rounded-3xl p-8 sm:p-12 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="max-w-2xl text-center sm:text-left">
              <span className="text-sky-300 text-xs font-bold uppercase tracking-wider block mb-1">Quer contratar agora?</span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold mb-2">Deixe a sua lavanderia com especialistas</h3>
              <p className="text-sm text-slate-300">Fale com a nossa atendente no WhatsApp e agende seu serviço assistido ou coleta hoje mesmo.</p>
            </div>
            <a 
              href="https://wa.me/5521951118800" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-[#25D366] hover:bg-[#20ba5a] text-white px-8 py-4 rounded-full font-bold text-base shadow-lg transition-all flex items-center gap-2 shrink-0"
            >
              <MessageSquare className="w-5 h-5 fill-white" />
              <span>Chamar Atendente no WhatsApp</span>
            </a>
          </div>

        </div>
      </section>

      {/* 7. SEÇÃO "GOOGLE REVIEWS" (Depoimento em Vídeo & Avaliação 5.0) */}
      <section id="reviews" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Depoimento em Vídeo */}
            <div className="lg:col-span-5 rounded-3xl overflow-hidden shadow-2xl border border-slate-200 relative bg-slate-900 group">
              <div className="relative aspect-[9/14] sm:aspect-[4/5]">
                <video 
                  ref={reviewVideoRef}
                  autoPlay 
                  muted={reviewMuted} 
                  loop 
                  playsInline 
                  className="w-full h-full object-cover"
                  src="https://res.cloudinary.com/dbuiqh0ee/video/upload/v1780171333/grok-video-6519da2c-cc0c-4315-89f6-1093d69f7cb9_1_ydqkjj.mp4"
                ></video>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-between p-6 pointer-events-none">
                  <div className="inline-flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-white text-xs font-medium w-max border border-white/20">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>Depoimento Real de Cliente</span>
                  </div>
                  <div className="text-white">
                    <div className="flex items-center gap-1 text-amber-400 mb-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400" />
                      ))}
                    </div>
                    <p className="font-serif font-bold text-lg">“Prático, cheiroso e salva as férias!”</p>
                  </div>
                </div>

                {/* Audio controls */}
                <div className="absolute bottom-4 right-4 z-20">
                  <button 
                    id="review-audio-toggle"
                    onClick={toggleReviewAudio}
                    className="bg-black/70 hover:bg-black/90 backdrop-blur-md text-white px-3.5 py-2 rounded-full text-xs font-medium transition-all border border-white/20 flex items-center gap-1.5 shadow"
                  >
                    {reviewMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-sky-400" />}
                    <span>{reviewMuted ? "Ouvir Depoimento" : "Áudio Ativo"}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Right Column: Google 5-Star Call to Action */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 bg-amber-500/10 text-amber-600 px-3.5 py-1.5 rounded-full text-xs font-bold border border-amber-500/20">
                <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                <span>Avaliação Nota 5.0 no Google Reviews</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#2d3a82] leading-tight">
                Sua satisfação e opinião movem nosso cuidado
              </h2>

              <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
                Já utilizou nossas lavadoras industriais ou solicitou a coleta na Praia do Francês? Sua experiência é a nossa maior inspiração. Avalie-nos no Google e ajude mais pessoas a descobrirem essa praticidade!
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="bg-[#f8fafc] p-4 rounded-2xl border border-slate-200">
                  <div className="flex items-center gap-1 text-amber-400 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <span className="font-serif font-bold text-sm text-[#2d3a82] block">100% Recomendada</span>
                  <span className="text-xs text-slate-500">Avaliações verificadas de clientes locais e turistas.</span>
                </div>

                <div className="bg-[#f8fafc] p-4 rounded-2xl border border-slate-200">
                  <span className="font-serif font-bold text-xl text-[#2d3a82] block mb-1">Atendimento 24h</span>
                  <span className="text-xs text-slate-500">Sempre pronta quando você precisar.</span>
                </div>
              </div>

              <div className="pt-4">
                <a 
                  id="google-review-btn"
                  href="https://g.page/r/CZm98FRTjnpKEBM/review" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-[#2d3a82] hover:bg-[#20295d] text-white px-8 py-4 rounded-full font-bold text-base shadow-lg hover:shadow-xl transition-all group"
                >
                  <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                  <span>Avaliar no Google Agora</span>
                  <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 8. NOTIFICAÇÃO NO WHATSAPP */}
      <section className="py-12 bg-sky-50 border-y border-sky-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex p-3.5 bg-[#25D366] text-white rounded-2xl mb-4 shadow-md">
            <MessageSquare className="w-8 h-8 fill-white" />
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#2d3a82] mb-3">Avisos Automáticos no seu WhatsApp</h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            Esqueceu de marcar o relógio? Fique tranquilo! Nossas máquinas inteligentes enviam uma notificação direta no seu WhatsApp avisando no segundo exato em que o ciclo de lavagem ou secagem estiver pronto.
          </p>
        </div>
      </section>

      {/* 9. NOSSOS PLANOS E PREÇOS */}
      <section id="plans" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[#2d3a82] text-xs font-semibold uppercase tracking-widest block mb-2">Transparência Total</span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#2d3a82] mb-4">Nossos Planos e Preços</h2>
            <p className="text-slate-600 text-base sm:text-lg">
              Escolha a modalidade que melhor se adapta à sua rotina e economize tempo e dinheiro.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1: Lavagem Avulsa */}
            <div className="bg-[#f8fafc] border border-slate-200 rounded-3xl p-8 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <span className="text-xs uppercase tracking-widest text-slate-500 font-semibold block mb-2">Avulso Diário</span>
                <h3 className="font-serif text-2xl font-bold text-[#2d3a82] mb-4">Lavagem ou Secagem</h3>
                <div className="text-3xl font-bold text-[#2563eb] mb-6">
                  R$ 18,90 <span className="text-xs text-slate-500 font-normal">/ ciclo</span>
                </div>
                <ul className="space-y-3 text-sm text-slate-600 mb-8">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> Máquina industrial de até 15kg</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> Sabão e amaciante OMO/Comfort inclusos</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> Ciclo rápido de 30 a 35 minutos</li>
                </ul>
              </div>
              <a 
                href="https://wa.me/5521951118800" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full bg-[#2d3a82] hover:bg-[#20295d] text-white py-3 rounded-full font-semibold text-sm text-center transition-all shadow-sm block"
              >
                Escolher Avulso
              </a>
            </div>

            {/* Card 2: Terça Promocional */}
            <div className="bg-gradient-to-b from-[#2d3a82] to-[#1e293b] text-white border-2 border-sky-400 rounded-3xl p-8 shadow-xl relative flex flex-col justify-between transform md:-translate-y-2">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-sky-400 text-slate-950 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow">
                Mais Popular • Terças
              </div>
              <div>
                <span className="text-xs uppercase tracking-widest text-sky-300 font-semibold block mb-2">Toda Terça-Feira</span>
                <h3 className="font-serif text-2xl font-bold mb-4">Tarifa Promocional</h3>
                <div className="text-4xl font-bold text-sky-400 mb-6">
                  R$ 16,90 <span className="text-xs text-slate-300 font-normal">/ ciclo</span>
                </div>
                <ul className="space-y-3 text-sm text-slate-200 mb-8">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0" /> Desconto especial toda terça-feira</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0" /> Mesma qualidade impecável e produtos</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0" /> Economia máxima para suas peças</li>
                </ul>
              </div>
              <a 
                href="https://wa.me/5521951118800" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full bg-[#25D366] hover:bg-[#20ba5a] text-white py-3.5 rounded-full font-bold text-sm text-center transition-all shadow-md flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4 fill-white" />
                <span>Aproveitar na Terça</span>
              </a>
            </div>

            {/* Card 3: Plano Ouro 10 Ciclos */}
            <div className="bg-[#f8fafc] border border-slate-200 rounded-3xl p-8 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
              <div>
                <span className="text-xs uppercase tracking-widest text-amber-600 font-semibold block mb-2">Assinatura Mensal</span>
                <h3 className="font-serif text-2xl font-bold text-[#2d3a82] mb-4">Plano Ouro (10 Ciclos)</h3>
                <div className="text-3xl font-bold text-[#2563eb] mb-6">
                  R$ 289,00 <span className="text-xs text-slate-500 font-normal">/ mês</span>
                </div>
                <ul className="space-y-3 text-sm text-slate-600 mb-8">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> 10 ciclos completos de lavagem/secagem</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> Economia expressiva no custo por ciclo</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> Prioridade e facilidade de recarga</li>
                </ul>
              </div>
              <a 
                href="https://wa.me/5521951118800" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full bg-[#2d3a82] hover:bg-[#20295d] text-white py-3 rounded-full font-semibold text-sm text-center transition-all shadow-sm block"
              >
                Assinar Plano Ouro
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 10. AGENDE SUA COLETA (Banner com Imagem de Fundo de Conversão) */}
      <section 
        id="delivery" 
        className="py-20 text-white relative overflow-hidden bg-cover bg-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?auto=format&fit=crop&q=80&w=1600')`
        }}
      >
        {/* Navy blue dark overlay */}
        <div className="absolute inset-0 bg-[#0c1947]/90 backdrop-blur-xs"></div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
          <div className="max-w-2xl space-y-3">
            <span className="text-sky-400 text-xs font-bold uppercase tracking-widest block">Delivery Mar de Cheiro</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold">Precisa que busquemos suas roupas?</h2>
            <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
              Agende agora mesmo a coleta e entrega em domicílio na Praia do Francês e região. Praticidade absoluta para que você aproveite o seu tempo livre!
            </p>
          </div>
          <a 
            href="https://wa.me/5521951118800" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-[#25D366] hover:bg-[#20ba5a] text-white px-8 py-4 rounded-full font-bold text-base shadow-2xl transition-all shrink-0 flex items-center gap-3 group"
          >
            <Calendar className="w-5 h-5" />
            <span>Agendar Coleta no WhatsApp</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </section>

      {/* 11. SOBRE NÓS (Nossa História & Sustentabilidade com Imagem Dedicada) */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 space-y-6">
              <span className="text-[#2d3a82] text-xs font-semibold uppercase tracking-widest block">Nossa Essência</span>
              <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#2d3a82] leading-tight">
                Cuidado com as roupas, respeito com o meio ambiente.
              </h2>
              <p className="text-slate-600 text-base leading-relaxed">
                A <strong>Mar de Cheiro Lavanderia 24h</strong> nasceu com o propósito de transformar a experiência de lavar roupas na Praia do Francês. Unimos tecnologia avançada de autoatendimento, máquinas ecológicas de alta eficiência e produtos premium para garantir roupas limpas, perfumadas e cuidadas com carinho.
              </p>
              <p className="text-slate-600 text-base leading-relaxed">
                Nossos ciclos otimizados utilizam água filtrada e dosagem precisa de insumos, reduzindo o desperdício em até 40% em relação às lavagens domésticas convencionais.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="bg-[#f8fafc] p-4 rounded-2xl border border-slate-200">
                  <span className="font-serif font-bold text-xl text-[#2d3a82] block mb-1">Ecológica</span>
                  <span className="text-xs text-slate-500">Baixo consumo hídrico e energético por ciclo.</span>
                </div>
                <div className="bg-[#f8fafc] p-4 rounded-2xl border border-slate-200">
                  <span className="font-serif font-bold text-xl text-[#2d3a82] block mb-1">24 Horas</span>
                  <span className="text-xs text-slate-500">Aberto todos os dias no seu próprio horário.</span>
                </div>
              </div>
            </div>

            {/* Right: Vídeo Oficial de Sustentabilidade & Economia de Recursos */}
            <div className="lg:col-span-6">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200 bg-slate-950 group">
                <div className="relative aspect-[16/10] sm:aspect-[4/3] w-full">
                  <video 
                    ref={aboutVideoRef}
                    autoPlay 
                    muted={aboutMuted} 
                    loop 
                    playsInline 
                    className="w-full h-full object-cover"
                    src="https://res.cloudinary.com/dbuiqh0ee/video/upload/v1780171343/Motion_slow_logo_1080p_202602081650_opf3n3.mp4"
                  ></video>
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent pointer-events-none"></div>

                  <div className="absolute top-4 left-4 bg-[#2d3a82]/90 backdrop-blur-md px-3.5 py-1.5 rounded-full text-white text-xs font-semibold flex items-center gap-2 border border-white/20 shadow">
                    <Sparkles className="w-3.5 h-3.5 text-sky-400" />
                    <span>Tecnologia Sustentável</span>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between z-20">
                    <div className="text-white max-w-xs sm:max-w-sm">
                      <span className="text-sky-300 text-[11px] font-bold uppercase tracking-wider block">Eficiência Hídrica</span>
                      <h3 className="font-serif text-lg sm:text-xl font-bold leading-snug">Água tratada e economia de recursos</h3>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button 
                        onClick={toggleAboutPlay}
                        className="bg-black/60 hover:bg-black/80 text-white p-2.5 rounded-full backdrop-blur-md transition-all border border-white/20 cursor-pointer shadow"
                        aria-label="Play/Pause Vídeo Sustentabilidade"
                      >
                        {aboutPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-white" />}
                      </button>

                      <button 
                        id="about-audio-toggle"
                        onClick={toggleAboutAudio}
                        className="bg-white/20 hover:bg-white/30 backdrop-blur-md text-white px-3 py-2 rounded-full text-xs font-medium transition-all border border-white/30 flex items-center gap-1.5 cursor-pointer shadow"
                        aria-label="Ativar som do vídeo"
                      >
                        {aboutMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-sky-400" />}
                        <span className="hidden sm:inline">{aboutMuted ? "Som" : "Ativo"}</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 12. CARROSSEL DE VÍDEOS DE CLIENTES & INFLUENCIADORES (Formato Reels/Stories - Auto Scroll Lateral) */}
      <section id="reels" className="py-20 bg-[#f8fafc] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-[#2d3a82] text-xs font-semibold uppercase tracking-widest block mb-2">Reels & Influenciadores</span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#2d3a82] mb-4">Siga-nos no Instagram</h2>
            <p className="text-slate-600 text-base sm:text-lg mb-6">
              Veja a rotina e os depoimentos de quem economiza tempo com a praticidade da Mar de Cheiro. Passe o mouse para pausar ou clique para ouvir o áudio.
            </p>
            <div>
              <a 
                id="follow-instagram-btn"
                href="https://www.instagram.com/lavanderiamardecheiroofc" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-gradient-to-r from-[#f09433] via-[#e6683c] via-[#dc2743] via-[#cc2366] to-[#bc1888] hover:opacity-95 text-white font-bold px-8 py-4 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                <Instagram className="w-5 h-5 text-white" />
                <span>Seguir no Instagram @lavanderiamardecheiroofc</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Horizontal Marquee Track for Reels (Side-by-side Auto Moving) */}
        <div className="relative w-full overflow-hidden py-4">
          {/* Edge gradient masks */}
          <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-20 bg-gradient-to-r from-[#f8fafc] to-transparent z-20 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-20 bg-gradient-to-l from-[#f8fafc] to-transparent z-20 pointer-events-none"></div>

          <div className="flex animate-marquee-slow gap-6 px-4">
            {[...reelsVideos, ...reelsVideos].map((reel, idx) => (
              <div 
                key={idx} 
                className="w-64 sm:w-72 aspect-[9/16] shrink-0 rounded-3xl overflow-hidden shadow-lg border border-slate-200 bg-slate-950 relative group flex flex-col justify-between"
              >
                <video 
                  ref={el => reelsRefs.current[idx] = el}
                  autoPlay 
                  muted={reelsMuted[idx] !== false} 
                  loop 
                  playsInline 
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  src={reel.url}
                ></video>

                {/* Top overlay */}
                <div className="relative z-10 p-3.5 flex items-center justify-between">
                  <span className="bg-black/60 backdrop-blur-md text-white text-[11px] font-semibold px-2.5 py-1 rounded-full border border-white/20">
                    {reel.tag}
                  </span>
                  
                  {/* Individual Audio Toggle */}
                  <button 
                    id={`reel-audio-btn-${idx}`}
                    onClick={() => toggleReelAudio(idx)}
                    className="p-2 rounded-full bg-black/70 hover:bg-black/90 text-white backdrop-blur-md transition-all border border-white/30"
                    aria-label={`Alternar som do Reels ${idx + 1}`}
                  >
                    {reelsMuted[idx] === false ? <Volume2 className="w-3.5 h-3.5 text-sky-400" /> : <VolumeX className="w-3.5 h-3.5" />}
                  </button>
                </div>

                {/* Bottom Overlay Info */}
                <div className="relative z-10 p-3.5 bg-gradient-to-t from-black/90 via-black/40 to-transparent">
                  <a 
                    href="https://www.instagram.com/lavanderiamardecheiroofc" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-white text-xs font-semibold flex items-center gap-1.5 hover:text-sky-300 transition-colors"
                  >
                    <Instagram className="w-3.5 h-3.5 text-pink-400" />
                    <span>{reel.user}</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 13. CUIDADO PARA CADA TECIDO (Guia Interativo) */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[#2d3a82] text-xs font-semibold uppercase tracking-widest block mb-2">Guia Técnico</span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#2d3a82] mb-4">Cuidado para Cada Tecido</h2>
            <p className="text-slate-600 text-base">Dicas essenciais para preservar suas roupas favoritas durante a lavagem e secagem.</p>
          </div>

          {/* Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {[
              { id: 'algodao', label: 'Algodão & Linho' },
              { id: 'sinteticos', label: 'Sintéticos & Poliéster' },
              { id: 'la', label: 'Lã & Tricô' },
              { id: 'seda', label: 'Seda & Delicados' }
            ].map((tab) => (
              <button 
                key={tab.id}
                id={`tab-${tab.id}`}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-6 py-3 rounded-full text-sm font-semibold transition-all shadow-sm ${activeTab === tab.id ? 'bg-[#2d3a82] text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="bg-[#f8fafc] border border-slate-200 rounded-3xl p-8 sm:p-12 shadow-sm">
            {activeTab === 'algodao' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="font-serif text-2xl font-bold text-[#2d3a82] mb-3">Algodão e Linho</h3>
                  <p className="text-slate-600 text-base leading-relaxed mb-4">
                    Peças de algodão suportam ciclos padrão com excelente desempenho. Nossas máquinas dosam a quantidade exata de água e insumos para remover manchas sem desgastar as fibras naturais.
                  </p>
                  <ul className="space-y-2 text-sm text-slate-700">
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Suporta ciclo normal de lavagem</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Secagem em temperatura média</li>
                  </ul>
                </div>
                <div className="bg-blue-100/50 p-6 rounded-2xl border border-blue-200 text-center">
                  <Droplet className="w-12 h-12 text-[#2d3a82] mx-auto mb-3" />
                  <span className="font-serif font-bold text-lg text-[#2d3a82] block">Limpeza Profunda</span>
                  <span className="text-xs text-slate-600">O amaciante Comfort garante toque macio e perfume duradouro.</span>
                </div>
              </div>
            )}

            {activeTab === 'sinteticos' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="font-serif text-2xl font-bold text-[#2d3a82] mb-3">Sintéticos e Poliéster</h3>
                  <p className="text-slate-600 text-base leading-relaxed mb-4">
                    Tecidos sintéticos secam muito rapidamente e exigem temperaturas moderadas na secadora para evitar vincos ou alteração da elasticidade.
                  </p>
                  <ul className="space-y-2 text-sm text-slate-700">
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Ciclo delicado ou sintético</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Secagem rápida em temperatura baixa</li>
                  </ul>
                </div>
                <div className="bg-blue-100/50 p-6 rounded-2xl border border-blue-200 text-center">
                  <Wind className="w-12 h-12 text-[#2d3a82] mx-auto mb-3" />
                  <span className="font-serif font-bold text-lg text-[#2d3a82] block">Secagem Inteligente</span>
                  <span className="text-xs text-slate-600">Menos eletricidade estática e roupas prontas para uso imediato.</span>
                </div>
              </div>
            )}

            {activeTab === 'la' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="font-serif text-2xl font-bold text-[#2d3a82] mb-3">Lã e Tricô</h3>
                  <p className="text-slate-600 text-base leading-relaxed mb-4">
                    Peças de lã requerem atenção especial para manter a maciez e evitar encolhimento. Recomendamos ciclos curtos e secagem estendida em temperatura branda.
                  </p>
                  <ul className="space-y-2 text-sm text-slate-700">
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Ciclos com rotação balanceada</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Cuidado com calor excessivo</li>
                  </ul>
                </div>
                <div className="bg-blue-100/50 p-6 rounded-2xl border border-blue-200 text-center">
                  <Sun className="w-12 h-12 text-[#2d3a82] mx-auto mb-3" />
                  <span className="font-serif font-bold text-lg text-[#2d3a82] block">Proteção de Fibras</span>
                  <span className="text-xs text-slate-600">Preserva o volume e a maciez original das peças de inverno.</span>
                </div>
              </div>
            )}

            {activeTab === 'seda' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="font-serif text-2xl font-bold text-[#2d3a82] mb-3">Seda e Peças Delicadas</h3>
                  <p className="text-slate-600 text-base leading-relaxed mb-4">
                    Para roupas íntimas, sedas e bordados, sugerimos o uso de sacos protetores de lavagem e secagem natural ou em temperatura suave.
                  </p>
                  <ul className="space-y-2 text-sm text-slate-700">
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Utilizar saco protetor para peças finas</li>
                    <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Ciclo extra suave</li>
                  </ul>
                </div>
                <div className="bg-blue-100/50 p-6 rounded-2xl border border-blue-200 text-center">
                  <Sparkles className="w-12 h-12 text-[#2d3a82] mx-auto mb-3" />
                  <span className="font-serif font-bold text-lg text-[#2d3a82] block">Brilho e Suavidade</span>
                  <span className="text-xs text-slate-600">Preservação das texturas mais finas com amaciante premium.</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 14. 4 DIFERENCIAIS DA MAR DE CHEIRO */}
      <section id="differentials" className="py-20 bg-[#0f172a] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-sky-400 text-xs font-semibold uppercase tracking-widest block mb-2">Por que nos escolher</span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold">Diferenciais Mar de Cheiro</h2>
            <p className="text-slate-400 text-base">Uma nova experiência em lavagem de roupas na Praia do Francês.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-slate-800/80 border border-slate-700 p-8 rounded-3xl">
              <Clock className="w-10 h-10 text-sky-400 mb-4" />
              <h3 className="font-serif font-bold text-xl mb-2">Aberto 24 Horas</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Liberdade para lavar suas roupas a qualquer hora, com total segurança e conveniência.</p>
            </div>

            <div className="bg-slate-800/80 border border-slate-700 p-8 rounded-3xl">
              <Award className="w-10 h-10 text-sky-400 mb-4" />
              <h3 className="font-serif font-bold text-xl mb-2">Produtos Inclusos</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Dosagem automática dos melhores produtos do mercado: OMO e Comfort Profissional.</p>
            </div>

            <div className="bg-slate-800/80 border border-slate-700 p-8 rounded-3xl">
              <Zap className="w-10 h-10 text-sky-400 mb-4" />
              <h3 className="font-serif font-bold text-xl mb-2">Rapidez & Agilidade</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Lave e seque suas roupas em menos de 1 hora com máquinas industriais de alta potência.</p>
            </div>

            <div className="bg-slate-800/80 border border-slate-700 p-8 rounded-3xl">
              <Package className="w-10 h-10 text-sky-400 mb-4" />
              <h3 className="font-serif font-bold text-xl mb-2">Leva e Traz</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Serviço de coleta e entrega assistida para você aproveitar seu tempo na praia.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ ACCORDION (Perguntas Frequentes) */}
      <section id="faq" className="py-20 bg-[#f8fafc]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-[#2d3a82] text-xs font-semibold uppercase tracking-widest block mb-2">Tire suas Dúvidas</span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#2d3a82] mb-4">Perguntas Frequentes</h2>
            <p className="text-slate-600 text-base">Tudo o que você precisa saber sobre o funcionamento da Mar de Cheiro.</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div 
                key={idx} 
                className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm transition-all"
              >
                <button 
                  id={`faq-btn-${idx}`}
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full p-6 text-left font-serif font-bold text-lg text-[#2d3a82] flex items-center justify-between gap-4"
                >
                  <span>{faq.q}</span>
                  {openFaq === idx ? <ChevronUp className="w-5 h-5 text-sky-600 shrink-0" /> : <ChevronDown className="w-5 h-5 text-slate-400 shrink-0" />}
                </button>
                {openFaq === idx && (
                  <div className="px-6 pb-6 text-slate-600 text-sm sm:text-base leading-relaxed border-t border-slate-100 pt-4">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 17. LOCALIZAÇÃO E CONTATO (Com Informações de Ambas as Unidades) */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-5 space-y-6">
              <span className="text-[#2d3a82] text-xs font-semibold uppercase tracking-widest block">Onde Estamos</span>
              <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#2d3a82]">Nossas 2 Unidades 24h</h2>
              <p className="text-slate-600 text-base leading-relaxed">
                Estamos presentes nos dois principais destinos do litoral sul alagoano, sempre com fácil acesso, estacionamento e total segurança 24 horas por dia.
              </p>

              <div className="space-y-4 pt-2">
                
                {/* Unidade 1 */}
                <div className="flex items-start gap-4 p-3.5 bg-blue-50/70 rounded-2xl border border-blue-100">
                  <div className="p-2.5 bg-blue-600 text-white rounded-xl shrink-0 mt-0.5 shadow-sm">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-blue-700 bg-blue-100/80 px-2 py-0.5 rounded-full inline-block mb-1">Unidade 1</span>
                    <h3 className="font-serif font-bold text-base text-[#2d3a82]">Praia do Francês</h3>
                    <p className="text-sm text-slate-600">Praia do Francês, Mal. Deodoro - AL • Aberto 24 Horas</p>
                  </div>
                </div>

                {/* Unidade 2 */}
                <div className="flex items-start gap-4 p-3.5 bg-amber-50/70 rounded-2xl border border-amber-100">
                  <div className="p-2.5 bg-amber-600 text-white rounded-xl shrink-0 mt-0.5 shadow-sm">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800 bg-amber-200/80 px-2 py-0.5 rounded-full inline-block mb-1">Unidade 2 • Nova Inauguração</span>
                    <h3 className="font-serif font-bold text-base text-[#2d3a82]">Barra de São Miguel</h3>
                    <p className="text-sm text-slate-600">Barra de São Miguel - AL • Aberto 24 Horas</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-blue-100 text-[#2d3a82] rounded-xl shrink-0">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-base text-[#2d3a82]">Horário de Funcionamento</h3>
                    <p className="text-sm text-slate-600">Aberto 24 Horas • Todos os dias da semana (inclusive feriados)</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-blue-100 text-[#2d3a82] rounded-xl shrink-0">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-base text-[#2d3a82]">WhatsApp & Atendimento Unificado</h3>
                    <p className="text-sm text-slate-600">(21) 95111-8800</p>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <a 
                  href="https://wa.me/5521951118800" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto bg-[#25D366] hover:bg-[#20ba5a] text-white px-8 py-4 rounded-full font-bold text-base shadow-lg transition-all inline-flex items-center justify-center gap-3"
                >
                  <MessageSquare className="w-5 h-5 fill-white" />
                  <span>Falar com Atendente no WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Embedded Google Maps Frame */}
            <div className="lg:col-span-7 rounded-3xl overflow-hidden shadow-2xl border border-slate-200 h-[450px]">
              <iframe 
                title="Localização Mar de Cheiro Lavanderia"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3931.2384705574274!2d-35.8398418!3d-9.7226522!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x701463162779a8d%3A0xa64e43fa920257e!2sPraia%20do%20Franc%C3%AAs!5e0!3m2!1spt-BR!2sbr!4v1700000000000!5m2!1spt-BR!2sbr" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>

          </div>
        </div>
      </section>

      {/* 18. RODAPÉ (Footer com Identidade da Marca e Logotipo Oficial) */}
      <footer id="main-footer" className="bg-[#0f172a] text-white py-16 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            
            {/* Brand column with logo */}
            <div className="md:col-span-2 space-y-4">
              <div className="flex items-center gap-3.5">
                <img 
                  src="https://res.cloudinary.com/dbuiqh0ee/image/upload/v1780171336/WhatsApp_Image_2026-02-08_at_3.57.44_PM_ltkmqn.jpg" 
                  alt="Mar de Cheiro Lavanderia Logo Oficial" 
                  className="w-14 h-14 rounded-full object-cover shadow-lg border-2 border-sky-400"
                />
                <div>
                  <span className="font-serif text-2xl font-bold text-white block leading-tight">Mar de Cheiro</span>
                  <span className="text-xs uppercase tracking-widest text-sky-400 font-semibold block">Lavanderia 24h</span>
                </div>
              </div>
              <p className="text-slate-400 text-sm max-w-md leading-relaxed">
                A melhor lavanderia 24h da Praia do Francês. Autoatendimento ágil, produtos OMO e Comfort inclusos e serviço assistido de coleta e entrega.
              </p>
              <div className="flex items-center gap-4 pt-2">
                <a 
                  href="https://www.instagram.com/lavanderiamardecheiroofc" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-3 bg-slate-800 hover:bg-[#2d3a82] rounded-full text-white transition-all"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a 
                  href="https://wa.me/5521951118800" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-3 bg-slate-800 hover:bg-[#25D366] rounded-full text-white transition-all"
                  aria-label="WhatsApp"
                >
                  <MessageSquare className="w-5 h-5 fill-white" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-serif font-bold text-lg mb-4 text-sky-400">Navegação</h3>
              <ul className="space-y-2.5 text-sm text-slate-400">
                <li><a href="#home" className="hover:text-white transition-colors">Início</a></li>
                <li><a href="#simulator" className="hover:text-white transition-colors">Simulador</a></li>
                <li><a href="#structure" className="hover:text-white transition-colors">Nossa Estrutura</a></li>
                <li><a href="#premium" className="hover:text-white transition-colors">Serviço Premium</a></li>
                <li><a href="#plans" className="hover:text-white transition-colors">Planos & Preços</a></li>
                <li><a href="#about" className="hover:text-white transition-colors">Sobre Nós</a></li>
                <li><a href="#quiz" className="hover:text-white transition-colors text-sky-300 font-semibold">Quiz Premiado</a></li>
                <li><a href="#faq" className="hover:text-white transition-colors">FAQ</a></li>
              </ul>
            </div>

            {/* Contact Details */}
            <div>
              <h3 className="font-serif font-bold text-lg mb-4 text-sky-400">Contato & Local</h3>
              <ul className="space-y-2.5 text-sm text-slate-400">
                <li className="flex items-center gap-2"><MapPin className="w-4 h-4 text-sky-400 shrink-0" /> Praia do Francês - AL</li>
                <li className="flex items-center gap-2"><Phone className="w-4 h-4 text-sky-400 shrink-0" /> (21) 95111-8800</li>
                <li className="flex items-center gap-2"><Clock className="w-4 h-4 text-sky-400 shrink-0" /> Aberto 24 Horas</li>
              </ul>
            </div>

          </div>

          <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
            <p>© {new Date().getFullYear()} Mar de Cheiro Lavanderia 24h. Todos os direitos reservados.</p>
            <p className="flex items-center gap-1">
              Feito com carinho para a Praia do Francês 🌊
            </p>
          </div>
        </div>
      </footer>

      {/* 19. BOTÃO FLUTUANTE DO WHATSAPP (Pulsating Floating Widget) */}
      <a 
        id="floating-whatsapp-widget"
        href="https://wa.me/5521951118800" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#20ba5a] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-all flex items-center justify-center animate-bounce-subtle group"
        aria-label="Conversar no WhatsApp"
      >
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full animate-pulse">
          24h
        </span>
        <MessageSquare className="w-7 h-7 fill-white" />
      </a>

      {/* LIGHTBOX MODAL FOR PHOTO GALLERY */}
      {selectedPhoto && (
        <div 
          id="photo-lightbox-modal"
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setSelectedPhoto(null)}
        >
          <div className="relative max-w-4xl max-h-[90vh] w-full" onClick={e => e.stopPropagation()}>
            <button 
              onClick={() => setSelectedPhoto(null)}
              className="absolute -top-12 right-0 text-white hover:text-sky-400 p-2 text-sm font-semibold flex items-center gap-1"
            >
              <X className="w-6 h-6" /> Fechar
            </button>
            <img 
              src={selectedPhoto} 
              alt="Foto ampliada da Mar de Cheiro" 
              className="w-full max-h-[80vh] object-contain rounded-2xl shadow-2xl border border-white/20"
            />
          </div>
        </div>
      )}

    </div>
  );
}
