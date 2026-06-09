import type { Config } from 'tailwindcss';
import mossBedPreset from './src/tailwind-preset';

export default {
  presets: [mossBedPreset],
  darkMode: 'class',
  content: ['./src/**/*.{ts,tsx,mdx}', './.storybook/**/*.{ts,tsx}'],
} satisfies Config;
