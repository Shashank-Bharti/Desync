"use client";
import {motion} from "motion/react"
import Image from "next/image";
import MicOff from "../../../public/icons/mic_off.svg";
import AudioOn from "../../../public/icons/audio_on.svg";
import CopyIcon from "../../../public/icons/copy.svg";

export function ChatScreen() {
  return (
    <motion.div  className="absolute flex-col  h-screen w-full flex justify-center z-999  items-start  max-w-3xl">
      {/*Top Buffer Bridge */}
      <div className=" px-5 py-7 w-full" />
      {/* Main Chat-Box */}
      <div className="h-full w-full ">
        {/* Handle */}
        <div className="w-full flex justify-center items-center">
          <span className="flex flex-col px-2 py-2 translate-y-1 gap-1 bg-zinc-950">
            <span className="py-[0.7px] px-8 bg-zinc-500" />
            <span className="py-[0.7px] px-8 bg-zinc-500" />
          </span>
        </div>
        {/* Information and Control Bar */}
        <div className="flex w-full flex-col py-4 text-sm px-6 border-t border-zinc-800 bg-zinc-950">
          {/* Top */}
          <div className="flex items-center w-full border-b pb-4 border-zinc-800 justify-between">
            {/* Chat progess */}
            <span className="inline-flex items-center text-green-500">
              <p className="inline-flex items-center justify-center ">$ Id :</p>
              {/* username */}
              <p className="text-zinc-400  px-2">
                 anonymous-iguana-458f4A2
              </p>
            </span>
            {/* End Controls */}
            <span className="inline-flex gap-4">
              <span className="inline-flex gap-4 px-2 border-r border-zinc-500">
                <button className="cursor-pointer">
                    <Image alt="audio button" width={19} src={AudioOn} />
                </button>
                <button className="cursor-pointer">
                    <Image alt="audio button" width={19} src={MicOff} />
                </button>
              </span>
              <button className="px-4 text-center text-green-50 tracking-tight cursor-pointer hover:bg-green-600  bg-green-500 border border-green-300">
                Initiate
              </button>
            </span>
          </div>
          {/* Bottom */}
          <div className="flex items-center pt-4 justify-between">
            <span className="inline-flex gap-4 items-center text-zinc-400">
              <p className="inline-flex items-center  ">// Session Id :</p>
              {/* username */}
              <p className="text-zinc-400">
                 465465df
              </p>
              <button className="inline-flex gap-3 bg-zinc-900 hover:bg-zinc-800 ring ring-zinc-600 px-2 py-1 text-xs items-center uppercase">
                <Image src={CopyIcon} width={14} alt="copy icon"/>
                {"Copy"}
              </button>
            </span>
            {/* Time elapsed */}
            <div className="flex gap-2">
                

            </div>
          </div>
        </div>
        {/* TODO:Conversation Box */}

        {/* TODO: Absolute Control and Inputs */}
      </div>
    </motion.div>
  );
}
