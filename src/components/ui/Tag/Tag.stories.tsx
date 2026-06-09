import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tag } from '.';

const meta: Meta<typeof Tag> = {
  title: 'Tag',
  component: Tag,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: 'select',
      options: [
        'default',
        'green',
        'orange',
        'red',
        'grey',
        'blue',
        'orchid',
        'pink',
        'purple',
        'monochrome1',
        'monochrome2',
        'monochrome3',
        'monochrome4',
        'accent',
        'custom',
      ],
      description: 'The color variant of the tag',
    },
    size: {
      control: 'select',
      options: ['default', 'small', 'custom'],
      description: 'The size variant of the tag',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Tag',
    color: 'default',
    size: 'default',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      {/* Colored Variants - Default Size */}
      <div>
        <h3 className="text-white text-sm font-semibold mb-3">
          Colored Variants - Default Size (px-3 py-1)
        </h3>
        <div className="flex flex-wrap gap-2">
          <Tag color="default" size="default">
            Default
          </Tag>
          <Tag color="green" size="default">
            Green
          </Tag>
          <Tag color="orange" size="default">
            Orange
          </Tag>
          <Tag color="red" size="default">
            Red
          </Tag>
          <Tag color="grey" size="default">
            Grey
          </Tag>
          <Tag color="blue" size="default">
            Blue
          </Tag>
          <Tag color="orchid" size="default">
            Orchid
          </Tag>
          <Tag color="pink" size="default">
            Pink
          </Tag>
          <Tag color="purple" size="default">
            Purple
          </Tag>
        </div>
      </div>

      {/* Colored Variants - Small Size */}
      <div>
        <h3 className="text-white text-sm font-semibold mb-3">
          Colored Variants - Small Size (px-3 py-2)
        </h3>
        <div className="flex flex-wrap gap-2">
          <Tag color="default" size="small">
            Default
          </Tag>
          <Tag color="green" size="small">
            Green
          </Tag>
          <Tag color="orange" size="small">
            Orange
          </Tag>
          <Tag color="red" size="small">
            Red
          </Tag>
          <Tag color="grey" size="small">
            Grey
          </Tag>
          <Tag color="blue" size="small">
            Blue
          </Tag>
          <Tag color="orchid" size="small">
            Orchid
          </Tag>
          <Tag color="pink" size="small">
            Pink
          </Tag>
          <Tag color="purple" size="small">
            Purple
          </Tag>
        </div>
      </div>

      {/* Monochrome Variants - Default Size */}
      <div>
        <h3 className="text-white text-sm font-semibold mb-3">
          Monochrome Variants - Default Size (px-3 py-1)
        </h3>
        <div className="flex flex-wrap gap-2">
          <Tag color="monochrome1" size="default">
            Monochrome 1
          </Tag>
          <Tag color="monochrome2" size="default">
            Monochrome 2
          </Tag>
          <Tag color="monochrome3" size="default">
            Monochrome 3
          </Tag>
          <Tag color="monochrome4" size="default">
            Monochrome 4
          </Tag>
        </div>
      </div>

      {/* Monochrome Variants - Small Size */}
      <div>
        <h3 className="text-white text-sm font-semibold mb-3">
          Monochrome Variants - Small Size (px-3 py-2)
        </h3>
        <div className="flex flex-wrap gap-2">
          <Tag color="monochrome1" size="small">
            Monochrome 1
          </Tag>
          <Tag color="monochrome2" size="small">
            Monochrome 2
          </Tag>
          <Tag color="monochrome3" size="small">
            Monochrome 3
          </Tag>
          <Tag color="monochrome4" size="small">
            Monochrome 4
          </Tag>
        </div>
      </div>

      {/* Accent Variant */}
      <div>
        <h3 className="text-white text-sm font-semibold mb-3">
          Accent Variant (Interactive with hover)
        </h3>
        <div className="flex flex-wrap gap-2">
          <Tag color="accent" size="default">
            Accent Default
          </Tag>
          <Tag color="accent" size="small">
            Accent Small
          </Tag>
        </div>
      </div>

      {/* Size Comparison */}
      <div className="border-t border-white/10 pt-6">
        <h3 className="text-white text-sm font-semibold mb-3">
          Size Comparison (All variants use same padding per size)
        </h3>
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <span className="text-white/60 text-xs w-24">Default:</span>
            <Tag color="green" size="default">
              Colored
            </Tag>
            <Tag color="monochrome2" size="default">
              Monochrome
            </Tag>
            <Tag color="accent" size="default">
              Accent
            </Tag>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-white/60 text-xs w-24">Small:</span>
            <Tag color="green" size="small">
              Colored
            </Tag>
            <Tag color="monochrome2" size="small">
              Monochrome
            </Tag>
            <Tag color="accent" size="small">
              Accent
            </Tag>
          </div>
        </div>
      </div>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <span className="text-white text-sm w-20">Default:</span>
        <Tag size="default" color="green">
          Active
        </Tag>
        <Tag size="default" color="orange">
          Pending
        </Tag>
        <Tag size="default" color="red">
          Error
        </Tag>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-white text-sm w-20">Small:</span>
        <Tag size="small" color="green">
          Active
        </Tag>
        <Tag size="small" color="orange">
          Pending
        </Tag>
        <Tag size="small" color="red">
          Error
        </Tag>
      </div>
    </div>
  ),
};

