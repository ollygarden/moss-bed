import { cva } from 'class-variance-authority';

export const cardVariants = cva('text-card-foreground', {
  variants: {
    variant: {
      default: 'bg-olly-grey-800 rounded-[20px]',
      vertical:
        'bg-olly-grey-800 overflow-hidden flex flex-col rounded-[20px] border border-transparent',
      horizontal: 'bg-olly-grey-800 flex items-stretch p-0 rounded-[10px]',
      elevated: 'bg-olly-grey-900 shadow-xl rounded-[20px]',
      transparent: 'bg-transparent border-0 rounded-none',
      insight: 'bg-olly-grey-900 shadow-lg rounded-[20px]',
      settings: 'bg-olly-grey-800 border border-white/10 rounded-[20px]',
      glass: 'bg-olly-grey-900 border border-white/10 rounded-[16px]',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});
