import { cva } from 'class-variance-authority';

export const tagVariants = cva(
  'inline-flex items-center rounded-full transition-colors',
  {
    variants: {
      color: {
        default: 'bg-olly-olly-1 text-olly-black border border-olly-olly-1',
        green: 'bg-olly-green-1 text-olly-black border border-olly-green-1',
        orange: 'bg-olly-orange-1 text-olly-black border border-olly-orange-1',
        red: 'bg-olly-red-1 text-olly-black border border-olly-red-1',
        yellow: 'bg-olly-olly-2 text-olly-black border border-olly-olly-2',
        grey: 'bg-olly-grey-700 text-olly-grey-100 border border-olly-grey-700',
        blue: 'bg-olly-blue-200 text-olly-black border border-olly-blue-200',
        orchid:
          'bg-olly-orchid-200 text-olly-black border border-olly-orchid-200',
        pink: 'bg-olly-pink-200 text-olly-black border border-olly-pink-200',
        purple:
          'bg-olly-purple-200 text-olly-black border border-olly-purple-200',
        monochrome1: 'bg-olly-grey-900 text-olly-white border border-white/10',
        monochrome2: 'bg-olly-grey-800 text-olly-white border border-white/20',
        monochrome3: 'bg-olly-grey-700 text-olly-white border border-white/30',
        monochrome4: 'bg-olly-grey-600 text-olly-white border border-white/40',
        monochromeCritical:
          'bg-olly-black text-olly-white border border-white shadow-[0_4px_12px_rgba(0,0,0,0.5)]',
        monochromeHigh:
          'bg-olly-grey-900 text-white/80 border border-white/80 shadow-[0_3px_8px_rgba(0,0,0,0.35)]',
        monochromeMedium:
          'bg-olly-grey-800 text-white/60 border border-white/60 shadow-[0_2px_4px_rgba(0,0,0,0.2)]',
        accent:
          'bg-olly-accent/10 text-olly-accent hover:bg-olly-accent/20 border border-olly-accent/30',
      },
      size: {
        default: 'px-3 py-1',
        small: 'px-3 py-2',
        custom: 'px-3 py-1', // Base size, can be overridden with className
      },
    },
    defaultVariants: {
      color: 'default',
      size: 'default',
    },
  }
);
