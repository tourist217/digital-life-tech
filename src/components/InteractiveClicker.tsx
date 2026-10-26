'use client';

import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, Zap, Bot, Cpu, Flame, Volume2, VolumeX, RotateCcw } from 'lucide-react';

interface Upgrade {
  id: string;
  name: string;
  cost: number;
  perSecond: number;
  count: number;
  icon: string;
  description: string;
}

export default function InteractiveClicker() {
  const [vibes, setVibes] = useState<number>(0);
  const [clickPower, setClickPower] = useState<number>(1);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(false);
  const [floatingNumbers, setFloatingNumbers] = useState<{ id: number; x: number; y: number; val: number }[]>([]);
  const [upgrades, setUpgrades] = useState<Upgrade[]>([
    {
      id: 'ai-prompt',
      name: 'Умный Промпт-Инженер',
      cost: 15,
      perSecond: 1,
      count: 0,
      icon: '✨',
      description: 'Автоматически генерирует +1 вайб в секунду',
    },
    {
      id: 'gpu-h100',
      name: 'Кластер H100 GPU',
      cost: 100,
      perSecond: 8,
      count: 0,
      icon: '⚡️',
      description: 'Ускоряет вычисления на +8 вайбов в секунду',
    },
    {
      id: 'autonomous-agent',
      name: 'Автономный AI-Агент',
      cost: 500,
      perSecond: 50,
      count: 0,
      icon: '🤖',
      description: 'Сам пишет и деплоит код: +50 вайбов в секунду',
    },
  ]);

  // Calculate passive income
  const passiveVps = upgrades.reduce((sum, u) => sum + u.perSecond * u.count, 0);

  // Passive income ticker
  useEffect(() => {
    if (passiveVps === 0) return;
    const interval = setInterval(() => {
      setVibes((prev) => Math.round((prev + passiveVps / 10) * 10) / 10);
    }, 100);
    return () => clearInterval(interval);
  }, [passiveVps]);

  // Click handler
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setVibes((prev) => prev + clickPower);

    // Floating number
    const newNum = {
      id: Date.now() + Math.random(),
      x: x + (Math.random() * 20 - 10),
      y: y - 20,
      val: clickPower,
    };
    setFloatingNumbers((prev) => [...prev.slice(-10), newNum]);

    // Sound if enabled (Web Audio synthesized beep)
    if (soundEnabled && typeof window !== 'undefined') {
      try {
        const audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.frequency.setValueAtTime(440 + Math.random() * 150, audioCtx.currentTime);
        gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.1);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.1);
      } catch {
        // AudioContext silent fallback
      }
    }

    // Milestone confetti
    if (vibes + clickPower >= 100 && vibes < 100) {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
      });
    }
  };

  // Clean floating numbers
  useEffect(() => {
    if (floatingNumbers.length === 0) return;
    const timer = setTimeout(() => {
      setFloatingNumbers((prev) => prev.filter((n) => Date.now() - n.id < 900));
    }, 900);
    return () => clearTimeout(timer);
  }, [floatingNumbers]);

  const buyUpgrade = (upgradeId: string) => {
    const upgrade = upgrades.find((u) => u.id === upgradeId);
    if (!upgrade || vibes < upgrade.cost) return;

    setVibes((prev) => Math.max(0, prev - upgrade.cost));
    setUpgrades((prev) =>
      prev.map((u) => {
        if (u.id === upgradeId) {
          return {
            ...u,
            count: u.count + 1,
            cost: Math.round(u.cost * 1.3),
          };
        }
        return u;
      })
    );

    // Click power increases slightly with agents
    if (upgradeId === 'ai-prompt') {
      setClickPower((p) => p + 1);
    }
  };

  const resetGame = () => {
    setVibes(0);
    setClickPower(1);
    setUpgrades([
      {
        id: 'ai-prompt',
        name: 'Умный Промпт-Инженер',
        cost: 15,
        perSecond: 1,
        count: 0,
        icon: '✨',
        description: 'Автоматически генерирует +1 вайб в секунду',
      },
      {
        id: 'gpu-h100',
        name: 'Кластер H100 GPU',
        cost: 100,
        perSecond: 8,
        count: 0,
        icon: '⚡️',
        description: 'Ускоряет вычисления на +8 вайбов в секунду',
      },
      {
        id: 'autonomous-agent',
        name: 'Автономный AI-Агент',
        cost: 500,
        perSecond: 50,
        count: 0,
        icon: '🤖',
        description: 'Сам пишет и деплоит код: +50 вайбов в секунду',
      },
    ]);
  };

  return (
    <div className="glass-panel rounded-3xl border border-slate-800 p-6 sm:p-8 max-w-4xl mx-auto shadow-2xl relative overflow-hidden">
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              Интерактивный демо-кликер: <span className="text-cyan-400">VibeClicker</span>
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Живой кейс вайбкодинга. Игра полностью собрана на React 19 без сторонних движков за пару часов.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white transition-colors"
            title={soundEnabled ? 'Выключить звук' : 'Включить звук'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-cyan-400" /> : <VolumeX className="w-4 h-4" />}
          </button>
          <button
            onClick={resetGame}
            className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors"
            title="Сбросить прогресс"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Game Screen */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 items-center">
        {/* Left: Click button & Score */}
        <div className="flex flex-col items-center justify-center text-center space-y-4">
          <div className="space-y-1">
            <div className="text-4xl sm:text-5xl font-black text-white tracking-tight font-mono">
              {Math.floor(vibes)}{' '}
              <span className="text-cyan-400 text-2xl font-sans">Вайбов</span>
            </div>
            <div className="text-xs text-slate-400 flex items-center justify-center gap-3">
              <span>Пассивный доход: <strong className="text-cyan-300">+{passiveVps}/сек</strong></span>
              <span>•</span>
              <span>Сила клика: <strong className="text-amber-300">+{clickPower}</strong></span>
            </div>
          </div>

          {/* Big Click Orb */}
          <div className="relative my-4">
            {floatingNumbers.map((num) => (
              <span
                key={num.id}
                style={{ left: `${num.x}px`, top: `${num.y}px` }}
                className="absolute text-cyan-300 font-bold text-xl pointer-events-none animate-bounce font-mono drop-shadow-md z-20"
              >
                +{num.val}
              </span>
            ))}

            <button
              onClick={handleClick}
              className="relative w-40 h-40 sm:w-48 sm:h-48 rounded-full bg-gradient-to-tr from-cyan-600 via-indigo-600 to-purple-600 p-1.5 shadow-2xl shadow-cyan-500/30 hover:shadow-cyan-400/50 hover:scale-105 active:scale-95 transition-all duration-150 flex items-center justify-center group cursor-pointer"
              aria-label="Click to generate vibes"
            >
              <div className="w-full h-full rounded-full bg-slate-950 flex flex-col items-center justify-center p-4 select-none">
                <Sparkles className="w-12 h-12 text-cyan-400 group-hover:scale-110 group-hover:rotate-12 transition-all duration-200" />
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-300 mt-2">
                  Кликай Вайб!
                </span>
                <span className="text-[10px] text-cyan-400 font-mono mt-0.5">
                  +{clickPower} за клик
                </span>
              </div>
            </button>
          </div>

          <p className="text-[11px] text-slate-500 max-w-xs">
            💡 Хотите такую же мини-игру или квиз для своего бренда или мероприятия? Сделаем за 1–2 дня.
          </p>
        </div>

        {/* Right: Upgrades shop */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-300 flex items-center gap-2">
            <Cpu className="w-4 h-4 text-cyan-400" />
            Прокачка и AI-улучшения
          </h4>

          <div className="space-y-2.5">
            {upgrades.map((u) => {
              const canAfford = vibes >= u.cost;
              return (
                <button
                  key={u.id}
                  onClick={() => buyUpgrade(u.id)}
                  disabled={!canAfford}
                  className={`w-full text-left p-3.5 rounded-2xl border transition-all duration-200 flex items-center justify-between gap-3 ${
                    canAfford
                      ? 'bg-slate-900/80 border-slate-700 hover:border-cyan-500/50 hover:bg-slate-800/80 cursor-pointer'
                      : 'bg-slate-950/40 border-slate-800/60 opacity-60 cursor-not-allowed'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{u.icon}</span>
                    <div>
                      <div className="text-sm font-semibold text-white flex items-center gap-2">
                        {u.name}
                        {u.count > 0 && (
                          <span className="text-[10px] bg-cyan-950 text-cyan-300 border border-cyan-800 px-1.5 py-0.2 rounded-full font-mono">
                            lvl {u.count}
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-slate-400">{u.description}</div>
                    </div>
                  </div>

                  <div className="text-right flex-shrink-0">
                    <span
                      className={`text-xs font-mono font-bold px-2.5 py-1 rounded-lg ${
                        canAfford
                          ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                          : 'bg-slate-800 text-slate-500'
                      }`}
                    >
                      {u.cost} ✨
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 text-xs text-slate-400 flex items-start gap-2 mt-4">
            <Flame className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
            <span>
              <strong>Архитектура:</strong> Компоненты на чистом React state, адаптивная верстка, анимации без сторонних тяжелых библиотек.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
