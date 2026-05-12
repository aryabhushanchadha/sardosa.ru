import { useState, useEffect, useMemo, useCallback } from "react";
import { QRCodeSVG } from "qrcode.react";

// ─── Emoji Pool ───
const FRUITS = ["🍎", "🍊", "🍋", "🍇", "🍉", "🍓", "🍑", "🍒", "🥝", "🍍", "🥭", "🍌", "🫐", "🍈"];
const CARS = ["🚗", "🚙", "🏎️", "🚕", "🚓", "🚘", "🏍️", "🛻", "🚐", "🚑"];
const FLOWERS = ["🌸", "🌺", "🌻", "🌹", "🌷", "💐", "🌼", "🏵️", "💮", "🌾", "🍀", "🌿", "☘️", "🪻"];
const SUMMER = ["☀️", "🌈", "⭐", "🎀", "🎈", "🦋", "🐝", "🍦"];

const ALL_EMOJIS = [...FRUITS, ...CARS, ...FLOWERS, ...SUMMER];

// ─── Floating Emoji Particle ───
interface Particle {
  id: number;
  emoji: string;
  left: number;
  scale: number;
  duration: number;
  delay: number;
}

function generateParticles(count: number): Particle[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    emoji: ALL_EMOJIS[Math.floor(Math.random() * ALL_EMOJIS.length)],
    left: Math.random() * 100,
    scale: 0.4 + Math.random() * 0.6,
    duration: 14 + Math.random() * 20,
    delay: Math.random() * -30,
  }));
}

// ─── Background Component ───
function EmojiBackground() {
  const particles = useMemo(() => generateParticles(35), []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0" aria-hidden="true">
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute emoji-3d animate-float-up select-none"
          style={{
            left: `${p.left}%`,
            fontSize: `${1 + p.scale * 0.8}rem`,
            "--scale": p.scale,
            "--duration": `${p.duration}s`,
            "--delay": `${p.delay}s`,
          } as React.CSSProperties}
        >
          {p.emoji}
        </span>
      ))}
    </div>
  );
}

// ─── Success Toast ───
function SuccessToast({ show }: { show: boolean }) {
  if (!show) return null;
  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 animate-fade-in-up">
      <div className="glass-card rounded-2xl px-8 py-4 flex items-center gap-3 shadow-2xl border border-emerald-400/40">
        <span className="text-3xl">🎉</span>
        <p className="text-white font-semibold text-lg">Вы зарегистрированы! Мы скоро свяжемся с вами.</p>
      </div>
    </div>
  );
}

