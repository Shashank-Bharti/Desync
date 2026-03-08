"use client"
import Image from "next/image";
import { DitherBackground, DEFAULT_CONFIG, type DitherConfig } from "../components/dither-background";
import { useState } from "react";
import { Header } from "../components/header";


export default function Home() {
  const [config, setConfig] = useState<DitherConfig>({ ...DEFAULT_CONFIG });
  return (
   <div className="flex items-center justify-center w-full h-screen bg-zinc-900 absolute bottom-0 left-0 right-0 top-0 bg-[image:repeating-linear-gradient(315deg,_var(--pattern-fg)_0,_var(--pattern-fg)_1px,_transparent_0,_transparent_50%)] bg-[size:12px_12px] bg-fixed [--pattern-fg:var(--color-zinc-800)]/50">
      <Header/>
      <div className="relative max-w-3xl border-2 border-zinc-700 bg-zinc-900 border-y-0 border-dashed w-full h-full overflow-hidden">
        <DitherBackground config={config} />
        
      </div>
    </div>
  );
}
