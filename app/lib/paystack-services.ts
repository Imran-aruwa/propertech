// Paystack Payment Service for PropertyTech

export interface PaystackConfig {
  publicKey: string;
  amount: number; // in kobo (multiply by 100)
  email: string;
  reference: string;
  metadata?: Record<string, any>;
  onSuccess: (response: PaystackResponse) => void;
  onClose: () => void;
}

export interface PaystackResponse {
  reference: string;
  status: string;
  trans: string;
  transaction: string;
  message: string;
  trxref: string;
}

class PaystackService {
  private publicKey: string;
  private isLoaded: boolean = false;

  constructor() {
    this.publicKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY || '';
    
    if (!this.publicKey) {
      console.warn('⚠️ Paystack public key not configured in .env.local');
    }
  }

  /**
   * Load Paystack inline script
   */
  private loadScript(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.isLoaded || typeof window === 'undefined') {
        resolve();
        return;
      }

      // Check if script already exists
      const existingScript = document.getElementById('paystack-inline-script');
      if (existingScript) {
        this.isLoaded = true;
        resolve();
        return;
      }

      // Create and load script
      const script = document.createElement('script');
      script.id = 'paystack-inline-script';
      script.src = 'https://js.paystack.co/v1/inline.js';
      script.async = true;
      
      script.onload = () => {
        this.isLoaded = true;
        resolve();
      };
      
      script.onerror = () => {
        reject(new Error('Failed to load Paystack script'));
      };

      document.body.appendChild(script);
    });
  }

  /**
   * Initialize payment
   */
  async initializePayment(config: PaystackConfig): Promise<void> {
    try {
      // Load Paystack script
      await this.loadScript();

      // Ensure Paystack is available
      if (typeof window === 'undefined' || !(window as any).PaystackPop) {
        throw new Error('Paystack not loaded');
      }

      // Initialize Paystack popup
      const handler = (window as any).PaystackPop.setup({
        key: this.publicKey,
        email: config.email,
        amount: config.amount, // Amount in kobo
        ref: config.reference,
        metadata: config.metadata || {},
        onClose: config.onClose,
        callback: (response: PaystackResponse) => {
          config.onSuccess(response);
        },
      });

      // Open payment popup
      handler.openIframe();
    } catch (error) {
      console.error('Paystack initialization error:', error);
      throw error;
    }
  }

  /**
   * Generate unique payment reference
   */
  generateReference(prefix: string = 'PROP'): string {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000000);
    return `${prefix}-${timestamp}-${random}`;
  }

  /**
   * Convert Naira to Kobo
   */
  toKobo(naira: number): number {
    return Math.round(naira * 100);
  }

  /**
   * Convert Kobo to Naira
   */
  toNaira(kobo: number): number {
    return kobo / 100;
  }

  /**
   * Validate email format
   */
  validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * Check if Paystack is configured
   */
  isConfigured(): boolean {
    return !!this.publicKey && this.publicKey !== 'pk_test_your_paystack_public_key_here';
  }
}

// Export singleton instance
export const paystackService = new PaystackService();