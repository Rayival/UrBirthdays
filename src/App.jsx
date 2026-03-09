import React, { useState, useEffect, useRef } from 'react';
import { 
  Heart, Gift, Sparkles, Mail, Music, VolumeX, 
  ChevronLeft, Camera, Aperture, Bookmark,
  MessageCircle, Flower, Star, Moon, Lock, Delete,
  ChevronRight, Play, Cloud, Sun, Coffee, Anchor
} from 'lucide-react';

import { motion, AnimatePresence} from "framer-motion";
import { useScroll, useTransform } from "framer-motion";


import img1 from './assets/img/1.jpeg'
import img2 from './assets/img/2.jpeg'
import video1 from './assets/video/1.mp4'
import video2 from './assets/video/2.mp4'
import musicFile from './assets/audio/keep-me.mp3'
import voiceMessage from './assets/audio/voice.wav'
// import thumb1 from "./assets/img/thumb1.jpg"

// --- KOMPONEN IKON LUCU MENGAMBANG (Biru & Putih) ---
const FloatingCuteIcons = () => {
  const [icons, setIcons] = useState([]);
  useEffect(() => {
    const components = ['⭐', '🌙', '☁️', '🧸', '⚓', '✨', '🌊'];
    const interval = setInterval(() => {
      setIcons(prev => {
        const id = Date.now();
        const newI = {
          id,
          x: Math.random() * 100,
          char: components[Math.floor(Math.random() * components.length)],
          size: Math.random() * 15 + 12,
          duration: Math.random() * 10 + 7
        };
        if (prev.length > 6) return [...prev.slice(1), newI];
        return [...prev, newI];
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {icons.map(icon => (
        <span 
          key={icon.id} 
          className="absolute opacity-20 select-none transition-all" 
          style={{ 
            left: `${icon.x}%`, 
            bottom: '-10%', 
            fontSize: `${icon.size}px`, 
            animation: `floatIcon ${icon.duration}s ease-in-out forwards` 
          }}
        >
          {icon.char}
        </span>
      ))}
      <style>{`
        @keyframes floatIcon { 
          0% { transform: translateY(0) rotate(0deg) scale(0.5); opacity: 0; } 
          20% { opacity: 0.3; transform: translateY(-20vh) rotate(20deg) scale(1); } 
          100% { transform: translateY(-110vh) rotate(-20deg) scale(0.8); opacity: 0; } 
        }
      `}</style>
    </div>
  );
};

// --- KOMPONEN MESIN TIK ---
const Typewriter = ({ text, delay = 45, onComplete }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index >= text.length) {
      onComplete?.();
      return;
    }

    const timeout = setTimeout(() => {
      setIndex((prev) => prev + 1);
    }, delay);

    return () => clearTimeout(timeout);
  }, [index, text.length, delay, onComplete]);

  return (
    <span className="whitespace-pre-line tracking-tight">
      {text.slice(0, index)}
    </span>
  );
};

export default function App() {
  const voiceRef = useRef(null);
  const [isVoicePlaying, setIsVoicePlaying] = useState(false);
  const [currentPage, setCurrentPage] = useState('lockscreen');
  const [pin, setPin] = useState('');
  const [errorPin, setErrorPin] = useState(false);
  const [isTypingDone, setIsTypingDone] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 60000); // update tiap 1 menit
    return () => clearInterval(interval);
  }, []);

  const particles = useRef(
    Array.from({ length: 8 }).map(() => ({
      top: Math.random() * 100,
      left: Math.random() * 100
    }))
  );

  const handlePinClick = (num) => {
    if (pin.length < 6) {
      const newPin = pin + num;
      setPin(newPin);
      if (newPin === '100307') {
        setTimeout(() => setCurrentPage('intro'), 300);
      } else if (newPin.length === 6) {
        setErrorPin(true);
        setTimeout(() => {
          setPin('');
          setErrorPin(false);
        }, 500);
      }
    }
  };

  const waves = useRef(
  Array.from({ length: 18 }).map(() => Math.random() * 20 + 10)
);

  const deletePin = () => setPin(pin.slice(0, -1));

  const toggleMusic = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.volume = 0.8;
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(err => console.log("Play blocked:", err));
    }
  };

  const handleStart = () => {
    setCurrentPage('gallery');
    if (audioRef.current) {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(e => console.log("User interaction needed"));
    }
  };

  const memories = [
  {
    type: "image",
    url: img1,
    title: "Your Classic Elegance",
    desc: "Setiap kali aku lihat kamu tersenyum, ada perasaan tenang yang selalu muncul tanpa aku sadari. Bukan cuma karena senyummu indah, tapi karena ada sesuatu dari cara kamu tertawa yang bikin semuanya terasa lebih ringan. Kadang hari yang biasa aja bisa tiba-tiba terasa lebih menyenangkan cuma karena ada kamu di situ."
  },
  {
    type: "video",
    url: video1,
    title: "Midnight Magic",
    desc: "Ada malam-malam di mana kita ngobrol lama banget sampai lupa waktu. Dari cerita kecil sampai hal-hal random yang tiba-tiba kepikiran, semuanya terasa gampang buat dibicarakan sama kamu. Entah kenapa, ngobrol sama kamu selalu terasa nyaman, seolah waktu berjalan lebih cepat dari biasanya."
  },
  {
    type: "image",
    url: img2,
    title: "Deep Connection",
    desc: "Kadang aku merasa aneh juga, bagaimana obrolan sederhana sama kamu bisa terasa begitu berarti. Kita bisa tertawa cuma karena hal kecil, atau tiba-tiba ngobrol lebih dalam tanpa direncanakan. Tapi justru dari momen-momen kecil itu aku sadar kalau kebersamaan kita selalu punya rasa yang berbeda."
  },
  {
    type: "video",
    url: video2,
    title: "Guiding Light",
    desc: "Aku mungkin nggak selalu pandai mengungkapkan semuanya dengan kata-kata. Tapi satu hal yang aku tahu, kehadiran kamu membawa banyak warna dalam hariku. Dari perhatian kecil sampai cara kamu selalu ada buat ngobrol, semuanya punya tempat tersendiri di pikiranku. Dan di hari ulang tahun kamu ini, aku cuma ingin kamu tahu kalau kamu benar-benar berarti buat aku."
  }
];

  const suratCinta = `Happy Birthday, Ami 💙

Hari ini bukan cuma tentang angka yang bertambah,
tapi tentang seseorang yang tanpa sadar sudah jadi bagian penting dari hidupku.

Aku selalu kagum sama kamu.
Cara kamu berpikir, cara kamu bersikap,
dan cara kamu tanpa sadar bikin hariku terasa lebih ringan.

Terima kasih ya,
karena kamu ada.
Karena kamu hadir.
Karena kamu, hidup aku terasa lebih hangat dari biasanya.

You make me feel safe.
Tenang.
Nyaman.
Like I’ve found a place I can rest my heart.

Aku tahu mungkin sekarang hubungan kita masih seperti ini,
masih tanpa status,
masih menggantung di antara banyak hal yang belum pasti.
But one thing I’m sure about —
I love you. Really.

Not halfway.
Not unsure.
I love you with intention.

Tentang gift yang aku kasih,
aku tahu mungkin itu sederhana,
engga mewah,
dan mungkin jauh dari ekspektasi kamu.
If it’s not perfect, I’m sorry.
Tapi semuanya aku kasih dengan tulus,
karena aku pengen kamu ngerasa dihargai hari ini.

Doain aku juga ya,
supaya aku bisa jadi versi yang lebih baik,
supaya suatu hari nanti aku bisa ngasih lebih dari sekadar hadiah —
tapi masa depan yang layak buat kamu banggakan.

Semoga kamu sukses,
punya karier yang indah,
semoga semua mimpimu tercapai.
dan semua hal baik yang kamu doakan diam-diam
pelan-pelan Tuhan wujudkan.

Dan kalau Tuhan izinkan,
aku ingin jadi bagian dari perjalanan itu.
Aamiin.

Happy birthday,
my favorite person. ⚓💙✨`;

  // 🌊 Scroll Animation Variant
  const fadeUp = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        ease: "easeOut"
      }
    }
  };

  // ⭐ Parallax Effect
  const { scrollY } = useScroll();
  const yBg = useTransform(scrollY, [0, 1000], [0, -80]);

  return (
    <div className="min-h-[100dvh] w-full bg-[#020617] flex flex-col items-center justify-start relative overflow-x-hidden font-sans text-white selection:bg-blue-100">
      
      {/* Background Decor - Navy Gradient */}
      <motion.div 
        style={{ y: yBg }}
        className="fixed inset-0 z-0 pointer-events-none"
      >
        <div className="absolute top-0 left-0 w-[60%] h-[60%] bg-blue-900/30 rounded-full blur-[140px]"></div>
        <div className="absolute bottom-0 right-0 w-[40%] h-[40%] bg-slate-800/40 rounded-full blur-[140px]"></div>
      </motion.div>
      
      <FloatingCuteIcons />
      <audio 
        ref={audioRef} 
        src={musicFile} 
        loop 
        preload="auto"
        volume={0.5}
      />

     {/* --- ULTRA NAVY LOCKSCREEN OPTIMIZED --- */}
    <AnimatePresence mode="wait">
    {currentPage === "lockscreen" && (
    <motion.div
    key="lockscreen"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0, scale: 1.05 }}
    transition={{ duration: 0.5 }}
    className="fixed inset-0 z-[100] flex items-center justify-center px-4"
    >

    {/* Background */}
    <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900" />

    {/* Particles */}
    <div className="absolute inset-0 overflow-hidden">
    {particles.current.map((p, i) => (
    <motion.div
    key={i}
    animate={{ y: [0, -40, 0], opacity: [0.2, 0.5, 0.2] }}
    transition={{
    duration: 8 + i,
    repeat: Infinity,
    ease: "easeInOut"
    }}
    className="absolute w-[2px] h-[2px] bg-blue-300 rounded-full"
    style={{
    top: `${p.top}%`,
    left: `${p.left}%`
    }}
    />
    ))}
    </div>

    {/* Glass Container */}
    <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.6 }}
    className="relative backdrop-blur-md bg-white/10 border border-white/20
    shadow-xl rounded-[40px] w-full max-w-sm sm:max-w-md
    px-6 sm:px-10 py-10 sm:py-14 flex flex-col items-center"
    >

    {/* Lock Icon */}
    <motion.div
    animate={{ rotate: [0, -5, 5, -5, 0] }}
    transition={{ duration: 4, repeat: Infinity }}
    >
    <Lock size={22} className="text-blue-300 mb-6 opacity-80" />
    </motion.div>

    {/* Time */}
    <motion.h2
    animate={{ y: [0, -6, 0] }}
    transition={{ duration: 5, repeat: Infinity }}
    className="text-4xl sm:text-6xl font-light font-serif tracking-tight text-white"
    >
    {time.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit"
    })}
    </motion.h2>

    {/* Date */}
    <p className="uppercase tracking-[0.3em] text-[10px] sm:text-xs mt-3 text-blue-300 text-center">
    {time.toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long"
    })}
    </p>

    {/* PIN Section */}
    <div className={`flex flex-col items-center gap-10 mt-12 w-full ${errorPin ? "animate-shake" : ""}`}>

    {/* PIN dots */}
    <div className="flex gap-3">
    {[...Array(6)].map((_, i) => (
    <motion.div
    key={i}
    animate={pin.length > i ? { scale: 1.2 } : { scale: 1 }}
    transition={{ duration: 0.2 }}
    className={`w-3 h-3 rounded-full border-2 ${
    pin.length > i
    ? "bg-blue-400 border-blue-400"
    : "border-blue-300/40"
    }`}
    />
    ))}
    </div>

    {/* Number pad */}
    <div className="grid grid-cols-3 gap-5 sm:gap-6 w-full justify-items-center">

    {[1,2,3,4,5,6,7,8,9].map(num => (
    <motion.button
    key={num}
    whileTap={{ scale: 0.85 }}
    onClick={() => handlePinClick(num)}
    className="w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center
    text-lg sm:text-xl font-light bg-white/10 backdrop-blur-md
    border border-white/20 text-blue-200 shadow-md
    active:bg-blue-500 active:text-white transition-all"
    >
    {num}
    </motion.button>
    ))}

    <div />

    <motion.button
    whileTap={{ scale: 0.85 }}
    onClick={() => handlePinClick(0)}
    className="w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center
    text-lg sm:text-xl font-light bg-white/10 backdrop-blur-md
    border border-white/20 text-blue-200 shadow-md
    active:bg-blue-500 active:text-white transition-all"
    >
    0
    </motion.button>

    <motion.button
    whileTap={{ scale: 0.85 }}
    onClick={deletePin}
    className="w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center
    text-blue-300 active:text-white transition-all"
    >
    <Delete size={20} />
    </motion.button>

    </div>
    </div>

    </motion.div>
    </motion.div>
    )}
    </AnimatePresence>

      {/* --- NAVY MUSIC CONTROLLER --- */}
      {currentPage !== 'lockscreen' && (
        <button 
          onClick={toggleMusic}
          className="fixed top-8 right-8 z-50 flex items-center space-x-3 bg-white/80 backdrop-blur-md p-2 pl-4 rounded-full border border-slate-200 shadow-sm hover:shadow-md transition-all group"
        >
          <span className="text-[10px] font-bold tracking-widest text-blue-900">
            {isPlaying ? 'SOUND ON' : 'SOUND OFF'}
          </span>
          <div className="w-10 h-10 bg-slate-900 rounded-full flex items-center justify-center text-white group-hover:bg-blue-900 transition-colors">
            {isPlaying ? <Music size={16} className="animate-spin-slow" /> : <VolumeX size={16} />}
          </div>
        </button>
      )}

      <div className="z-10 w-full max-w-5xl mx-auto px-6 md:px-8">
        
        {/* --- INTRO (Navy Minimalist) --- */}
        {currentPage === 'intro' && (
          <div className="min-h-screen flex flex-col items-center justify-center space-y-16 text-center animate-in slide-in-from-bottom-12 duration-1000">
            <div className="relative">
                <div className="absolute -top-12 -left-12 opacity-10 rotate-12">
                    <Anchor size={120} className="text-blue-900" />
                </div>
                <div className="w-40 h-40 bg-slate-900 rounded-3xl rotate-12 flex items-center justify-center shadow-2xl relative z-10">
                   <Gift size={60} className="text-white -rotate-12" />
                </div>
                <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-full shadow-xl animate-bounce z-20">
                   <Sparkles className="text-blue-600" size={32} />
                </div>
            </div>
            
            <div className="space-y-6">
               <h1 className="text-5xl md:text-8xl font-serif text-white tracking-tight leading-none">For Someone<br/><span className="text-blue-800 italic">Extraordinary</span></h1>
               <p className="text-slate-400 font-bold tracking-[0.5em] text-xs uppercase">A curation of nautical grace and love</p>
            </div>

            <button 
              onClick={handleStart}
              className="px-12 py-5 bg-slate-900 text-white rounded-full font-bold tracking-widest text-sm hover:bg-blue-900 hover:scale-105 transition-all shadow-xl active:scale-95"
            >
              EXPLORE MOMENTS ⚓
            </button>
          </div>
        )}

        {/* --- GALLERY (Optimized & Smooth Mobile) --- */}
        {currentPage === 'gallery' && (
          <div className="py-24 space-y-24">

            {/* Title */}
            <div className="flex flex-col items-center text-center">
              <Cloud size={36} className="text-blue-100 mb-4" />
              <h2 className="text-5xl md:text-6xl font-serif italic text-white">
                Gallery Journal
              </h2>
              <div className="w-16 h-1 bg-blue-900 mt-6 rounded-full"></div>
            </div>

            {memories.map((item, i) => (
              <div
                key={i}
                className={`flex flex-col md:flex-row gap-10 items-center ${
                  i % 2 !== 0 ? "md:flex-row-reverse" : ""
                }`}
              >

                {/* Media */}
                <div className="w-full md:w-3/5 relative">

                  <div className="absolute -top-3 -left-3 w-full h-full border border-slate-200 rounded-2xl -z-10 translate-x-6 translate-y-6"></div>

                  <div className="bg-white p-3 rounded-2xl shadow-lg overflow-hidden">

                    {item.type === "image" ? (
                      <img
                        src={item.url}
                        loading="lazy"
                        className="w-full aspect-[4/5] object-cover rounded-xl"
                      />
                    ) : (
                      <video
                        src={item.url}
                        autoPlay
                        loop
                        muted
                        playsInline
                        preload="none"
                        // poster="/video-thumb.png"
                        controls={false}
                        disablePictureInPicture
                        className="w-full aspect-[4/5] object-cover rounded-xl"
                      />
                    )}

                  </div>
                </div>

                {/* Text */}
                <div
                  className={`w-full md:w-2/5 space-y-6 ${
                    i % 2 !== 0 ? "md:text-right" : "md:text-left"
                  }`}
                >

                  <div
                    className={`flex items-center space-x-4 ${
                      i % 2 !== 0 ? "md:justify-end" : ""
                    }`}
                  >
                    <span className="w-8 h-px bg-slate-300"></span>
                    <span className="text-blue-800 font-black text-xs uppercase tracking-[0.35em]">
                      Section 0{i + 1}
                    </span>
                  </div>

                  <h3 className="text-4xl md:text-5xl font-serif italic text-white leading-tight">
                    {item.title}
                  </h3>

                  <p className="text-slate-400 leading-relaxed text-lg">
                    {item.desc}
                  </p>

                </div>
              </div>
            ))}

            {/* Bottom Button */}
            <div className="py-16 flex flex-col items-center space-y-10">

              <div className="flex space-x-2 text-slate-200">
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
              </div>

              <motion.button
                onClick={() => setCurrentPage("voice")}
                whileTap={{ scale: 0.95 }}
                className="
                group relative overflow-hidden
                px-10 py-6
                rounded-3xl
                border border-blue-900/30
                bg-white/40 backdrop-blur-sm
                shadow-lg
                hover:shadow-xl
                hover:border-blue-900
                hover:bg-white/60
                transition-all duration-300
                cursor-pointer
              "
              >

                {/* shimmer */}
                <span
                  className="
                  absolute inset-0
                  bg-gradient-to-r
                  from-transparent
                  via-white/40
                  to-transparent
                  translate-x-[-150%]
                  group-hover:translate-x-[150%]
                  transition-transform duration-700
                "
                />

                <span className="relative flex items-center gap-4 text-blue-900 font-semibold tracking-wide">

                  <Anchor
                    size={20}
                    className="transition-transform duration-300 group-hover:rotate-12"
                  />

                  <span className="text-lg">
                    Read the Letter
                  </span>

                  <ChevronRight
                    size={18}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />

                </span>

              </motion.button>
            </div>

          </div>
        )}

        {/* --- VOICE MESSAGE --- */}
        {currentPage === 'voice' && (
          <div className="min-h-screen flex flex-col items-center justify-center text-center px-6 animate-fade-in">

            <div className="max-w-xl w-full space-y-12">

              {/* Title */}
              <div className="space-y-4">
                <h2 className="text-4xl md:text-6xl font-serif text-white tracking-tight">
                  Before you read this...
                </h2>

                <p className="text-blue-200 max-w-md mx-auto leading-relaxed">
                  there's something I want you to hear first.
                </p>
              </div>

              <audio 
                ref={voiceRef} 
                src={voiceMessage}
                preload="auto"
                onEnded={() => {
                  if (audioRef.current) {
                    audioRef.current.play();
                  }
                  setIsVoicePlaying(false);
                }}
              />

              {/* Voice Card */}
          <div className="relative group backdrop-blur-md bg-white/10 border border-white/20 rounded-3xl p-6 md:p-8 shadow-[0_30px_80px_rgba(0,0,0,0.6)] overflow-hidden">

            {/* Glow */}
            <div className="absolute inset-0 opacity-20 bg-gradient-to-tr from-blue-400/40 via-transparent to-transparent"></div>

            {/* Floating Anchor */}
            <div className="absolute -top-4 -right-4 bg-blue-400 text-slate-900 p-2 md:p-3 rounded-full shadow-lg animate-pulse shrink-0">
              <Anchor className="w-4 h-4 md:w-5 md:h-5"/>
            </div>

            <div className="flex items-center gap-4 md:gap-6 relative">

              {/* PLAY BUTTON */}
              <button
                onClick={() => {
                  if (audioRef.current) {
                    audioRef.current.pause(); // hentikan musik di iOS
                  }

                  voiceRef.current.play();
                  setIsVoicePlaying(true);
                }}
                className="
                shrink-0
                aspect-square
                w-12 h-12
                md:w-16 md:h-16
                flex items-center justify-center
                rounded-full
                bg-gradient-to-br from-blue-400 to-blue-600
                text-white
                shadow-xl
                hover:scale-110
                transition
                "
              >
                <Play className="w-5 h-5 md:w-7 md:h-7"/>
              </button>

              {/* WAVEFORM */}
              <div className="flex items-end gap-[2px] md:gap-[3px] flex-1 h-8 md:h-10 overflow-hidden">

                {[...Array(18)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-[2px] md:w-[3px] rounded-full bg-blue-200 ${
                      isVoicePlaying ? "animate-wave" : "opacity-40"
                    }`}
                    style={{
                      height: `${waves.current[i]}px`,
                      animationDelay: `${i * 0.05}s`
                    }}
                  />
                ))}

              </div>

              {/* Duration */}
              <span className="text-blue-200 text-xs md:text-sm font-mono tracking-wider shrink-0">
                0:12
              </span>

            </div>

            {/* Caption */}
            <p className="text-blue-100 text-[11px] md:text-xs italic mt-4 md:mt-6 text-left opacity-80">
              Sometimes a voice carries feelings better than words.
            </p>

              </div>

              {/* Continue */}
              {isVoicePlaying && (
                <button
                  onClick={() => {
                    if (voiceRef.current) {
                      voiceRef.current.pause();
                      voiceRef.current.currentTime = 0;
                    }

                    if (audioRef.current) {
                      audioRef.current.play().catch(() => {});
                    }

                    setCurrentPage('letter');
                  }}
                  className="
                  group
                  mt-4
                  px-10 py-4
                  bg-gradient-to-r from-blue-700 to-blue-900
                  text-white
                  rounded-full
                  font-semibold
                  tracking-wide
                  shadow-lg
                  hover:scale-105
                  hover:shadow-blue-900/40
                  transition
                  flex items-center gap-3
                  mx-auto
                  "
                >
                  Continue
                  <ChevronRight size={18} className="group-hover:translate-x-1 transition"/>
                </button>
              )}

            </div>
          </div>
        )}

        {/* --- LETTER (Clean & Crisp) --- */}
        {currentPage === 'letter' && (
          <div className="min-h-screen py-32 animate-fade-in flex flex-col items-center">
            <button onClick={() => setCurrentPage('gallery')} className="mb-20 flex items-center text-[10px] font-black tracking-[0.5em] text-slate-400 uppercase hover:text-white transition-all">
              <ChevronLeft size={16} className="mr-2" /> Back to Log
            </button>
            
            <div className="
              max-w-2xl w-full 
              bg-white 
              p-10 md:p-20 
              rounded-[40px] 
              shadow-2xl
              border border-slate-100 
              relative
              overflow-hidden
              transform-gpu
            ">
              {/* ✨ Soft Navy Glow */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute -top-20 -left-20 w-48 h-48 bg-blue-100/40 rounded-full blur-xl"></div>
                <div className="absolute -bottom-20 -right-20 w-48 h-48 bg-slate-200/40 rounded-full blur-xl"></div>
              </div>

              {/* 📝 Paper Texture */}
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('/assets/img/paper.png')]"></div>
              <div className="absolute top-10 right-10">
                 <Mail className="text-blue-50" size={80} />
              </div>
              
              <div className="relative z-10 text-slate-900 text-2xl md:text-3xl font-serif leading-[1.8] italic min-h-[380px]">
                <Typewriter text={suratCinta} onComplete={() => setIsTypingDone(true)} />
              </div>

              {isTypingDone && (
                <div className="mt-20 pt-10 border-t border-slate-100 flex flex-col items-center space-y-8">
                  <div className="flex space-x-1">
                     <Heart size={14} className="text-blue-900" fill="currentColor" />
                     <Heart size={14} className="text-blue-900" fill="currentColor" />
                  </div>
                  <button 
                    onClick={() => setCurrentPage('closing')} 
                    className="w-20 h-20 bg-slate-900 text-white rounded-full flex items-center justify-center hover:bg-blue-900 transition-all shadow-2xl hover:scale-110 active:scale-95"
                  >
                    <Anchor size={32} />
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* --- CLOSING (Navy & Black Starry Finale) --- */}
        {currentPage === 'closing' && (
        <div className="fixed inset-0 w-screen h-screen bg-gradient-to-br from-[#0B1120] via-[#0F172A] to-[#020617] text- overflow-auto z-50">

          {/* Safe Area Padding */}
          <div className="min-h-[100dvh] flex flex-col items-center justify-center text-center px-6 py-16">

            {/* Background Star Layer */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="stars"></div>
            </div>

            <div className="relative space-y-16 max-w-5xl mx-auto animate-fade-in">

              {/* ICON SECTION */}
              <div className="relative flex justify-center">
                <div className="w-56 h-56 sm:w-64 sm:h-64 md:w-80 md:h-80 
                                rounded-[70px] bg-slate-900/60 backdrop-blur-2xl 
                                flex items-center justify-center 
                                shadow-[0_80px_160px_-30px_rgba(0,0,0,0.8)] 
                                rotate-[12deg] group hover:rotate-0 
                                transition-all duration-700 
                                border border-white/10">

                  <div className="bg-white p-6 sm:p-8 rounded-full 
                                  -rotate-[12deg] group-hover:rotate-0 
                                  transition-all shadow-inner relative overflow-hidden">

                    <div className="absolute inset-0 shimmer pointer-events-none"></div>

                    <Sun className="text-amber-400 animate-spin-slow"
                        size={window.innerWidth < 640 ? 60 : 72}
                        fill="currentColor" />
                  </div>
                </div>

                <div className="absolute -top-6 -right-6 sm:-top-8 sm:-right-8 
                                bg-blue-900 p-4 sm:p-6 rounded-full 
                                shadow-2xl animate-bounce border border-white/20">
                  <Coffee className="text-white" size={28} />
                </div>
              </div>

              {/* TEXT SECTION */}
              <div className="space-y-8 px-4">
                <h2 className="text-5xl sm:text-6xl md:text-8xl font-serif italic tracking-tight leading-tight">
                  Still Choosing <br />
                  <span className="text-blue-400">You.</span>
                </h2>

                <motion.p
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="text-slate-300 font-serif italic 
                            text-base sm:text-lg md:text-xl 
                            leading-relaxed max-w-xl mx-auto"
                >
                  Not because the ocean is calm.  
                  <br />
                  But because even in the waves,  
                  <br />
                  I’d rather sail with you. ⚓💙
                  <br /><br />
                  And if this made you smile…
                  <br />
                  then this journey was already worth it.
                </motion.p>
              </div>

              {/* CTA */}
              <div className="flex justify-center">
                <button 
                  onClick={() => window.open('https://wa.me/62895385195723?text=You made me smile. ⚓💙', '_blank')}
                  className="relative px-10 sm:px-14 py-5 bg-white text-slate-900
                            font-black rounded-full flex items-center 
                            space-x-3 sm:space-x-4 shadow-2xl 
                            transition-all text-xs tracking-widest 
                            uppercase overflow-hidden group 
                            hover:scale-105 active:scale-95"
                >
                  <span className="absolute inset-0 bg-gradient-to-r 
                                  from-blue-400/0 via-blue-400/30 
                                  to-blue-400/0 opacity-0 
                                  group-hover:opacity-100 
                                  transition-all duration-700 blur-xl"></span>
                  <MessageCircle size={18} />
                  <span>Tell Me You Smiled</span>
                </button>
              </div>

              {/* FOOTER */}
              <div className="text-xs tracking-widest uppercase text-slate-500 pt-6">
                Made with courage • sincerity • and too much feeling
              </div>

            </div>
          </div>
        </div>
      )}

      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Space+Grotesk:wght@300;400;600;700&display=swap');
        
        body { font-family: 'Space Grotesk', sans-serif; background-color: #F8FAFC; color: #0F172A; }
        .font-serif { font-family: 'Playfair Display', serif; }
        
        .animate-spin-slow { animation: spin 10s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        
        .animate-fade-in { animation: fadeIn 1.5s ease-out forwards; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        
        .animate-shake {
          animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
        }
        @keyframes shake {
          10%, 90% { transform: translate3d(-1px, 0, 0); }
          20%, 80% { transform: translate3d(2px, 0, 0); }
          30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
          40%, 60% { transform: translate3d(4px, 0, 0); }
        }

        /* Star Background */
      .stars {
        width: 100%;
        height: 100%;
        background: transparent url("https://www.transparenttextures.com/patterns/stardust.png") repeat;
        opacity: 0.08;
      }

      /* Glass shimmer effect */
      .shimmer {
        background: linear-gradient(
          120deg,
          rgba(255,255,255,0.1) 0%,
          rgba(255,255,255,0.4) 50%,
          rgba(255,255,255,0.1) 100%
        );
        transform: translateX(-100%);
        animation: shimmerMove 4s infinite;
      }

      @keyframes wave {
        0% { transform: scaleY(0.4); }
        50% { transform: scaleY(1); }
        100% { transform: scaleY(0.4); }
      }

      .animate-wave {
        animation: wave 1s ease-in-out infinite;
      }
      @keyframes shimmerMove {
        100% {
          transform: translateX(100%);
        }
      }

      html, body, #root {
      margin: 0;
      padding: 0;
      height: 100%;
      background-color: #020617; /* force navy */
    }

    body {
      overflow-x: hidden;
    }
      `}</style>
    </div>
  );
}