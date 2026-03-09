"use client";
import { useState } from "react";
import {
  DitherBackground,
  DitherConfig,
  DEFAULT_CONFIG,
} from "../dither-background";
import { ArrowUpRight } from "lucide-react";
import { TypewriterEffect } from "../typewriter-effect";

export function Hero() {
  const [config, setConfig] = useState<DitherConfig>({ ...DEFAULT_CONFIG });
  return (
    <div className="relative max-w-3xl flex items-center justify-center border-2 border-zinc-700 bg-zinc-900 border-y-0 border-dashed w-full h-full overflow-hidden">
      <InnerContent />
      <DitherBackground config={config} />
    </div>
  );
}

function InnerContent() {
  const texts = ["Conversations", "Experiences", "Expressions"];
  return (
    // Main inner content wrapper
    <div className="relative z-999 flex -mt-8 flex-col p-2 items-center gap-3 ">
      {/* Hero Text */}
      <div className="flex-col flex mb-2 lg:mb-4 items-center justify-center text-[32px] leading-tight lg:text-5xl tracking-tight gap-1">
        <span className="inline-flex text-center text-green-500 font-light text-xs lg:text-sm mb-2 bg-zinc-800/50 ring ring-zinc-700 px-2 backdrop-blur-md shadow-md shadow-zinc-950  tracking-normal py-1">
        Privately</span>
        <span className="inline-flex  text-white font-semibold">Syncing</span>
        <TypewriterEffect
          className="text-green-500 text-[32px] lg:text-5xl font-semibold"
          texts={texts}
        />
      </div>
      {/* Create Room */}
      <div className="lg:flex-row flex flex-col hover:ring tracking-tight ring-zinc-800 bg-zinc-950 relative text-sm items-center">
        <div className="inline-flex  w-full">
          <label
            htmlFor="session-id"
            className="bg-zinc-950 text-green-500 pl-4 py-4"
          >
            $
          </label>
          <input
            type="text"
            id="session-id"
            name="session-id-input"
            className="px-3 py-4  bg-zinc-950 outline-0 "
            placeholder="enter session id"
          />
        </div>
        <button className="flex items-center justify-center text-center px-8 gap-2 hover:bg-green-600  bg-green-500 py-3.5 w-full">
          <span className="translate-y-0.5">Connect</span>
          <ArrowUpRight strokeWidth={1.2} />
        </button>
      </div>
      {/* Info */}
      <p className="text-[10px] lg:text-xs text-zinc-300 px-11 text-center text-shadow-md text-shadow-zinc-950">//  swipe up to initialize a new session</p>
    </div>
  );
}