export const MonochromeVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div>
        <h3 className="text-white text-sm font-semibold mb-2">
          Monochrome Variants (Small Size)
        </h3>
        <p className="text-white/60 text-xs mb-3">
          Used for service metadata: namespace, environment, version, and counts
        </p>
        <div className="flex flex-wrap gap-2">
          <Tag color="monochrome1" size="small">
            Monochrome 1
          </Tag>
          <Tag color="monochrome2" size="small">
            Monochrome 2
          </Tag>
          <Tag color="monochrome3" size="small">
            Monochrome 3
          </Tag>
          <Tag color="monochrome4" size="small">
            Monochrome 4
          </Tag>
        </div>
      </div>
      <div>
        <h3 className="text-white text-sm font-semibold mb-2">
          Monochrome Variants (Default Size)
        </h3>
        <div className="flex flex-wrap gap-2">
          <Tag color="monochrome1" size="default">
            Monochrome 1
          </Tag>
          <Tag color="monochrome2" size="default">
            Monochrome 2
          </Tag>
          <Tag color="monochrome3" size="default">
            Monochrome 3
          </Tag>
          <Tag color="monochrome4" size="default">
            Monochrome 4
          </Tag>
        </div>
      </div>
      <div>
        <h3 className="text-white text-sm font-semibold mb-2">
          Real-World Usage
        </h3>
        <p className="text-white/60 text-xs mb-3">
          Example of how monochrome tags are used in the application
        </p>
        <div className="flex flex-wrap gap-2 items-center">
          <Tag color="monochrome1" size="small">
            default
          </Tag>
          <Tag color="monochrome2" size="small">
            production
          </Tag>
          <Tag color="monochrome3" size="small">
            v1.2.3
          </Tag>
          <Tag color="monochrome4" size="small">
            12 insights
          </Tag>
        </div>
      </div>
    </div>
  ),
};

export const AccentVariant: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div>
        <h3 className="text-white text-sm font-semibold mb-2">
          Accent Variant
        </h3>
        <p className="text-white/60 text-xs mb-3">
          Interactive variant with hover states for filters and active elements
        </p>
        <div className="flex flex-wrap gap-2">
          <Tag color="accent" size="small">
            Active Filter
          </Tag>
          <Tag color="accent" size="small">
            Selected Version
          </Tag>
          <Tag color="accent" size="default">
            Interactive Element
          </Tag>
        </div>
      </div>
      <div>
        <h3 className="text-white text-sm font-semibold mb-2">
          Hover to See Effect
        </h3>
        <p className="text-white/60 text-xs mb-3">
          Accent tags have special hover states that darken on interaction
        </p>
        <div className="flex flex-wrap gap-2">
          <Tag color="accent" size="small">
            Hover Me
          </Tag>
        </div>
      </div>
    </div>
  ),
};

export const AllColorsSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div>
        <h3 className="text-white text-sm font-semibold mb-2">Default Size</h3>
        <div className="flex flex-wrap gap-2">
          <Tag size="default" color="default">
            Default
          </Tag>
          <Tag size="default" color="green">
            Green
          </Tag>
          <Tag size="default" color="orange">
            Orange
          </Tag>
          <Tag size="default" color="red">
            Red
          </Tag>
          <Tag size="default" color="grey">
            Grey
          </Tag>
          <Tag size="default" color="blue">
            Blue
          </Tag>
          <Tag size="default" color="orchid">
            Orchid
          </Tag>
          <Tag size="default" color="pink">
            Pink
          </Tag>
          <Tag size="default" color="purple">
            Purple
          </Tag>
        </div>
      </div>
      <div>
        <h3 className="text-white text-sm font-semibold mb-2">Small Size</h3>
        <div className="flex flex-wrap gap-2">
          <Tag size="small" color="default">
            Default
          </Tag>
          <Tag size="small" color="green">
            Green
          </Tag>
          <Tag size="small" color="orange">
            Orange
          </Tag>
          <Tag size="small" color="red">
            Red
          </Tag>
          <Tag size="small" color="grey">
            Grey
          </Tag>
          <Tag size="small" color="blue">
            Blue
          </Tag>
          <Tag size="small" color="orchid">
            Orchid
          </Tag>
          <Tag size="small" color="pink">
            Pink
          </Tag>
          <Tag size="small" color="purple">
            Purple
          </Tag>
        </div>
      </div>
    </div>
  ),
};

