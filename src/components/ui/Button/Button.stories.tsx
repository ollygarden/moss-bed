import type { Meta, StoryObj } from '@storybook/react-vite';
import Button from './index';

const meta: Meta<typeof Button> = {
  title: 'Button',
  component: Button,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      // Full set defined in Button.variants. Most petal usage today is
      // `ghost`, `filled`, `text`, `pill` and `arrow`; the remaining
      // variants are listed so the design team can see what's available
      // at the surface and decide whether to keep them.
      // `accent` (yellow) is omitted on purpose — the app doesn't use
      // yellow buttons; exposing it in the playground was misleading.
      options: [
        'filled',
        'ghost',
        'pill',
        'text',
        'arrow',
        'icon',
        'upgrade',
        'calendar',
        'overlay',
        'listItem',
      ],
      description: 'Visual style variant of the button',
    },
    size: {
      control: 'select',
      options: ['xs', 'small', 'medium', 'large', 'icon'],
      description: 'Size of the button',
    },
    disabled: { control: 'boolean' },
    iconPosition: {
      control: 'select',
      options: ['start', 'end'],
      description: 'Position of the icon (when an icon is provided)',
    },
    icon: {
      control: 'select',
      // Only icons that actually exist in svg-icons.registry. Curated to
      // a representative subset; the full Icon catalog is documented on
      // the Icon component's page.
      options: [
        undefined,
        'arrow',
        'bell',
        'bolt',
        'cancel',
        'chevron',
        'clock',
        'database',
        'filter',
        'lightbulb',
        'plus',
        'review',
        'search',
        'settings',
        'share',
        'star',
        'user',
      ],
      description: 'Icon to display alongside the label.',
    },
    loading: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Filled: Story = {
  args: { children: 'Continue', variant: 'filled', size: 'medium' },
};

export const Ghost: Story = {
  args: { children: 'Cancel', variant: 'ghost', size: 'medium' },
};

export const Pill: Story = {
  args: { children: 'Sort by', variant: 'pill', size: 'medium' },
};

export const Text: Story = {
  args: { children: 'Learn more', variant: 'text', size: 'medium' },
};

export const Arrow: Story = {
  args: { children: 'View details', variant: 'arrow', size: 'medium' },
};

export const WithIcon: Story = {
  args: {
    children: 'Add item',
    variant: 'filled',
    size: 'medium',
    icon: 'plus',
    iconPosition: 'start',
  },
};

export const IconOnly: Story = {
  name: 'Icon (size="icon")',
  args: {
    'aria-label': 'Settings',
    variant: 'filled',
    size: 'icon',
    icon: 'settings',
  },
};

export const Loading: Story = {
  args: {
    children: 'Saving…',
    variant: 'filled',
    size: 'medium',
    loading: true,
  },
};

export const Disabled: Story = {
  args: {
    children: 'Unavailable',
    variant: 'filled',
    size: 'medium',
    disabled: true,
  },
};

export const Sizes: Story = {
  parameters: { layout: 'centered' },
  render: () => (
    <div className="flex items-center gap-3">
      <Button variant="filled" size="xs">
        xs
      </Button>
      <Button variant="filled" size="small">
        small
      </Button>
      <Button variant="filled" size="medium">
        medium
      </Button>
      <Button variant="filled" size="large">
        large
      </Button>
    </div>
  ),
};

export const Playground: Story = {
  args: {
    children: 'Button',
    variant: 'filled',
    size: 'medium',
    disabled: false,
    icon: 'star',
    iconPosition: 'start',
  },
  parameters: {
    controls: { expanded: true },
  },
};
