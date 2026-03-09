"use client";

interface PaystackOptions {
  email: string;
  amount: number;
  reference?: string;
  onSuccess: (reference: string) => void;
  onClose: () => void;
  metadata?: Record<string, unknown>;
}

declare global {
  interface Window {
    PaystackPop?: {
      setup: (config: Record<string, unknown>) => { openIframe: () => void };
    };
  }
}

let scriptLoaded = false;
let scriptLoading = false;
const callbacks: (() => void)[] = [];

function loadPaystackScript(): Promise<void> {
  if (scriptLoaded) return Promise.resolve();
  return new Promise((resolve, reject) => {
    if (scriptLoading) { callbacks.push(resolve); return; }
    scriptLoading = true;
    const script = document.createElement("script");
    script.src = "https://js.paystack.co/v1/inline.js";
    script.async = true;
    script.onload = () => {
      scriptLoaded = true;
      scriptLoading = false;
      resolve();
      callbacks.forEach((cb) => cb());
      callbacks.length = 0;
    };
    script.onerror = () => {
      scriptLoading = false;
      reject(new Error("Failed to load Paystack script"));
    };
    document.head.appendChild(script);
  });
}

function generateReference(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let ref = "WTS-";
  for (let i = 0; i < 10; i++) ref += chars[Math.floor(Math.random() * chars.length)];
  return ref;
}

export async function initiatePaystackPayment(options: PaystackOptions): Promise<void> {
  await loadPaystackScript();
  const publicKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY;
  if (!publicKey || !window.PaystackPop) {
    throw new Error("Paystack not available");
  }
  const handler = window.PaystackPop.setup({
    key: publicKey,
    email: options.email,
    amount: Math.round(options.amount * 100),
    currency: "GHS",
    ref: options.reference || generateReference(),
    metadata: {
      custom_fields: options.metadata
        ? Object.entries(options.metadata).map(([k, v]) => ({
            display_name: k,
            variable_name: k.toLowerCase().replace(/\s/g, "_"),
            value: String(v),
          }))
        : [],
    },
    callback: (response: { reference: string }) => {
      options.onSuccess(response.reference);
    },
    onClose: options.onClose,
  });
  handler.openIframe();
}
