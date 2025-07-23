import { useEffect, useRef } from "react";

export function SplashCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    let isMoving = false;

    const handleMouseMove = (e: MouseEvent) => {
      if (!isMoving) {
        isMoving = true;
        requestAnimationFrame(() => {
          if (cursor) {
            cursor.style.left = e.clientX + "px";
            cursor.style.top = e.clientY + "px";
          }
          isMoving = false;
        });
      }
    };

    const handleMouseLeave = () => {
      if (cursor) {
        cursor.style.opacity = "0";
      }
    };

    const handleMouseEnter = () => {
      if (cursor) {
        cursor.style.opacity = "1";
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, []);

  return <div ref={cursorRef} className="splash-cursor" />;
}
