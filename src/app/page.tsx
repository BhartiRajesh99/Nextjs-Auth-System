"use client";
import { MaskContainer } from "@/components/ui/svg-mask-effect";
export default function Home() {
  return (
    <div className="flex h-screen w-full items-center justify-center overflow-hidden">
      <MaskContainer
        revealText={
          <p className="mx-auto w-7xl text-center text-4xl font-bold text-slate-800 dark:text-white">
            Welcome To Nextjs Authentication System
          </p>
        }
        className="h-[40rem] rounded-md border text-white dark:text-black"
      >
        Discover the power of{" "}
        <span className="text-blue-500">Nextjs</span> with <span className="text-blue-500">Tailwind CSS </span>
         and <span className="text-blue-500">Aceternity UI</span> with{" "}
        <span className="text-blue-500">advanced animations</span>.
      </MaskContainer>
    </div>
  );
}
