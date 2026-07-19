import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

export default function CustomCursor() {
  const [isMobile, setIsMobile] = useState(true);
  const [cursorType, setCursorType] = useState<'default' | 'pointer' | 'view' | 'text'>('default');

  // Mouse coordinates using motion values
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Smooth springs for cursor outer follower
  const springX = useSpring(cursorX, { damping: 30, stiffness: 300, mass: 0.5 });
  const springY = useSpring(cursorY, { damping: 30, stiffness: 300, mass: 0.5 });

  useEffect(() => {
    // Check if device is desktop or supporting pointer precision
    const checkDevice = () => {
      const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      const isNarrow = window.innerWidth < 768;
      setIsMobile(hasTouch || isNarrow);
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);

    // Apply global base cursor styling on desktop
    if (!isMobile) {
      document.body.classList.add('cursor-none-all');
    }

    return () => {
      window.removeEventListener('resize', checkDevice);
      document.body.classList.remove('cursor-none-all');
    };
  }, [isMobile]);

  useEffect(() => {
    if (isMobile) return;

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      // Check key element markers
      const closestInteractive = target.closest('a, button, [role="button"], [data-cursor]');
      
      if (closestInteractive) {
        const cursorAttr = closestInteractive.getAttribute('data-cursor');
        if (cursorAttr === 'view') {
          setCursorType('view');
        } else {
          setCursorType('pointer');
        }
      } else if (target.closest('input, textarea, [contenteditable="true"]')) {
        setCursorType('text');
      } else {
        setCursorType('default');
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [isMobile]);

  if (isMobile) return null;

  // Render variations based on hover type
  const outerVariants = {
    default: {
      width: 32,
      height: 32,
      backgroundColor: 'rgba(30, 64, 175, 0.05)',
      borderColor: 'rgba(30, 64, 175, 0.4)',
      borderWidth: '1.5px',
      borderRadius: '50%',
    },
    pointer: {
      width: 56,
      height: 56,
      backgroundColor: 'rgba(30, 64, 175, 0.1)',
      borderColor: 'rgba(15, 23, 42, 0.8)',
      borderWidth: '1px',
      borderRadius: '50%',
    },
    view: {
      width: 72,
      height: 72,
      backgroundColor: 'rgba(15, 23, 42, 0.95)',
      borderColor: 'rgba(15, 23, 42, 1)',
      borderWidth: '0px',
      borderRadius: '50%',
    },
    text: {
      width: 4,
      height: 24,
      backgroundColor: 'rgba(15, 23, 42, 0.8)',
      borderColor: 'rgba(0, 0, 0, 0)',
      borderWidth: '0px',
      borderRadius: '2px',
    }
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999]">
      {/* Outer Follower Ring */}
      <motion.div
        className="absolute -translate-x-1/2 -translate-y-1/2 flex items-center justify-center overflow-hidden border"
        style={{
          left: springX,
          top: springY,
        }}
        animate={cursorType}
        variants={outerVariants}
        transition={{ type: 'spring', stiffness: 400, damping: 28 }}
      >
        {cursorType === 'view' && (
          <span className="text-[10px] font-mono font-medium tracking-widest text-white animate-fade-in">
            VIEW
          </span>
        )}
      </motion.div>

      {/* Inner Pinpoint Dot (only visible in default/pointer states to avoid clutter) */}
      {cursorType !== 'text' && cursorType !== 'view' && (
        <motion.div
          className="absolute w-2 h-2 bg-accent rounded-full -translate-x-1/2 -translate-y-1/2 shadow-sm"
          style={{
            left: cursorX,
            top: cursorY,
          }}
          animate={{
            scale: cursorType === 'pointer' ? 0.5 : 1,
            backgroundColor: cursorType === 'pointer' ? '#0F172A' : '#1E40AF',
          }}
          transition={{ duration: 0.15 }}
        />
      )}
    </div>
  );
}
