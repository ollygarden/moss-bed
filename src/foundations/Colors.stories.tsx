import type { Meta, StoryObj } from '@storybook/react-vite';

/**
 * The Colors story is data-driven from the palette below. Source of truth
 * is `src/tailwind-preset.ts` — if a swatch here ever drifts from what
 * Tailwind actually emits, fix the preset, not this story.
 */

type Swatch = {
  /** Friendly label shown above the swatch */
  name: string;
  /** Tailwind class (e.g. `bg-olly-grey-800`) for documentation only */
  twClass: string;
  /** Literal hex used to paint the swatch — kept in sync with the preset */
  hex: string;
  /** Optional usage note */
  note?: string;
};

type Group = {
  title: string;
  description?: string;
  swatches: Swatch[];
};

const groups: Group[] = [
  {
    title: 'Brand',
    description: 'Primary brand colors used for emphasis and surface.',
    swatches: [
      {
        name: 'Accent',
        twClass: 'bg-olly-accent',
        hex: '#e2e735',
        note: 'Primary accent. Used sparingly — loaders, toggles, highlights.',
      },
      {
        name: 'Dark',
        twClass: 'bg-olly-dark',
        hex: '#24272a',
        note: 'Canvas / base background across the app.',
      },
      {
        name: 'White',
        twClass: 'bg-olly-white',
        hex: '#FFFFFF',
      },
      {
        name: 'Black',
        twClass: 'bg-olly-black',
        hex: '#090A0B',
      },
    ],
  },
  {
    title: 'Greys',
    description:
      'Workhorse neutrals. Cards, borders, dividers, muted text. Lower number = lighter.',
    swatches: [
      { name: 'grey-100', twClass: 'bg-olly-grey-100', hex: '#C1C1C1' },
      { name: 'grey-200', twClass: 'bg-olly-grey-200', hex: '#ABABAB' },
      { name: 'grey-300', twClass: 'bg-olly-grey-300', hex: '#919394' },
      { name: 'grey-400', twClass: 'bg-olly-grey-400', hex: '#7C7D7F' },
      { name: 'grey-500', twClass: 'bg-olly-grey-500', hex: '#66686A' },
      { name: 'grey-600', twClass: 'bg-olly-grey-600', hex: '#555555' },
      { name: 'grey-700', twClass: 'bg-olly-grey-700', hex: '#424242' },
      { name: 'grey-800', twClass: 'bg-olly-grey-800', hex: '#38373A' },
      { name: 'grey-900', twClass: 'bg-olly-grey-900', hex: '#29282B' },
      { name: 'grey-1000', twClass: 'bg-olly-grey-1000', hex: '#090A0B' },
    ],
  },
  {
    title: 'Olly (accent ramp)',
    description:
      'Variations on the accent yellow. `olly-2` is the darker hover state.',
    swatches: [
      { name: 'olly-0', twClass: 'bg-olly-olly-0', hex: '#e2e735' },
      { name: 'olly-1', twClass: 'bg-olly-olly-1', hex: '#e2e735' },
      { name: 'olly-2', twClass: 'bg-olly-olly-2', hex: '#838730' },
      { name: 'olly-3', twClass: 'bg-olly-olly-3', hex: '#e2e735' },
    ],
  },
  {
    title: 'Green',
    description: 'Success states, positive tags, healthy indicators.',
    swatches: [
      { name: 'green-0', twClass: 'bg-olly-green-0', hex: '#8EFF9B' },
      { name: 'green-1', twClass: 'bg-olly-green-1', hex: '#6BD577' },
      { name: 'green-2', twClass: 'bg-olly-green-2', hex: '#509E59' },
      { name: 'green-3', twClass: 'bg-olly-green-3', hex: '#3C7D43' },
    ],
  },
  {
    title: 'Orange',
    description: 'Warning states, pending indicators.',
    swatches: [
      { name: 'orange-0', twClass: 'bg-olly-orange-0', hex: '#F3D79A' },
      { name: 'orange-1', twClass: 'bg-olly-orange-1', hex: '#E7AF35' },
      { name: 'orange-2', twClass: 'bg-olly-orange-2', hex: '#856B30' },
      { name: 'orange-3', twClass: 'bg-olly-orange-3', hex: '#55492D' },
    ],
  },
  {
    title: 'Red',
    description: 'Error states, destructive actions, critical indicators.',
    swatches: [
      { name: 'red-0', twClass: 'bg-olly-red-0', hex: '#F39A9B' },
      { name: 'red-1', twClass: 'bg-olly-red-1', hex: '#E73538' },
      { name: 'red-2', twClass: 'bg-olly-red-2', hex: '#852E31' },
      { name: 'red-3', twClass: 'bg-olly-red-3', hex: '#552B2E' },
    ],
  },
  {
    title: 'Blue',
    description: 'Informational tags / categorical highlights.',
    swatches: [
      { name: 'blue-100', twClass: 'bg-olly-blue-100', hex: '#91B2FF' },
      { name: 'blue-200', twClass: 'bg-olly-blue-200', hex: '#5C8DFF' },
      { name: 'blue-300', twClass: 'bg-olly-blue-300', hex: '#2E57B7' },
      { name: 'blue-500', twClass: 'bg-olly-blue-500', hex: '#1B3165' },
    ],
  },
  {
    title: 'Orchid',
    description: 'Categorical tag palette.',
    swatches: [
      { name: 'orchid-100', twClass: 'bg-olly-orchid-100', hex: '#EAA5FF' },
      { name: 'orchid-200', twClass: 'bg-olly-orchid-200', hex: '#DF74FF' },
      { name: 'orchid-300', twClass: 'bg-olly-orchid-300', hex: '#A02CC4' },
      { name: 'orchid-500', twClass: 'bg-olly-orchid-500', hex: '#681B7F' },
    ],
  },
  {
    title: 'Pink',
    description: 'Categorical tag palette.',
    swatches: [
      { name: 'pink-100', twClass: 'bg-olly-pink-100', hex: '#FF8AC6' },
      { name: 'pink-200', twClass: 'bg-olly-pink-200', hex: '#FF49A7' },
      { name: 'pink-300', twClass: 'bg-olly-pink-300', hex: '#C12D7A' },
      { name: 'pink-500', twClass: 'bg-olly-pink-500', hex: '#661740' },
    ],
  },
  {
    title: 'Purple',
    description: 'Categorical tag palette.',
    swatches: [
      { name: 'purple-100', twClass: 'bg-olly-purple-100', hex: '#D1BAFF' },
      { name: 'purple-200', twClass: 'bg-olly-purple-200', hex: '#B894FF' },
      { name: 'purple-300', twClass: 'bg-olly-purple-300', hex: '#7C45EA' },
      { name: 'purple-500', twClass: 'bg-olly-purple-500', hex: '#34196A' },
    ],
  },
];

