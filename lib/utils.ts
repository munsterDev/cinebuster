import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getInitials = (name: string) => {
  const nameParts = name.split(' ');
  const firstNameInitial = nameParts[0].charAt(0);
  const lastNameInitial = nameParts[nameParts.length - 1].charAt(0);
  return `${firstNameInitial}${lastNameInitial}`;
}

export const getIdFromKey = (key: string) => {
  return key.split("/")[2];
}

export const hexToRgba = (hex: string, alpha: number) => {
  const [r, g, b] = hex.match(/\w\w/g)!.map((x) => parseInt(x, 16));
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};