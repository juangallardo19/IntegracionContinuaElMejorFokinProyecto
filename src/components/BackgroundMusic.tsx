import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function BackgroundMusic() {
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Intentar reproducir cuando el componente se monta
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Configurar volumen muy bajo
    audio.volume = 0.08; // 8% del volumen máximo

    // Intentar reproducir automáticamente
    const playAudio = async () => {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch (error) {
        // Si falla la reproducción automática (política del navegador),
        // intentar de nuevo en el primer click del usuario
        console.log("Autoplay bloqueado - esperando interacción del usuario");
        const handleFirstInteraction = async () => {
          try {
            await audio.play();
            setIsPlaying(true);
            document.removeEventListener('click', handleFirstInteraction);
          } catch (e) {
            console.log("No se pudo reproducir el audio");
          }
        };
        document.addEventListener('click', handleFirstInteraction, { once: true });
      }
    };

    playAudio();

    // Listener para cuando el audio se pausa/reproduce
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);

    return () => {
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
    };
  }, []);

  // Manejar mute/unmute
  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isMuted) {
      audio.muted = false;
      setIsMuted(false);
      // Si no está reproduciendo, empezar
      if (!isPlaying) {
        audio.play().catch(() => {});
      }
    } else {
      audio.muted = true;
      setIsMuted(true);
    }
  };

  return (
    <>
      {/* Audio element */}
      <audio
        ref={audioRef}
        loop
        preload="auto"
      >
        <source src="/sounds/background-music.mp3" type="audio/mpeg" />
      </audio>

      {/* Botón flotante para controlar la música */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={toggleMute}
        style={{
          position: "fixed",
          bottom: "2rem",
          right: "2rem",
          width: "3.5rem",
          height: "3.5rem",
          borderRadius: "50%",
          backgroundColor: "var(--ucc-blue)",
          border: "none",
          cursor: "pointer",
          boxShadow: "0 4px 12px rgba(0, 165, 181, 0.3)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1000,
          transition: "all 0.2s",
        }}
        title={isMuted ? "Activar música" : "Silenciar música"}
      >
        <AnimatePresence mode="wait">
          {!isMuted ? (
            <motion.svg
              key="volume-on"
              initial={{ rotate: -180, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 180, opacity: 0 }}
              transition={{ duration: 0.2 }}
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
            </motion.svg>
          ) : (
            <motion.svg
              key="volume-off"
              initial={{ rotate: -180, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 180, opacity: 0 }}
              transition={{ duration: 0.2 }}
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <line x1="23" y1="9" x2="17" y2="15" />
              <line x1="17" y1="9" x2="23" y2="15" />
            </motion.svg>
          )}
        </AnimatePresence>
      </motion.button>
    </>
  );
}
