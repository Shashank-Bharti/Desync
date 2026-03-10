"use client";
import Image from "next/image";
import githubIcon from "../../public/icons/github.svg";
import infoIcon from "../../public/icons/info.svg";
import Link from "next/link";
export function Header() {
  return (
    <div className="w-full lg:px-6 py-5 px-5 text-2xl bg-linear-to-b from-zinc-900 to-transparent  text-green-500 z-9999 max-w-3xl fixed top-0 flex justify-between items-center ">
      <span className="flex items-baseline  gap-2 tracking-tighter">
        Desync
        <span className="text-xs tracking-tighter -translate-y-0.5 px-1 border-zinc-600 border bg-zinc-800">
          V 1.0.0
        </span>
      </span>

      <span className="flex gap-5">
        <Link href={"https://github.com/shashank-bharti"} target="_blank">
          <Image
            width={20}
            src={infoIcon}
            alt="github.com"
            className="hover:opacity-60 duration-150"
          />
        </Link>
        <Link
          href={"https://github.com/shashank-bharti"}
          target="_blank"
          className="hover:opacity-60 duration-150"
        >
          <Image width={20} src={githubIcon} alt="github.com" />
        </Link>
      </span>
    </div>
  );
}
