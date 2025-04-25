import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function formatDateToReadable(dateString: string): string {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  return date.toLocaleDateString('en-US', options);
}

export function removeEmpty<T extends object>(obj: T) {
  return Object.fromEntries(
    Object.entries(obj).filter(([_, v]) => _ && v != null && v !== '')
  );
}
