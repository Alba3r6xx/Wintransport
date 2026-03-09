import Image from "next/image";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  dark?: boolean;
}

export default function Logo({ className, dark }: LogoProps) {
  return (
    <Image
      src="/newlogo.png"
      alt="WinTransport"
      width={160}
      height={160}
      className={cn(
        "w-14 h-14 sm:w-16 sm:h-16 object-contain",
        dark && "brightness-0",
        className
      )}
      priority
    />
  );
}
