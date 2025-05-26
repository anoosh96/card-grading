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


export function padId(id: number | string, length = 4) {
  return String(id).padStart(length, '0');
}


export function formatToUSTimezone(utcDateStr: string, timeZone = 'America/New_York') {
  if (utcDateStr == '') {
    return '';
  }
  
  const date = new Date(utcDateStr);

  return new Intl.DateTimeFormat('en-US', {
    timeZone,
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  }).format(date);
}


export function FormatCase(str: string): string {
  const result = str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  return result
}