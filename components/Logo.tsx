'use client'
import Image from "next/image";
import { useTheme } from "next-themes";
import React from "react";

const Logo = () => {
  const { theme } = useTheme(); // Detect theme mode

  return (
    <div
      className={`flex items-center justify-center ${
        theme === "dark" ? "bg-transparent" : "bg-gray-100"
      } rounded-lg p-2`}
    >
      <Image
        src="https://github.com/munsterDev/cinebuster/blob/main/public/site_logo.png?raw=true"
        alt="Site Logo"
        width={200} // Reduced size for a slimmer look
        height={200}
        className="object-contain drop-shadow-lg"
      />
    </div>
  );
};

export default Logo;