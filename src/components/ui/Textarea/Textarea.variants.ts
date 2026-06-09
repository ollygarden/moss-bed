import { cva } from 'class-variance-authority';

export const textareaVariants = cva(
  'flex w-full border-0 bg-transparent text-white placeholder:text-olly-grey-400 focus:outline-none focus-visible:outline-none focus:ring-0 focus:shadow-none focus:border-0 focus:ring-offset-0 [&:focus]:outline-none [&:focus]:ring-0 [&:focus]:shadow-none [&:focus]:border-0 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200 resize-none',
  {
    variants: {
      size: {
        default: 'min-h-[120px] py-2',
        small: 'min-h-[80px] py-2',
        large: 'min-h-[160px] py-2',
      },
      state: {
        default: '',
        error: '',
        success: '',
        disabled: 'cursor-not-allowed',
      },
    },
    defaultVariants: {
      size: 'default',
      state: 'default',
    },
  }
);
