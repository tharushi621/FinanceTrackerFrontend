import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  TrendingUp,
  Shield,
  Target,
  BarChart2,
  ArrowRight,
  CheckCircle,
  Sparkles,
} from "lucide-react";
import heroGirl from "@/assets/herogirl.jpg";

export default function Splash() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [counts, setCounts] = useState({ users: 0, money: 0, rating: 0 });
  const containerRef = useRef(null);

  useEffect(() => {
    setTimeout(() => setShow(true), 80);
    let frame = 0;
    const total = 90;
    const timer = setInterval(() => {
      frame++;
      const ease = 1 - Math.pow(1 - frame / total, 4);
      setCounts({
        users: Math.floor(ease * 10),
        money: Math.floor(ease * 2),
        rating: Math.min((ease * 4.9).toFixed(1), 4.9),
      });
      if (frame >= total) clearInterval(timer);
    }, 20);
    return () => clearInterval(timer);
  }, []);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const r = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: (e.clientX - r.left) / r.width - 0.5,
      y: (e.clientY - r.top) / r.height - 0.5,
    });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="h-screen flex flex-col overflow-hidden relative"
      style={{ background: "#030f09" }}
    >
      {/* BG */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            background: `
            radial-gradient(ellipse 80% 80% at 0% 50%, rgba(6,78,59,0.95) 0%, transparent 60%),
            radial-gradient(ellipse 50% 60% at 90% 10%, rgba(4,120,87,0.4) 0%, transparent 55%),
            radial-gradient(ellipse 40% 50% at 60% 90%, rgba(16,185,129,0.15) 0%, transparent 55%)
          `,
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
            linear-gradient(rgba(52,211,153,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(52,211,153,0.025) 1px, transparent 1px)
          `,
            backgroundSize: "72px 72px",
          }}
        />
        {[
          { size: 700, x: "5%", y: "30%", color: "#059669", opacity: 0.07 },
          { size: 450, x: "80%", y: "55%", color: "#34d399", opacity: 0.04 },
          { size: 300, x: "45%", y: "5%", color: "#6ee7b7", opacity: 0.03 },
        ].map((orb, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: orb.size,
              height: orb.size,
              left: orb.x,
              top: orb.y,
              background: `radial-gradient(circle, ${orb.color}, transparent 70%)`,
              opacity: orb.opacity,
              transform: `translate(${mousePos.x * (i + 1) * 18}px, ${mousePos.y * (i + 1) * 18}px) translate(-50%, -50%)`,
              filter: "blur(50px)",
              transition: "transform 0.6s ease",
            }}
          />
        ))}
        {[...Array(16)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full animate-pulse"
            style={{
              width: 2 + (i % 3),
              height: 2 + (i % 3),
              top: `${8 + ((i * 5.7) % 84)}%`,
              left: `${8 + ((i * 4.9) % 84)}%`,
              background: `rgba(52,211,153,${0.06 + (i % 4) * 0.04})`,
              animationDelay: `${i * 0.35}s`,
              animationDuration: `${2.5 + (i % 3)}s`,
              transform: `translate(${mousePos.x * ((i % 5) + 1) * 10}px, ${mousePos.y * ((i % 5) + 1) * 10}px)`,
              transition: "transform 0.4s ease",
            }}
          />
        ))}
      </div>

      {/* NAVBAR */}
      <nav
        className={`relative z-20 flex items-center justify-between px-12 py-4 flex-shrink-0 transition-all duration-700 ${show ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"}`}
      >
        <div className="flex items-center gap-3">
          <div className="relative">
            <div
              className="absolute inset-0 rounded-xl blur-md opacity-70"
              style={{
                background: "linear-gradient(135deg, #059669, #34d399)",
              }}
            />
            <div
              className="relative w-9 h-9 rounded-xl flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, #047857, #34d399)",
              }}
            >
              <TrendingUp size={17} color="#fff" strokeWidth={2.5} />
            </div>
          </div>
          <div>
            <span className="text-white font-black text-lg tracking-tight leading-none">
              Finance<span style={{ color: "#34d399" }}>Tracker</span>
            </span>
            <p className="text-white/20 text-[9px] tracking-[0.25em] uppercase">
              Smart Money Management
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate("/login")}
            className="px-5 py-2 rounded-lg text-sm font-semibold text-white/50 hover:text-white transition-all duration-200 hover:bg-white/5"
          >
            Sign In
          </button>
          <button
            onClick={() => navigate("/register")}
            className="flex items-center gap-1.5 px-5 py-2 rounded-xl text-sm font-bold text-white transition-all duration-200 hover:scale-105"
            style={{
              background: "linear-gradient(135deg, #047857, #34d399)",
              boxShadow: "0 4px 20px rgba(5,150,105,0.35)",
            }}
          >
            Get Started <ArrowRight size={13} />
          </button>
        </div>
      </nav>

      {/* HERO */}
      <div className="relative z-10 flex flex-1 min-h-0 px-12 pb-8 gap-0">
        {/* LEFT — 48% */}
        <div
          className={`flex flex-col justify-center w-[48%] pr-8 transition-all duration-1000 delay-100 ${show ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12"}`}
        >
          <div
            className="flex items-center gap-2 mb-6 w-fit px-4 py-1.5 rounded-full"
            style={{
              background: "rgba(52,211,153,0.08)",
              border: "1px solid rgba(52,211,153,0.2)",
            }}
          >
            <div className="relative w-2 h-2 flex items-center justify-center">
              <div className="absolute w-2 h-2 rounded-full bg-emerald-400 animate-ping opacity-60" />
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            </div>
            <span
              className="text-xs font-semibold tracking-wider"
              style={{ color: "#6ee7b7" }}
            >
              Trusted by 10,000+ users worldwide
            </span>
          </div>

          <h1
            className="font-black text-white leading-[1.04] mb-4 tracking-tight"
            style={{ fontSize: "clamp(36px, 4vw, 58px)" }}
          >
            Master Your
            <br />
            Money.
            <br />
            <span
              style={{
                background:
                  "linear-gradient(90deg, #34d399 0%, #6ee7b7 60%, #a7f3d0 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Own Your Future...
            </span>
          </h1>

          <p className="text-sm text-white/40 leading-relaxed mb-6 max-w-[600px]">
            The smartest way to track expenses, set budgets, and achieve
            financial freedom
            <br />— beautifully simple.
          </p>

          <div className="flex flex-col gap-2 mb-7">
            {[
              "Track income & expenses in real-time",
              "Set budgets and get smart alerts",
              "Visualize your financial health",
            ].map((item) => (
              <div key={item} className="flex items-center gap-2.5">
                <CheckCircle
                  size={14}
                  style={{ color: "#34d399", flexShrink: 0 }}
                />
                <span className="text-sm text-white/45">{item}</span>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-3 mb-10">
            <button
              onClick={() => navigate("/register")}
              className="group relative flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm text-white overflow-hidden transition-all duration-300 hover:scale-105"
              style={{
                boxShadow:
                  "0 8px 32px rgba(5,150,105,0.4), 0 0 0 1px rgba(52,211,153,0.15)",
              }}
            >
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(135deg, #047857, #059669 50%, #34d399)",
                }}
              />
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
                style={{
                  background: "linear-gradient(135deg, #065f46, #047857)",
                }}
              />
              <span className="relative">Get Started Free</span>
              <ArrowRight
                size={14}
                className="relative group-hover:translate-x-1 transition-transform"
              />
            </button>
            <button
              onClick={() => navigate("/login")}
              className="px-7 py-3.5 rounded-xl font-semibold text-sm text-white/55 hover:text-white transition-all duration-200 hover:scale-105"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              Sign In
            </button>
          </div>

          <div className="flex items-center">
            {[
              { value: `${counts.users}K+`, label: "Active Users" },
              { value: `$${counts.money}M+`, label: "Money Tracked" },
              {
                value: `${Number(counts.rating).toFixed(1)}★`,
                label: "User Rating",
              },
            ].map((s, i) => (
              <div key={s.label} className="flex items-center">
                {i > 0 && <div className="w-px h-8 mx-6 bg-white/10" />}
                <div>
                  <p className="text-xl font-black text-white tabular-nums">
                    {s.value}
                  </p>
                  <p className="text-[10px] text-white/25 uppercase tracking-widest mt-0.5">
                    {s.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — fills remaining space completely */}
        <div
          className={`flex-1 relative transition-all duration-1000 delay-200 ${show ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12"}`}
        >
          {/* glow */}
          <div className="absolute pointer-events-none inset-0 flex items-center justify-center">
            <div
              style={{
                width: 500,
                height: 500,
                background:
                  "radial-gradient(circle, rgba(52,211,153,0.1), transparent 70%)",
                filter: "blur(40px)",
                transform: `translate(${mousePos.x * 30}px, ${mousePos.y * 30}px)`,
                transition: "transform 0.5s ease",
                borderRadius: "50%",
              }}
            />
          </div>

          <div
            className="relative h-full flex items-center justify-center"
            style={{
              transform: `perspective(1200px) rotateY(${-mousePos.x * 3}deg) rotateX(${mousePos.y * 3}deg)`,
              transition: "transform 0.3s ease",
            }}
          >
            {/* Corner accents */}
            <div
              className="absolute top-4 left-0 w-8 h-8 opacity-40 pointer-events-none"
              style={{
                borderTop: "2px solid #34d399",
                borderLeft: "2px solid #34d399",
                borderRadius: "4px 0 0 0",
              }}
            />
            <div
              className="absolute bottom-4 right-4 w-8 h-8 opacity-40 pointer-events-none"
              style={{
                borderBottom: "2px solid #34d399",
                borderRight: "2px solid #34d399",
                borderRadius: "0 0 4px 0",
              }}
            />

            {/* Image — fills height */}
            <div
              className="relative rounded-[2rem] overflow-hidden w-full"
              style={{
                height: "calc(100vh - 110px)",
                maxHeight: "600px",
                boxShadow:
                  "0 50px 120px rgba(0,0,0,0.7), 0 0 0 1px rgba(52,211,153,0.1)",
              }}
            >
              <img
                src={heroGirl}
                alt="Finance management"
                className="w-full h-full object-cover block"
                style={{ objectPosition: "center top" }}
              />
              <div
                className="absolute inset-x-0 top-0 h-20 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(to bottom, rgba(3,15,9,0.3), transparent)",
                }}
              />
              <div
                className="absolute inset-x-0 bottom-0 h-32 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(to top, rgba(3,15,9,0.7), transparent)",
                }}
              />

              {/* Top left card */}
              <div
                className={`absolute top-5 left-5 px-4 py-3 rounded-2xl transition-all duration-1000 delay-700 ${show ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-3"}`}
                style={{
                  background: "rgba(3,15,9,0.72)",
                  backdropFilter: "blur(20px)",
                  border: "1px solid rgba(52,211,153,0.18)",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
                }}
              >
                <p className="text-white/35 text-[10px] uppercase tracking-wider mb-1">
                  Monthly Savings
                </p>
                <p className="text-lg font-black" style={{ color: "#34d399" }}>
                  + $3,240
                </p>
                <div className="flex items-center gap-1 mt-0.5">
                  <TrendingUp size={9} style={{ color: "#34d399" }} />
                  <span
                    className="text-[10px] font-semibold"
                    style={{ color: "#34d399" }}
                  >
                    +12% vs last month
                  </span>
                </div>
              </div>

              {/* Top right card */}
              <div
                className={`absolute top-5 right-5 px-4 py-3 rounded-2xl transition-all duration-1000 delay-800 ${show ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-3"}`}
                style={{
                  background: "rgba(3,15,9,0.72)",
                  backdropFilter: "blur(20px)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
                }}
              >
                <p className="text-white/35 text-[10px] uppercase tracking-wider mb-1">
                  Budget Used
                </p>
                <p className="text-lg font-black text-white">68%</p>
                <div
                  className="w-20 h-1 rounded-full mt-2"
                  style={{ background: "rgba(255,255,255,0.1)" }}
                >
                  <div
                    className={`h-1 rounded-full transition-all duration-2000 delay-1000 ${show ? "w-[68%]" : "w-0"}`}
                    style={{
                      background: "linear-gradient(90deg, #34d399, #6ee7b7)",
                    }}
                  />
                </div>
              </div>

              {/* Feature pills inside image */}
              <div
                className={`absolute left-5 top-1/2 -translate-y-1/2 flex flex-col gap-2 transition-all duration-1000 delay-500 ${show ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"}`}
              >
                {[
                  {
                    icon: BarChart2,
                    title: "Analytics",
                    desc: "Real-time insights",
                  },
                  {
                    icon: Target,
                    title: "Budget Goals",
                    desc: "Hit every target",
                  },
                ].map(({ icon: Icon, title, desc }) => (
                  <div
                    key={title}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl"
                    style={{
                      background: "rgba(3,15,9,0.75)",
                      backdropFilter: "blur(12px)",
                      border: "1px solid rgba(52,211,153,0.2)",
                    }}
                  >
                    <div
                      className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: "rgba(52,211,153,0.2)" }}
                    >
                      <Icon size={12} style={{ color: "#34d399" }} />
                    </div>
                    <div>
                      <p className="text-white text-xs font-bold leading-none">
                        {title}
                      </p>
                      <p className="text-white/35 text-[10px] mt-0.5">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div
                className={`absolute right-5 top-1/2 -translate-y-1/2 flex flex-col gap-2 transition-all duration-1000 delay-600 ${show ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"}`}
              >
                {[
                  {
                    icon: TrendingUp,
                    title: "Tracking",
                    desc: "Know where it goes",
                  },
                  {
                    icon: Shield,
                    title: "Secure",
                    desc: "Bank-grade security",
                  },
                ].map(({ icon: Icon, title, desc }) => (
                  <div
                    key={title}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl"
                    style={{
                      background: "rgba(3,15,9,0.75)",
                      backdropFilter: "blur(12px)",
                      border: "1px solid rgba(52,211,153,0.2)",
                    }}
                  >
                    <div
                      className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: "rgba(52,211,153,0.2)" }}
                    >
                      <Icon size={12} style={{ color: "#34d399" }} />
                    </div>
                    <div>
                      <p className="text-white text-xs font-bold leading-none">
                        {title}
                      </p>
                      <p className="text-white/35 text-[10px] mt-0.5">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Bottom stats */}
              <div
                className={`absolute bottom-5 left-5 right-5 px-5 py-4 rounded-2xl transition-all duration-1000 delay-900 ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}
                style={{
                  background: "rgba(3,15,9,0.78)",
                  backdropFilter: "blur(20px)",
                  border: "1px solid rgba(255,255,255,0.07)",
                }}
              >
                <div className="flex justify-between items-center mb-3">
                  {[
                    { label: "Balance", value: "$12,450", color: "#f8fafc" },
                    { label: "Income", value: "$5,200", color: "#34d399" },
                    { label: "Expenses", value: "$1,960", color: "#f87171" },
                  ].map((item, i) => (
                    <div key={item.label} className="flex items-center">
                      {i > 0 && <div className="w-px h-7 mx-4 bg-white/10" />}
                      <div className="text-center">
                        <p className="text-white/25 text-[10px] mb-1 uppercase tracking-wider">
                          {item.label}
                        </p>
                        <p
                          className="text-sm font-black"
                          style={{ color: item.color }}
                        >
                          {item.value}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex items-end gap-1 h-8">
                  {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 88].map(
                    (h, i) => (
                      <div
                        key={i}
                        className="flex-1 rounded-sm transition-all duration-1000"
                        style={{
                          height: show ? `${h}%` : "0%",
                          background:
                            i === 11
                              ? "linear-gradient(to top, #34d399, #6ee7b7)"
                              : `rgba(52,211,153,${0.15 + (i % 3) * 0.08})`,
                          transitionDelay: `${1000 + i * 60}ms`,
                        }}
                      />
                    ),
                  )}
                </div>
              </div>
            </div>

            {/* Dot grid */}
            <div className="absolute -bottom-4 -right-4 grid grid-cols-5 gap-1.5 opacity-15 pointer-events-none">
              {[...Array(25)].map((_, i) => (
                <div key={i} className="w-1 h-1 rounded-full bg-emerald-400" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
