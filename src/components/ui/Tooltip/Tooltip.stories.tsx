import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '@/components/ui/Button';
import { Tooltip } from './index';

const meta: Meta<typeof Tooltip> = {
  title: 'Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A modern tooltip component that displays content when hovering over an element. Uses Typography component for consistent text styling.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    content: {
      description: 'The content to display in the tooltip',
      control: { type: 'text' },
    },
    side: {
      description: 'Which side to display the tooltip on',
      control: { type: 'select' },
      options: ['top', 'right', 'bottom', 'left'],
    },
    delay: {
      description: 'Delay before showing the tooltip (in milliseconds)',
      control: { type: 'number' },
    },
    disabled: {
      description: 'Whether the tooltip is disabled',
      control: { type: 'boolean' },
    },
    className: {
      description: 'Additional CSS classes for the tooltip content',
      control: { type: 'text' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    content: 'This is a tooltip',
  },
  render: (args) => {
    const { content = 'This is a tooltip', ...rest } = args;
    return (
      <Tooltip content={content} {...rest}>
        <Button>Hover me</Button>
      </Tooltip>
    );
  },
};

export const WithDifferentSides: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-8 p-8">
      <Tooltip content="Top tooltip" side="top">
        <Button>Top</Button>
      </Tooltip>
      <Tooltip content="Right tooltip" side="right">
        <Button>Right</Button>
      </Tooltip>
      <Tooltip content="Bottom tooltip" side="bottom">
        <Button>Bottom</Button>
      </Tooltip>
      <Tooltip content="Left tooltip" side="left">
        <Button>Left</Button>
      </Tooltip>
    </div>
  ),
};

export const WithCustomDelay: Story = {
  args: {
    content: 'This tooltip appears after 1 second',
    delay: 1000,
  },
  render: (args) => {
    const { content = 'This tooltip appears after 1 second', ...rest } = args;
    return (
      <Tooltip content={content} {...rest}>
        <Button>Slow tooltip</Button>
      </Tooltip>
    );
  },
};

export const WithLongContent: Story = {
  args: {
    content:
      'This is a much longer tooltip content that demonstrates how the component handles text wrapping and longer descriptions.',
  },
  render: (args) => {
    const {
      content = 'This is a much longer tooltip content that demonstrates how the component handles text wrapping and longer descriptions.',
      ...rest
    } = args;
    return (
      <Tooltip content={content} {...rest}>
        <Button>Long content tooltip</Button>
      </Tooltip>
    );
  },
};

export const Disabled: Story = {
  args: {
    content: 'This tooltip is disabled',
    disabled: true,
  },
  render: (args) => {
    const { content = 'This tooltip is disabled', ...rest } = args;
    return (
      <Tooltip content={content} {...rest}>
        <Button>No tooltip</Button>
      </Tooltip>
    );
  },
};

export const WithIcon: Story = {
  args: {
    content: 'Settings',
    side: 'right',
  },
  render: (args) => {
    const { content = 'Settings', ...rest } = args;
    return (
      <Tooltip content={content} {...rest}>
        <button
          className="p-2 text-white/70 hover:text-white transition-colors rounded-md hover:bg-white/5"
          aria-label="Settings"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM12 6a6 6 0 1 1 0 12 6 6 0 0 1 0-12z" />
          </svg>
        </button>
      </Tooltip>
    );
  },
};

export const InteractiveNavigation: Story = {
  render: () => (
    <div className="flex gap-4 p-4">
      <Tooltip content="Dashboard" side="bottom">
        <button className="flex items-center justify-center w-10 h-10 rounded-md bg-white/5 text-white/70 hover:text-white hover:bg-white/10 transition-colors">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M4 13h6c.55 0 1-.45 1-1V4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v8c0 .55.45 1 1 1zm0 8h6c.55 0 1-.45 1-1v-4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1zm10 0h6c.55 0 1-.45 1-1v-8c0-.55-.45-1-1-1h-6c-.55 0-1 .45-1 1v8c0 .55.45 1 1 1zM13 4v4c0 .55.45 1 1 1h6c.55 0 1-.45 1-1V4c0-.55-.45-1-1-1h-6c-.55 0-1 .45-1 1z" />
          </svg>
        </button>
      </Tooltip>

      <Tooltip content="Insights" side="bottom">
        <button className="flex items-center justify-center w-10 h-10 rounded-md bg-white/5 text-white/70 hover:text-white hover:bg-white/10 transition-colors">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        </button>
      </Tooltip>

      <Tooltip content="Settings" side="bottom">
        <button className="flex items-center justify-center w-10 h-10 rounded-md bg-white/5 text-white/70 hover:text-white hover:bg-white/10 transition-colors">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z" />
          </svg>
        </button>
      </Tooltip>
    </div>
  ),
};
