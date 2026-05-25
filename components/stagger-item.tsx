"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  delay?: number; // ms
  className?: string;
  children: React.ReactNode;
};

export function StaggerItem({ delay = 0, className = "", children }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShown(true);
          obs.disconnect();
        }
      },
      { threshold: 0.25, rootMargin: "0px 0px -60px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`stagger-item ${shown ? "is-shown" : ""} ${className}`}
      style={{ ["--stagger-delay" as string]: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
