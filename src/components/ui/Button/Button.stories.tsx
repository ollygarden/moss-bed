import type { Meta, StoryObj } from '@storybook/react-vite';
import Button from './index';

const meta: Meta<typeof Button> = {
  title: 'Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['filled', 'ghost', 'pill', 'text', 'arrow', 'icon', 'small'],
      description: 'Visual style variant of the button',
    },
    size: {
      control: 'select',
      options: ['xs', 'small', 'medium', 'large', 'icon'],
      description: 'Size of the button',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the button',
    },
    iconPosition: {
      control: 'select',
      options: ['start', 'end', null],
      description: 'Position of the icon',
    },
    icon: {
      control: 'select',
      options: [
        null,
        'alert',
        'apps-outage',
        'arrow',
        'badge',
        'bid-landscape',
        'bolt',
        'bounding-box',
        'calendar-month',
        'cancel',
        'chevron',
        'code',
        'codesimple',
        'data-array',
        'data-info-alert',
        'database',
        'database-search',
        'dinamic-screen',
        'error',
        'error-icon',
        'gitbranch',
        'github',
        'google',
        'healing',
        'house',
        'info-icon',
        'inspect',
        'lightbulb',
        'list',
        'list-all',
        'medal',
        'money',
        'moon',
        'problem',
        'review',
        'schedule-1',
        'school',
        'sdk',
        'search',
        'settings',
        'share',
        'stacks',
        'star',
        'success-icon',
        'sun',
        'support',
        'tv-options-input-settings',
        'union',
        'update',
        'user',
        'view-in-ar',
        'vital-signs',
        'wand-stars',
        'warning-icon',
      ],
      description:
        'Icon to display (for icon and arrow variants). Set to null to hide icon.',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Variant Stories
export const Filled: Story = {
  args: {
    children: 'Click me',
    variant: 'filled',
    size: 'medium',
  },
};

export const Ghost: Story = {
  args: {
    children: 'Click me',
    variant: 'ghost',
    size: 'medium',
  },
};

export const Pill: Story = {
  args: {
    children: 'Click me',
    variant: 'pill',
    size: 'medium',
  },
};

export const Text: Story = {
  args: {
    children: 'Click me',
    variant: 'text',
    size: 'medium',
  },
};

export const Arrow: Story = {
  args: {
    children: 'Click me',
    variant: 'arrow',
    size: 'medium',
  },
};

export const Icon: Story = {
  args: {
    children: 'Click me',
    variant: 'icon',
    icon: 'star',
    iconPosition: 'start',
    size: 'medium',
  },
};

export const Small: Story = {
  args: {
    children: 'Click me',
    variant: 'ghost',
    size: 'medium',
  },
};

// Playground
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
