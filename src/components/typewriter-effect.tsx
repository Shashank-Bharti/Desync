"use client";

import { useState, useEffect, useRef } from "react";
import { motion, Variants } from "motion/react";


export interface TypewriterProps {
 texts: string[];
 className: string;     
}

const LETTER_DELAY = 0.055;
const BOX_FADE_DURATION = 0.125;
const FADE_DELAY = 5;
const MAIN_FADE_DURATION = 0.35;
const SWAP_DELAY_IN_MS = 6500;

export function TypewriterEffect({texts,className }:TypewriterProps)  {
  const [exampleIndex, setExampleIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setExampleIndex((pv) => (pv + 1) % texts.length);
    }, SWAP_DELAY_IN_MS);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <p className={` ${className} font-light`}>
      <span className="">
        {" "}
        {texts[exampleIndex].split("").map((l, i) => {
          const totalChars = texts[exampleIndex].length;
          return (
          <motion.span
            initial={{
              opacity: 1,
            }}
            animate={{
              opacity: 0,
            }}
            transition={{
              delay: FADE_DELAY + (totalChars - 1 - i) * LETTER_DELAY,
              duration: MAIN_FADE_DURATION,
              ease: "easeInOut",
            }}
            key={`${exampleIndex}-${i}`}
            className="relative"
          >
            <motion.span
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                delay: i * LETTER_DELAY,
                duration: 0,
              }}
            >
              {l}
            </motion.span>
            
            <motion.span
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: [0, 1, 0],
              }}
              transition={{
                delay: i * LETTER_DELAY,
                times: [0, 0.1, 1],
                duration: BOX_FADE_DURATION,
                ease: "easeInOut",
            }}
            className="absolute bottom-0.75 left-px right-0 top-0.75 bg-green-500"
            />
            {/* Exit cursor — flashes as each char is removed in reverse */}
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{
                delay: FADE_DELAY + (totalChars - 1 - i) * LETTER_DELAY,
                times: [0, 0.1, 1],
                duration: BOX_FADE_DURATION,
                ease: "easeInOut",
              }}
              className="absolute bottom-0.75 left-px right-0 top-0.75 bg-green-500"
            />
          </motion.span>
          );
        })}
      </span>
    </p>
  );
};
