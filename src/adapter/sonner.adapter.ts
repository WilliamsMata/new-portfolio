/* eslint-disable @typescript-eslint/no-explicit-any */
import { toast } from "sonner";

interface ToastOptions {
  position?:
    | "top-center"
    | "top-left"
    | "top-right"
    | "bottom-center"
    | "bottom-left"
    | "bottom-right";
  duration?: number;
  theme?: "light" | "dark";
  pauseOnHover?: boolean;
  draggable?: boolean;
  progress?: boolean;
  closeOnClick?: boolean;
  hideProgressBar?: boolean;
  autoClose?: boolean;
  transition?: any;
  rtl?: boolean;
}

export class Toaster {
  static success(message: string, options?: ToastOptions) {
    toast.success(message, options);
  }

  static error(message: string, options?: ToastOptions) {
    toast.error(message, options);
  }
}
