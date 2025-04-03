import { toast } from 'sonner';

export const showToast = {
  success: (message) => {
    toast.success(message, {
      position: 'top-center',
      duration: 3000,
      style: {
        background: 'linear-gradient(to right, #7C3AED, #6D28D9)',
        color: 'white',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: '0 4px 6px -1px rgba(124, 58, 237, 0.2)',
      },
    });
  },
  error: (message) => {
    toast.error(message, {
      position: 'top-center',
      duration: 3000,
      style: {
        background: 'linear-gradient(to right, #DC2626, #B91C1C)',
        color: 'white',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: '0 4px 6px -1px rgba(220, 38, 38, 0.2)',
      },
    });
  },
  warning: (message) => {
    toast.warning(message, {
      position: 'top-center',
      duration: 3000,
      style: {
        background: 'linear-gradient(to right, #F59E0B, #D97706)',
        color: 'white',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: '0 4px 6px -1px rgba(245, 158, 11, 0.2)',
      },
    });
  },
  info: (message) => {
    toast.info(message, {
      position: 'top-center',
      duration: 3000,
      style: {
        background: 'linear-gradient(to right, #4F46E5, #4338CA)',
        color: 'white',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: '0 4px 6px -1px rgba(79, 70, 229, 0.2)',
      },
    });
  }
}; 