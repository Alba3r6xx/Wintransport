import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { format } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number) {
  return `GH₵ ${amount.toFixed(2)}`;
}

export function formatDate(iso: string) {
  return format(new Date(iso), "MMM d, yyyy");
}

export function formatTime(iso: string) {
  return format(new Date(iso), "h:mm a");
}

export function formatDateTime(iso: string) {
  return format(new Date(iso), "MMM d, yyyy · h:mm a");
}
