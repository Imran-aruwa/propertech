import { PAYSTACK_PUBLIC_KEY } from "./constants";

declare global {
  interface Window {
    PaystackPop: any;
  }
}

export interface PaystackConfig {
  email: string;
  amount: number;
  reference: string;
  publicKey: string;
  onClose?: () => void;
  onSuccess?: (reference: any) => void;
}

export function loadPaystackScript() {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "https://js.paystack.co/v1/inline.js";
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => reject(new Error("Failed to load Paystack"));
    document.body.appendChild(script);
  });
}

export async function initiatePayment(config: PaystackConfig) {
  try {
    await loadPaystackScript();
    
    if (!window.PaystackPop) {
      throw new Error("Paystack not loaded");
    }

    const handler = window.PaystackPop.setup({
      key: PAYSTACK_PUBLIC_KEY,
      email: config.email,
      amount: config.amount * 100, // Convert to kobo
      ref: config.reference,
      onClose: config.onClose || (() => {}),
      onSuccess: config.onSuccess || (() => {}),
    });

    handler.openIframe();
  } catch (error) {
    console.error("Payment error:", error);
    throw error;
  }
}
