import type { Meta, StoryObj } from '@storybook/react-vite';
import { Loader } from './index';

const meta: Meta<typeof Loader> = {
  title: 'Loader',
  component: Loader,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'dark', value: '#090A0B' },
        { name: 'light', value: '#ffffff' },
      ],
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Size of the loader',
    },
    text: {
      control: 'text',
      description: 'Optional text to display with the loader',
    },
    center: {
      control: 'boolean',
      description: 'Center the loader content',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic variants
export const Default: Story = {
  args: {
    size: 'md',
  },
};

export const WithText: Story = {
  args: {
    size: 'md',
    text: 'Loading...',
    center: true,
  },
};

export const Centered: Story = {
  args: {
    size: 'lg',
    text: 'Please wait',
    center: true,
  },
};

// Size variations
export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-8">
      <div className="text-center">
        <Loader size="xs" />
        <div className="text-white/60 text-xs mt-2">XS</div>
      </div>
      <div className="text-center">
        <Loader size="sm" />
        <div className="text-white/60 text-xs mt-2">SM</div>
      </div>
      <div className="text-center">
        <Loader size="md" />
        <div className="text-white/60 text-xs mt-2">MD</div>
      </div>
      <div className="text-center">
        <Loader size="lg" />
        <div className="text-white/60 text-xs mt-2">LG</div>
      </div>
      <div className="text-center">
        <Loader size="xl" />
        <div className="text-white/60 text-xs mt-2">XL</div>
      </div>
    </div>
  ),
};

// Usage examples
export const InlineLoader: Story = {
  render: () => (
    <div className="text-white">
      <p className="mb-4">This is some text with an inline loader:</p>
      <div className="flex items-center gap-2">
        <span>Processing</span>
        <Loader size="sm" />
      </div>
    </div>
  ),
};

export const FullPageLoader: Story = {
  render: () => (
    <div className="w-96 h-64 flex items-center justify-center bg-olly-grey-900 rounded-lg">
      <Loader size="xl" text="Loading application..." center />
    </div>
  ),
};

export const LoadingStates: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-white text-lg font-bold mb-4">Different Sizes</h3>
        <div className="flex items-center gap-6">
          <Loader size="xs" text="XS" />
          <Loader size="sm" text="SM" />
          <Loader size="md" text="MD" />
          <Loader size="lg" text="LG" />
          <Loader size="xl" text="XL" />
        </div>
      </div>

      <div>
        <h3 className="text-white text-lg font-bold mb-4">With Text</h3>
        <div className="space-y-4">
          <Loader size="md" text="Loading data..." center />
          <Loader size="lg" text="Processing request..." center />
        </div>
      </div>
    </div>
  ),
};
