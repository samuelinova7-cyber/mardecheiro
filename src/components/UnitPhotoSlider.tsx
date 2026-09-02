import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Maximize2, Pause, Play, Sparkles, MapPin } from 'lucide-react';

export interface UnitPhoto {
  url: string;
  title: string;
  desc?: string;
}

interface UnitPhotoSliderProps {
  id: string;
  unitName: string;
  badgeText: string;
  locationTag: string;
  photos: UnitPhoto[];
  onOpenLightbox: (url: string) => void;
  accentColor?: string;
}

export default function UnitPhotoSlider({
  id,
  unitName,
  badgeText,
  locationTag,
  photos,
  onOpenLightbox,
  accentColor = '#2563eb'
}: UnitPhotoSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const nextPhoto = () => {
    setCurrentIndex((prev) => (prev + 1) % photos.length);
  };

  const prevPhoto = () => {
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  useEffect(() => {
    if (isAutoPlaying) {
      timerRef.current = setInterval(() => {
        nextPhoto();
      }, 3500);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isAutoPlaying, currentIndex, photos.length]);

  const currentPhoto = photos[currentIndex] || photos[0];

  return (
    <div 
      id={id}
      className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xl hover:shadow-2xl transition-all flex flex-col group"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Header do Bloco da Unidade */}
      <div className="p-5 sm:p-6 bg-gradient-to-r from-[#2d3a82] to-[#1e293b] text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="inline-flex items-center gap-1.5 bg-white/15 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-sky-300 mb-1.5 border border-white/10">
            <Sparkles className="w-3.5 h-3.5 text-sky-400" />
            <span>{badgeText}</span>
          </div>
          <h3 className="font-serif font-bold text-xl sm:text-2xl text-white flex items-center gap-2">
            <MapPin className="w-5 h-5 text-sky-400 shrink-0" />
            <span>{unitName}</span>
          </h3>
          <p className="text-xs text-slate-300 mt-0.5">{locationTag} • Autoatendimento 24h</p>
        </div>

        {/* Indicador de fotos e controle de reprodução */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="bg-black/40 text-xs font-bold px-3 py-1.5 rounded-full border border-white/20 text-sky-300">
            {currentIndex + 1} / {photos.length} Fotos
          </span>
          <button
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all text-xs"
            title={isAutoPlaying ? "Pausar troca automática" : "Iniciar troca automática"}
          >
            {isAutoPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-white" />}
          </button>
        </div>
      </div>

      {/* Janela Principal da Foto com Alternância Suave */}
      <div className="relative aspect-[16/10] sm:aspect-[16/10] bg-slate-950 overflow-hidden select-none">
        {photos.map((photo, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            <img
              src={photo.url}
              alt={`${unitName} - Foto ${index + 1}`}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              loading={index === 0 ? "eager" : "lazy"}
            />
          </div>
        ))}

        {/* Gradiente de fundo para legibilidade dos controles */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 z-20 pointer-events-none"></div>

        {/* Botão de Ampliar / Lightbox */}
        <button
          onClick={() => onOpenLightbox(currentPhoto.url)}
          className="absolute top-4 right-4 z-30 bg-black/60 hover:bg-black/90 text-white p-2.5 rounded-full backdrop-blur-md transition-all border border-white/20 shadow-lg cursor-pointer flex items-center gap-1 text-xs font-medium"
          title="Clique para ampliar em tela cheia"
        >
          <Maximize2 className="w-4 h-4 text-sky-400" />
          <span className="hidden sm:inline">Ampliar</span>
        </button>

        {/* Botões de Navegação Anterior / Próximo */}
        <button
          onClick={prevPhoto}
          className="absolute left-3 top-1/2 -translate-y-1/2 z-30 bg-black/60 hover:bg-[#2d3a82] text-white p-2.5 sm:p-3 rounded-full backdrop-blur-md transition-all border border-white/20 shadow-lg cursor-pointer hover:scale-110 active:scale-95"
          aria-label="Foto anterior"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        <button
          onClick={nextPhoto}
          className="absolute right-3 top-1/2 -translate-y-1/2 z-30 bg-black/60 hover:bg-[#2d3a82] text-white p-2.5 sm:p-3 rounded-full backdrop-blur-md transition-all border border-white/20 shadow-lg cursor-pointer hover:scale-110 active:scale-95"
          aria-label="Próxima foto"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* Legenda da Foto Atual */}
        <div className="absolute bottom-3 left-4 right-4 z-30 text-white pointer-events-none">
          <p className="font-serif font-bold text-sm sm:text-base text-sky-300 drop-shadow-md">
            {currentPhoto.title}
          </p>
          {currentPhoto.desc && (
            <p className="text-xs text-slate-200 line-clamp-1 drop-shadow-sm">
              {currentPhoto.desc}
            </p>
          )}
        </div>
      </div>

      {/* Miniaturas de Acesso Rápido na Barra Inferior */}
      <div className="p-3 sm:p-4 bg-slate-900 border-t border-slate-800 flex items-center gap-2 overflow-x-auto scrollbar-none">
        {photos.map((photo, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`relative shrink-0 w-12 sm:w-16 h-10 sm:h-12 rounded-xl overflow-hidden transition-all border-2 cursor-pointer ${
              idx === currentIndex
                ? 'border-sky-400 scale-105 shadow-md shadow-sky-400/30 ring-2 ring-sky-400/50'
                : 'border-transparent opacity-50 hover:opacity-100'
            }`}
          >
            <img
              src={photo.url}
              alt={`Miniatura ${idx + 1}`}
              className="w-full h-full object-cover"
            />
            {idx === currentIndex && (
              <div className="absolute inset-0 bg-sky-400/20 pointer-events-none"></div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
