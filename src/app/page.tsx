"use client"
import Image from "next/image";
import { DitherBackground, DEFAULT_CONFIG, type DitherConfig } from "../components/dither-background";
import { useState } from "react";
import { Header } from "../components/header";
import { Hero } from "@/components/Hero/hero";


export default function Home() {

  return (
   <main className="flex items-center justify-center w-full h-screen bg-zinc-900 absolute bottom-0 left-0 right-0 top-0 bg-[image:repeating-linear-gradient(315deg,_var(--pattern-fg)_0,_var(--pattern-fg)_1px,_transparent_0,_transparent_50%)] bg-[size:12px_12px] bg-fixed [--pattern-fg:var(--color-zinc-800)]/50">
      <Header/>
      <Hero/>
    </main>
  );
}