type SemanticToken = {
  /** Tailwind class (the shadcn alias) */
  name: string;
  /** Hex resolved from the CSS variable in moss-bed-variables.css */
  hex: string;
  /** What the token is for */
  use: string;
};

const semanticTokens: SemanticToken[] = [
  {
    name: 'background',
    hex: '#090C0E',
    use: 'Default page background. From --background (210 10% 4%).',
  },
  {
    name: 'foreground',
    hex: '#F1F5F9',
    use: 'Default text color on background. From --foreground.',
  },
  { name: 'card', hex: '#21242A', use: 'Card surface. From --card.' },
  {
    name: 'card-foreground',
    hex: '#F1F5F9',
    use: 'Text on card surface.',
  },
  {
    name: 'popover',
    hex: '#21242A',
    use: 'Popover / menu surface.',
  },
  {
    name: 'primary',
    hex: '#F1F5F9',
    use: 'Primary actions (e.g. filled Button).',
  },
  {
    name: 'secondary',
    hex: '#2F343B',
    use: 'Secondary surface.',
  },
  {
    name: 'muted',
    hex: '#2F343B',
    use: 'Muted surface — disabled, dividers.',
  },
  {
    name: 'muted-foreground',
    hex: '#94A3B8',
    use: 'Muted text.',
  },
  {
    name: 'accent',
    hex: '#E2E735',
    use: 'Accent surface. From --accent (62 80% 56%).',
  },
  {
    name: 'destructive',
    hex: '#7A1F1F',
    use: 'Destructive action background.',
  },
  {
    name: 'border',
    hex: '#2F343B',
    use: 'Default border color.',
  },
  {
    name: 'input',
    hex: '#2F343B',
    use: 'Form input border.',
  },
  {
    name: 'ring',
    hex: '#E2E735',
    use: 'Focus ring color.',
  },
];

