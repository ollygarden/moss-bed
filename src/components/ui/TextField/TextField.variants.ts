import { cva } from 'class-variance-authority';

export const textFieldVariants = cva(
  'flex w-full border-0 bg-transparent text-white placeholder:text-olly-grey-400 focus:outline-none focus-visible:outline-none focus:ring-0 focus:shadow-none focus:border-0 focus:ring-offset-0 [&:focus]:outline-none [&:focus]:ring-0 [&:focus]:shadow-none [&:focus]:border-0 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200',
  {
    variants: {
      size: {
        default: 'h-16 py-2',
        search: 'h-10 py-2',
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