export const CompleteShowcase: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      {/* Colored Variants */}
      <div>
        <h2 className="text-white text-lg font-bold mb-4">Colored Variants</h2>
        <div className="flex flex-col gap-6">
          <div>
            <h3 className="text-white text-sm font-semibold mb-2">
              Default Size (px-3 py-1)
            </h3>
            <div className="flex flex-wrap gap-2">
              <Tag size="default" color="default">
                Default
              </Tag>
              <Tag size="default" color="green">
                Green
              </Tag>
              <Tag size="default" color="orange">
                Orange
              </Tag>
              <Tag size="default" color="red">
                Red
              </Tag>
              <Tag size="default" color="grey">
                Grey
              </Tag>
              <Tag size="default" color="blue">
                Blue
              </Tag>
              <Tag size="default" color="orchid">
                Orchid
              </Tag>
              <Tag size="default" color="pink">
                Pink
              </Tag>
              <Tag size="default" color="purple">
                Purple
              </Tag>
            </div>
          </div>
          <div>
            <h3 className="text-white text-sm font-semibold mb-2">
              Small Size (px-3 py-2)
            </h3>
            <div className="flex flex-wrap gap-2">
              <Tag size="small" color="default">
                Default
              </Tag>
              <Tag size="small" color="green">
                Green
              </Tag>
              <Tag size="small" color="orange">
                Orange
              </Tag>
              <Tag size="small" color="red">
                Red
              </Tag>
              <Tag size="small" color="grey">
                Grey
              </Tag>
              <Tag size="small" color="blue">
                Blue
              </Tag>
              <Tag size="small" color="orchid">
                Orchid
              </Tag>
              <Tag size="small" color="pink">
                Pink
              </Tag>
              <Tag size="small" color="purple">
                Purple
              </Tag>
            </div>
          </div>
        </div>
      </div>

      {/* Monochrome Variants */}
      <div>
        <h2 className="text-white text-lg font-bold mb-4">
          Monochrome Variants
        </h2>
        <div className="flex flex-col gap-6">
          <div>
            <h3 className="text-white text-sm font-semibold mb-2">
              Default Size (px-3 py-1)
            </h3>
            <div className="flex flex-wrap gap-2">
              <Tag size="default" color="monochrome1">
                Monochrome 1
              </Tag>
              <Tag size="default" color="monochrome2">
                Monochrome 2
              </Tag>
              <Tag size="default" color="monochrome3">
                Monochrome 3
              </Tag>
              <Tag size="default" color="monochrome4">
                Monochrome 4
              </Tag>
            </div>
          </div>
          <div>
            <h3 className="text-white text-sm font-semibold mb-2">
              Small Size (px-3 py-2)
            </h3>
            <div className="flex flex-wrap gap-2">
              <Tag size="small" color="monochrome1">
                Monochrome 1
              </Tag>
              <Tag size="small" color="monochrome2">
                Monochrome 2
              </Tag>
              <Tag size="small" color="monochrome3">
                Monochrome 3
              </Tag>
              <Tag size="small" color="monochrome4">
                Monochrome 4
              </Tag>
            </div>
          </div>
        </div>
      </div>

      {/* Special Variants */}
      <div>
        <h2 className="text-white text-lg font-bold mb-4">Special Variants</h2>
        <div className="flex flex-col gap-6">
          <div>
            <h3 className="text-white text-sm font-semibold mb-2">
              Accent (Interactive)
            </h3>
            <p className="text-white/60 text-xs mb-3">
              Used for filters and active elements with hover states
            </p>
            <div className="flex flex-wrap gap-2">
              <Tag size="default" color="accent">
                Accent Default
              </Tag>
              <Tag size="small" color="accent">
                Accent Small
              </Tag>
            </div>
          </div>
        </div>
      </div>

      {/* Size Comparison */}
      <div>
        <h2 className="text-white text-lg font-bold mb-4">Size Comparison</h2>
        <p className="text-white/60 text-xs mb-3">
          All tags use the same padding regardless of color variant
        </p>
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <span className="text-white text-sm w-32">Default (py-1):</span>
            <Tag size="default" color="green">
              Green
            </Tag>
            <Tag size="default" color="monochrome2">
              Monochrome
            </Tag>
            <Tag size="default" color="accent">
              Accent
            </Tag>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-white text-sm w-32">Small (py-2):</span>
            <Tag size="small" color="green">
              Green
            </Tag>
            <Tag size="small" color="monochrome2">
              Monochrome
            </Tag>
            <Tag size="small" color="accent">
              Accent
            </Tag>
          </div>
        </div>
      </div>
    </div>
  ),
};