function Swatch({ swatch }: { swatch: Swatch }) {
  // Heuristic for whether to put the hex label on a dark or light chip
  // background — matches what the design system would do internally.
  const isDark =
    swatch.hex.toLowerCase() === '#090a0b' ||
    swatch.hex.toLowerCase() === '#24272a' ||
    swatch.hex.toLowerCase().startsWith('#0') ||
    swatch.hex.toLowerCase().startsWith('#1') ||
    swatch.hex.toLowerCase().startsWith('#2') ||
    swatch.hex.toLowerCase().startsWith('#3');

  return (
    <div className="flex flex-col rounded-[12px] overflow-hidden border border-olly-grey-800">
      <div
        className="h-20 flex items-end justify-end p-2"
        style={{ backgroundColor: swatch.hex }}
      >
        <code
          className="text-[10px] font-mono px-1.5 py-0.5 rounded"
          style={{
            backgroundColor: isDark
              ? 'rgba(255,255,255,0.12)'
              : 'rgba(0,0,0,0.18)',
            color: isDark ? '#f1f5f9' : '#090A0B',
          }}
        >
          {swatch.hex}
        </code>
      </div>
      <div className="px-3 py-2 bg-olly-grey-900">
        <div className="text-xs font-semibold text-white">{swatch.name}</div>
        <div className="text-[10px] font-mono text-olly-grey-300 truncate">
          {swatch.twClass}
        </div>
        {swatch.note && (
          <div className="mt-1 text-[10px] text-olly-grey-200">
            {swatch.note}
          </div>
        )}
      </div>
    </div>
  );
}

function PaletteSection({ group }: { group: Group }) {
  return (
    <section className="space-y-3">
      <header>
        <h3 className="text-white text-lg font-semibold">{group.title}</h3>
        {group.description && (
          <p className="text-sm text-olly-grey-200">{group.description}</p>
        )}
      </header>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {group.swatches.map((s) => (
          <Swatch key={s.twClass} swatch={s} />
        ))}
      </div>
    </section>
  );
}

const PaletteGrid = () => (
  <div className="space-y-8 p-6 bg-olly-dark text-white min-h-screen">
    <header className="space-y-2">
      <h1 className="text-3xl font-bold text-white">Color palette</h1>
      <p className="text-sm text-olly-grey-200 max-w-2xl">
        Every color exposed by the moss-bed Tailwind preset. Source of truth is{' '}
        <code className="text-xs bg-olly-grey-900 px-1.5 py-0.5 rounded">
          src/tailwind-preset.ts
        </code>
        . Use the Tailwind class shown under each swatch.
      </p>
    </header>
    {groups.map((g) => (
      <PaletteSection key={g.title} group={g} />
    ))}
  </div>
);

const SemanticTokens = () => (
  <div className="space-y-4 p-6 bg-olly-dark text-white min-h-screen">
    <header className="space-y-2">
      <h1 className="text-3xl font-bold text-white">Semantic tokens</h1>
      <p className="text-sm text-olly-grey-200 max-w-2xl">
        shadcn-style design tokens backed by CSS variables. Components use these
        (e.g. <code className="text-xs">bg-card</code>,{' '}
        <code className="text-xs">text-muted-foreground</code>) so theming works
        through a single token surface.
      </p>
    </header>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
      {semanticTokens.map((t) => (
        <div
          key={t.name}
          className="flex items-center gap-3 p-3 rounded-[10px] border border-olly-grey-800 bg-olly-grey-900"
        >
          <div
            className="w-10 h-10 rounded-md shrink-0 border border-olly-grey-700"
            style={{ backgroundColor: t.hex }}
          />
          <div className="min-w-0 flex-1">
            <div className="flex items-baseline gap-2">
              <code className="text-sm font-semibold text-white">{t.name}</code>
              <code className="text-[10px] font-mono text-olly-grey-300">
                {t.hex}
              </code>
            </div>
            <div className="text-xs text-olly-grey-200">{t.use}</div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const meta = {
  title: 'Foundations/Colors',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Full color palette and semantic token reference. Source of truth: src/tailwind-preset.ts and src/moss-bed-variables.css.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Palette: Story = {
  render: () => <PaletteGrid />,
};

export const Semantic: Story = {
  render: () => <SemanticTokens />,
};
