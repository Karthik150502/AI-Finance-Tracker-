import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}



/**
 * 
 * @param {number} num - The amount in numbers that has to be converted into human readable string. 
 * @returns {string} - Returns the amount in human readable format, for e.g., 25500 => 25.5K 
 */
export function formatAmount(num: number): string {
  if (num > 1e9) {
    return (num / 1e9).toFixed(1).replace(/\.0$/, "") + "B";
  }
  if (num > 1e6) {
    return (num / 1e6).toFixed(1).replace(/\.0$/, "") + "M";
  }
  if (num > 1e3) {
    return (num / 1e3).toFixed(1).replace(/\.0$/, "") + "K";
  }
  return num.toString();
}



