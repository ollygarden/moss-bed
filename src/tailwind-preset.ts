/**
 * moss-bed Tailwind CSS preset
 *
 * Provides the olly color palette and design tokens required by moss-bed components.
 *
 * Usage in consumer's tailwind.config.ts:
 *
 *   import { mossBedPreset } from 'moss-bed/tailwind-preset';
 *   export default { presets: [mossBedPreset], ... }
 *
 * Consumers must also import the CSS variables file:
 *
 *   import 'moss-bed/styles';
 */

export const mossBedPreset = {
  darkMode: 'class' as const,
  theme: {
    extend: {
      fontFamily: {
        sans: ['Space Grotesk', 'system-ui', 'sans-serif'],
        mono: [
          'ui-monospace',
          'SFMono-Regular',
          'Menlo',
          'Monaco',
          'Consolas',
          'Liberation Mono',
          'Courier New',
          'monospace',
        ],
      },
      colors: {
        // shadcn/ui semantic tokens (require CSS variables from moss-bed/styles)
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        // Olly brand palette
        olly: {
          accent: '#e2e735',
          dark: '#24272a',
          olly: {
            0: '#e2e735',
            1: '#e2e735',
            2: '#838730',
            3: '#e2e735',
          },
          green: {
            0: '#8EFF9B',
            1: '#6BD577',
            2: '#509E59',
            3: '#3C7D43',
          },
          orange: {
            0: '#F3D79A',
            1: '#E7AF35',
            2: '#856B30',
            3: '#55492D',
          },
          red: {
            0: '#F39A9B',
            1: '#E73538',
            2: '#852E31',
            3: '#552B2E',
          },
          white: '#FFFFFF',
          black: '#090A0B',
          grey: {
            100: '#C1C1C1',
            200: '#ABABAB',
            300: '#919394',
            400: '#7C7D7F',
            500: '#66686A',
            600: '#555555',
            700: '#424242',
            800: '#38373A',
            900: '#29282B',
            1000: '#090A0B',
          },
          blue: {
            100: '#91B2FF',
            200: '#5C8DFF',
            300: '#2E57B7',
            500: '#1B3165',
          },
          orchid: {
            100: '#EAA5FF',
            200: '#DF74FF',
            300: '#A02CC4',
            500: '#681B7F',
          },
          pink: {
            100: '#FF8AC6',
            200: '#FF49A7',
            300: '#C12D7A',
            500: '#661740',
          },
          purple: {
            100: '#D1BAFF',
            200: '#B894FF',
            300: '#7C45EA',
            500: '#34196A',
          },
        },
      },
      zIndex: {
        base: '0',
        sticky: '10',
        dropdown: '40',
        overlay: '50',
        toast: '60',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'skeleton-glow': {
          '0%, 100%': {
            backgroundColor: '#424242',
            boxShadow: '0 0 0 0 rgba(226, 231, 53, 0)',
          },
          '50%': {
            backgroundColor: '#555555',
            boxShadow: '0 0 10px 1px rgba(226, 231, 53, 0.05)',
          },
        },
        'loader-snake-travel': {
          '0%': { strokeDashoffset: '0' },
          '100%': { strokeDashoffset: 'calc(-1 * var(--total-path-length))' },
        },
      },
      animation: {
        'skeleton-glow': 'skeleton-glow 3s ease-in-out infinite',
        'loader-snake-travel': 'loader-snake-travel 4s linear infinite',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
};

/**
 * CSS custom properties required by moss-bed components.
 * These define the shadcn/ui semantic color tokens.
 * Import 'moss-bed/styles' for pre-built CSS that includes these.
 */
export const cssVariables = {
  '--background': '210 10% 4%',
  '--foreground': '210 40% 98%',
  '--card': '214 7% 14%',
  '--card-foreground': '210 40% 98%',
  '--popover': '214 7% 14%',
  '--popover-foreground': '210 40% 98%',
  '--primary': '210 40% 98%',
  '--primary-foreground': '214 7% 14%',
  '--secondary': '215 7% 20%',
  '--secondary-foreground': '210 40% 98%',
  '--muted': '215 7% 20%',
  '--muted-foreground': '215 20% 65%',
  '--accent': '62 80% 56%',
  '--accent-foreground': '214 7% 14%',
  '--destructive': '0 62% 30%',
  '--destructive-foreground': '210 40% 98%',
  '--border': '215 7% 20%',
  '--input': '215 7% 20%',
  '--ring': '62 80% 56%',
  '--radius': '0.5rem',
} as const;
