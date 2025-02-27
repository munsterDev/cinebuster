'use client'
import Image from "next/image";
import { useTheme } from "next-themes";
import React from "react";

const Logo = () => {
  return (
    <Image
      src="site_logo_dark"
      alt="Site Logo"
      width={100}
      height={100}
      className="relative"
      />
  );
};

export default Logo;