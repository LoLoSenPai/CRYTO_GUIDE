"use client";

import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";
 
interface HoverLinkPreviewProps {
  href: string;
  previewImage: string;
  imageAlt?: string;
  children: React.ReactNode;
}
 
const HoverLinkPreview: React.FC<HoverLinkPreviewProps> = ({
  href,
  previewImage,
  imageAlt = "Link preview",
  children,
}) => {
  const [showPreview, setShowPreview] = useState(false);
  const [mounted, setMounted] = useState(false);
  const prevX = useRef<number | null>(null);
 
  // Motion values for smooth animation
  const motionTop = useMotionValue(0);
  const motionLeft = useMotionValue(0);
  const motionRotate = useMotionValue(0);
 
  // Springs for natural movement
  const springRotate = useSpring(motionRotate, { stiffness: 300, damping: 20 });
 
  // Handlers
  const PREVIEW_WIDTH = 240;
  const PREVIEW_HEIGHT = 140;
  const OFFSET = 30;
  const EDGE = 8;

  useEffect(() => {
    setMounted(true);
  }, []);

  const updatePositionFromPoint = (x: number, y: number) => {
    let top = y - PREVIEW_HEIGHT / 2;
    top = Math.max(EDGE, Math.min(top, window.innerHeight - PREVIEW_HEIGHT - EDGE));
    let left = x + OFFSET;
    if (left + PREVIEW_WIDTH > window.innerWidth - EDGE) {
      left = x - PREVIEW_WIDTH - OFFSET;
    }
    left = Math.max(EDGE, Math.min(left, window.innerWidth - PREVIEW_WIDTH - EDGE));
    motionTop.set(top);
    motionLeft.set(left);
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    prevX.current = null;
    const x = e.clientX;
    const y = e.clientY;
    updatePositionFromPoint(x, y);
    motionRotate.set(0);
    springRotate.set(0);
    setShowPreview(true);
  };
 
  const handleMouseLeave = () => {
    setShowPreview(false);
    prevX.current = null;
    motionRotate.set(0);
  };
 
  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    updatePositionFromPoint(e.clientX, e.clientY);
    if (prevX.current !== null) {
      const deltaX = e.clientX - prevX.current;
      const newRotate = Math.max(-10, Math.min(10, deltaX * 0.6));
      motionRotate.set(newRotate);
    }
    prevX.current = e.clientX;
  };
 
  return (
    <>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="relative inline-block cursor-pointer"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
      >
        {children}
      </a>
 
      {mounted
        ? createPortal(
            <AnimatePresence>
              {showPreview && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: -10, rotate: 0 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: -10, rotate: 0 }}
                  style={{
                    position: "fixed",
                    top: motionTop,
                    left: motionLeft,
                    rotate: springRotate,
                    zIndex: 50,
                    pointerEvents: "none"
                  }}
                >
                  <div className="rounded-2xl border border-white/10 bg-night-900/90 p-2 shadow-2xl backdrop-blur">
                    <img
                      src={previewImage}
                      alt={imageAlt}
                      draggable={false}
                      className="h-[140px] w-[240px] rounded-xl object-cover"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>,
            document.body
          )
        : null}
    </>
  );
};
 
export { HoverLinkPreview };
