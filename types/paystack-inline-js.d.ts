/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
declare module "@paystack/inline-js" {
  interface PaystackOptions {
    key?: string;
    email?: string;
    amount?: number;
    ref?: string;
    onClose?: () => void;
    onSuccess?: (response: any) => void;
    callback?: (response: any) => void;
    onError?: (error: any) => void;
    onCancel?: () => void;
  }

  interface PaystackInstance {
    openIframe(): void;
    resumeTransaction(accessCode: string): void;
    checkout(options: PaystackOptions): void;
  }

  // Update the PaystackPop class to correctly return a PaystackInstance from setup
  class PaystackPop {
    static setup(options: PaystackOptions): PaystackInstance;
    constructor(options: PaystackOptions);
    openIframe(): void;
    resumeTransaction(accessCode: string): void;
    checkout(options: PaystackOptions): void;
  }

  export = PaystackPop;
}
