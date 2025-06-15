'use client';

import * as React from 'react';
import { toast } from 'sonner';

// Simple wrapper around Sonner for consistent API
export const useToast = () => {
  return {
    toast: {
      // Success toast
      success: (message: string, options?: { description?: string; action?: any }) => {
        return toast.success(message, {
          description: options?.description,
          action: options?.action,
        });
      },

      // Error toast  
      error: (message: string, options?: { description?: string; action?: any }) => {
        return toast.error(message, {
          description: options?.description,
          action: options?.action,
        });
      },

      // Info toast
      info: (message: string, options?: { description?: string; action?: any }) => {
        return toast.info(message, {
          description: options?.description,
          action: options?.action,
        });
      },

      // Warning toast
      warning: (message: string, options?: { description?: string; action?: any }) => {
        return toast.warning(message, {
          description: options?.description,
          action: options?.action,
        });
      },

      // Default toast
      default: (message: string, options?: { description?: string; action?: any }) => {
        return toast(message, {
          description: options?.description,
          action: options?.action,
        });
      },

      // Loading toast
      loading: (message: string, options?: { description?: string }) => {
        return toast.loading(message, {
          description: options?.description,
        });
      },

      // Promise toast (useful for async operations)
      promise: <T>(
        promise: Promise<T>,
        {
          loading,
          success,
          error,
        }: {
          loading: string;
          success: string | ((data: T) => string);
          error: string | ((error: any) => string);
        }
      ) => {
        return toast.promise(promise, {
          loading,
          success,
          error,
        });
      },

      // Custom toast with full control
      custom: (jsx: React.ReactElement, options?: { duration?: number }) => {
        return toast.custom(jsx, options);
      },
    },
    
    // Dismiss specific toast
    dismiss: (toastId?: string | number) => {
      if (toastId) {
        toast.dismiss(toastId);
      } else {
        toast.dismiss();
      }
    },
  };
};

// Direct exports for convenience
export { toast };