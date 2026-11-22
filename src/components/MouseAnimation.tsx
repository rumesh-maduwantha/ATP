import React, { useEffect, useRef, useState } from 'react';

interface ClickRipple {
  id: number;
  x: number;
  y: number;
}

const INTERACTIVE_SELECTOR =
  'a, button, [role="button"], input, select, textarea, label, .cursor-pointer';

export const MouseAnimation: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const [enabled, setEnabled] = useState(false);
  const [ripples, setRipples] = useState<ClickRipple[]>([]);

  useEffect(() => {
    const finePointer = window.matchMedia('(pointer: fine)').matches;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!finePointer || reducedMotion) return;

    setEnabled(true);

    const mouse = { x: -200, y: -200 };
    const ring = { x: -200, y: -200 };
    const glow = { x: -200, y: -200 };

    let visible = false;
    let hovering = false;
    let pressed = false;
    let ringScale = 1;
    let dotScale = 1;
    let rafId = 0;

    const updateVisibility = (show: boolean) => {
      visible = show;
      const opacity = show ? '1' : '0';
      if (dotRef.current) dotRef.current.style.opacity = opacity;
      if (ringRef.current) ringRef.current.style.opacity = opacity;
      if (glowRef.current) glowRef.current.style.opacity = show ? '0.65' : '0';
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;

      if (!visible) {
        ring.x = mouse.x;
        ring.y = mouse.y;
        glow.x = mouse.x;
        glow.y = mouse.y;
        updateVisibility(true);
      }

      const target = e.target as HTMLElement | null;
      hovering = Boolean(target?.closest(INTERACTIVE_SELECTOR));
    };

    const handleMouseDown = (e: MouseEvent) => {
      pressed = true;
      const id = Date.now() + Math.random();
      setRipples((prev) => [...prev.slice(-4), { id, x: e.clientX, y: e.clientY }]);
      window.setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== id));
      }, 650);
    };

    const handleMouseUp = () => {
      pressed = false;
    };

    const handleMouseLeave = () => {
      updateVisibility(false);
    };

    const handleMouseEnter = () => {
      updateVisibility(true);
    };

    const animate = () => {
      ring.x += (mouse.x - ring.x) * 0.16;
      ring.y += (mouse.y - ring.y) * 0.16;

      glow.x += (mouse.x - glow.x) * 0.08;
      glow.y += (mouse.y - glow.y) * 0.08;

      const targetRingScale = pressed ? 0.8 : hovering ? 1.65 : 1;
      const targetDotScale = pressed ? 1.5 : hovering ? 0.55 : 1;
      ringScale += (targetRingScale - ringScale) * 0.18;
      dotScale += (targetDotScale - dotScale) * 0.22;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouse.x}px, ${mouse.y}px, 0) translate(-50%, -50%) scale(${dotScale})`;
      }

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0) translate(-50%, -50%) scale(${ringScale})`;
        ringRef.current.style.backgroundColor = hovering
          ? 'rgba(116, 198, 157, 0.16)'
          : 'transparent';
        ringRef.current.style.borderColor = hovering
          ? 'rgba(149, 213, 178, 0.95)'
          : 'rgba(45, 106, 79, 0.75)';
      }

      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${glow.x}px, ${glow.y}px, 0) translate(-50%, -50%)`;
      }

      rafId = window.requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown, { passive: true });
    window.addEventListener('mouseup', handleMouseUp, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    rafId = window.requestAnimationFrame(animate);

    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden" aria-hidden="true">
      {/* Soft Warm Bronze Ambient Spotlight */}
      <div
        ref={glowRef}
        className="fixed left-0 top-0 h-64 w-64 rounded-full opacity-0 transition-opacity duration-300 will-change-transform"
        style={{
          background:
            'radial-gradient(circle, rgba(116, 198, 157, 0.18) 0%, rgba(45, 106, 79, 0.08) 42%, rgba(45, 106, 79, 0) 72%)',
        }}
      />

      {/* Smooth Trailing Bronze Ring */}
      <div
        ref={ringRef}
        className="fixed left-0 top-0 h-9 w-9 rounded-full border border-[#2D6A4F]/75 opacity-0 transition-[opacity,background-color,border-color] duration-200 will-change-transform"
      />

      {/* Precision Gold Cursor Dot */}
      <div
        ref={dotRef}
        className="fixed left-0 top-0 h-2 w-2 rounded-full bg-[#74C69D] opacity-0 shadow-[0_0_10px_rgba(116,198,157,0.85)] transition-opacity duration-200 will-change-transform"
      />

      {/* Tactile Click Ripples */}
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="mouse-click-ripple fixed left-0 top-0 h-10 w-10 rounded-full border border-[#74C69D]/80"
          style={{
            left: `${ripple.x}px`,
            top: `${ripple.y}px`,
          }}
        />
      ))}
    </div>
  );
};
