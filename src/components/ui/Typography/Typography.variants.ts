import { cva } from 'class-variance-authority';

export const typographyVariants = cva('', {
  variants: {
    variant: {
      h1: '',
      h2: '',
      h3: '',
      h4: '',
      subtitle1: '',
      subtitle2: '',
      body: '',
      bodySmall: '',
      footnote: '',
      caption: '',
      link: 'cursor-pointer text-white hover:text-olly-grey-200 transition-colors duration-200',
    },
    color: {
      white: 'text-white',
      muted: 'text-white/70',
      accent: 'text-olly-accent',
    },
  },
  defaultVariants: {
    variant: 'body',
    color: 'white',
  },
});