// ─── Main App ───
export default function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (!name.trim() || !email.trim()) return;
      setSubmitted(true);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 4000);
    },
    [name, email]
  );

  const handleReset = useCallback(() => {
    setName("");
    setEmail("");
    setSubmitted(false);
  }, []);

  return (
    <div className="relative min-h-screen w-full animate-gradient-shift bg-[linear-gradient(135deg,#1a0533,#2d1b69,#0e4a6e,#134e4a,#3b0764,#1a0533)] flex items-center justify-center px-4 py-10 overflow-hidden">
      {/* Animated drifting gradient orbs — vivid colors */}
      <div className="absolute top-[-15%] left-[-10%] w-[500px] h-[500px] bg-fuchsia-500/25 rounded-full blur-[120px] pointer-events-none animate-orb-1" />
      <div className="absolute bottom-[-15%] right-[-10%] w-[450px] h-[450px] bg-cyan-400/20 rounded-full blur-[120px] pointer-events-none animate-orb-2" />
      <div className="absolute top-[30%] right-[15%] w-[350px] h-[350px] bg-amber-400/15 rounded-full blur-[100px] pointer-events-none animate-orb-3" />
      <div className="absolute bottom-[15%] left-[10%] w-[400px] h-[400px] bg-emerald-400/15 rounded-full blur-[110px] pointer-events-none animate-orb-2" />
      <div className="absolute top-[10%] right-[35%] w-[300px] h-[300px] bg-rose-400/15 rounded-full blur-[100px] pointer-events-none animate-orb-3" />
      <div className="absolute bottom-[30%] left-[40%] w-[280px] h-[280px] bg-violet-500/15 rounded-full blur-[100px] pointer-events-none animate-orb-1" />

      {/* Floating emoji background */}
      <EmojiBackground />

      {/* Toast notification */}
      <SuccessToast show={showToast} />

      {/* Main Card */}
      <div
        className={`relative z-10 w-full max-w-lg transition-all duration-1000 ${
          mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="glass-card rounded-3xl p-8 md:p-12 shadow-2xl animate-pulse-glow animate-rainbow-border">
          {/* Logo / Brand */}
          <div className="text-center mb-8">
            <h1
              className={`text-6xl md:text-7xl font-black tracking-tight bg-gradient-to-r from-yellow-300 via-pink-400 to-cyan-300 bg-clip-text text-transparent animate-shimmer ${
                mounted ? "animate-logo-entrance" : "opacity-0"
              }`}
            >
              SARDOSA
            </h1>
            <div className="mt-3 flex items-center justify-center gap-2">
              <span className="h-px w-10 bg-gradient-to-r from-transparent to-pink-400/60" />
              <span className="text-pink-300/80 text-xs uppercase tracking-[0.3em] font-medium">
                Скоро запуск
              </span>
              <span className="h-px w-10 bg-gradient-to-l from-transparent to-pink-400/60" />
            </div>
          </div>

          {/* Description */}
          <p className="text-center text-white/75 text-base md:text-lg leading-relaxed mb-8">
            Что-то невероятное уже готовится. Будьте первыми, кто узнает о{" "}
            <span className="text-white font-semibold">SARDOSA</span> и получите эксклюзивные награды.
          </p>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-8">
            <span className="flex-1 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
            <span className="text-2xl">🌸</span>
            <span className="flex-1 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
          </div>

          {/* QR Code Section */}
          <div className="flex flex-col items-center mb-8">
            <div className="bg-white rounded-2xl p-4 shadow-lg shadow-pink-500/10 mb-4">
              <QRCodeSVG
                value="https://www.sardosa.ru"
                size={140}
                level="H"
                bgColor="#ffffff"
                fgColor="#1a0533"
                imageSettings={{
                  src: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ctext y='.9em' font-size='90'%3E🌸%3C/text%3E%3C/svg%3E",
                  height: 28,
                  width: 28,
                  excavate: true,
                }}
              />
            </div>
            <p className="text-white/50 text-xs font-medium tracking-wide">
              www.sardosa.ru
            </p>
          </div>

          {/* Drop Date Caption */}
          <div className="text-center mb-6">
            <p className="text-white/80 text-sm md:text-base leading-relaxed">
              🗓️ Скоро мы объявим дату нашего дропа. Чтобы получить эксклюзивные предложения, введите свои данные ниже.
            </p>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-6">
            <span className="flex-1 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            <span className="text-lg">💎</span>
            <span className="flex-1 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          </div>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* CTA Message */}
              <div className="text-center mb-2">
                <p className="text-amber-300 font-semibold text-base md:text-lg leading-snug">
                  💰 Чтобы участвовать в кэшбэке, напишите ваш email и имя
                </p>
              </div>

              {/* Name Field */}
              <div className="relative group">
                <label htmlFor="name" className="block text-white/60 text-sm font-medium mb-1.5 ml-1">
                  Полное имя
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg">👤</span>
                  <input
                    id="name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Иван Иванов"
                    className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white/5 border border-white/15 text-white placeholder-white/30 focus:outline-none focus:border-pink-400/60 focus:bg-white/10 transition-all duration-300 text-base"
                  />
                </div>
              </div>

              {/* Email Field */}
              <div className="relative group">
                <label htmlFor="email" className="block text-white/60 text-sm font-medium mb-1.5 ml-1">
                  Электронная почта
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg">📧</span>
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="вы@пример.com"
                    className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white/5 border border-white/15 text-white placeholder-white/30 focus:outline-none focus:border-pink-400/60 focus:bg-white/10 transition-all duration-300 text-base"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full mt-3 py-4 rounded-xl font-bold text-lg text-white bg-gradient-to-r from-fuchsia-500 via-pink-500 to-amber-400 hover:from-fuchsia-400 hover:via-pink-400 hover:to-amber-300 transition-all duration-300 shadow-lg shadow-pink-500/30 hover:shadow-pink-500/50 active:scale-[0.98] cursor-pointer"
              >
                🚀 Присоединиться к списку ожидания
              </button>

              <p className="text-center text-white/35 text-xs mt-3">
                Мы уважаем вашу конфиденциальность. Никакого спама.
              </p>
            </form>
          ) : (
            /* Success State */
            <div className="text-center space-y-5 animate-fade-in-up">
              <div className="text-6xl mb-2">🎊</div>
              <h2 className="text-2xl font-bold text-white">Добро пожаловать, {name.split(" ")[0]}!</h2>
              <p className="text-white/65 text-base">
                Мы записали ваш email <span className="text-pink-300 font-medium">{email}</span>. 
                Вы первыми узнаете о запуске с эксклюзивными кэшбэк-предложениями!
              </p>
              <button
                onClick={handleReset}
                className="mt-4 px-6 py-2.5 rounded-xl text-sm font-medium text-white/70 border border-white/15 hover:border-white/30 hover:text-white transition-all duration-300 cursor-pointer"
              >
                Зарегистрировать другой email
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <p className="text-center text-white/25 text-xs mt-8">
          © {new Date().getFullYear()} SARDOSA. Все права защищены.
        </p>
      </div>
    </div>
  );
}
