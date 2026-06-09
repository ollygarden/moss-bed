import { cva } from 'class-variance-authority';

// Alert variant styles
export const alertVariants = cva(
  'relative rounded-lg p-4 transition-all duration-200',
  {
    variants: {
      variant: {
        success: 'border border-olly-green-0 bg-olly-green-3',
        error: 'border border-olly-red-2 bg-olly-red-3',
        warning: 'border border-olly-orange-1 bg-olly-orange-0/10',
        info: 'border border-olly-blue-200 bg-olly-blue-100/10',
      },
    },
    defaultVariants: {
      variant: 'info',
    },
  }
);
