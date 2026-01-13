import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility function to merge Tailwind CSS classes
 * Combines clsx for conditional classes and tailwind-merge for conflict resolution
 *
 * @param inputs - Class names or conditional class objects
 * @returns Merged class string
 *
 * @example
 * cn('px-2 py-1', condition && 'bg-blue-500')
 * cn({ 'text-red-500': isError, 'text-green-500': isSuccess })
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
