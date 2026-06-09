import type { Meta, StoryObj } from '@storybook/react-vite';
import { StatusBar } from './index';

const meta: Meta<typeof StatusBar> = {
  title: 'StatusBar',
  component: StatusBar,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A simple status bar with gradient colors based on performance thresholds.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
      description: 'Current progress value',
    },
    max: {
      control: { type: 'number', min: 1 },
      description: 'Maximum value for the progress bar',
    },
    showLabel: {
      control: 'boolean',
      description: 'Show progress label and values',
    },
    label: {
      control: 'text',
      description: 'Custom label text',
    },
  },
  decorators: [
    (Story) => (
      <div className="w-80 p-4 bg-transparent rounded-lg">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 65,
    max: 100,
    showLabel: false,
  },
};

export const WithLabel: Story = {
  args: {
    value: 75,
    max: 100,
    showLabel: true,
    label: 'Progress',
  },
};

export const Examples: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-olly-grey-200">
          Performance Examples
        </h2>
        <p className="text-sm text-olly-grey-400">
          Gradient changes based on value thresholds
        </p>
      </div>
      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-medium text-olly-grey-300 mb-2">
            Poor (25%)
          </h3>
          <StatusBar value={25} showLabel label="Needs Improvement" />
        </div>
        <div>
          <h3 className="text-sm font-medium text-olly-grey-300 mb-2">
            Regular (65%)
          </h3>
          <StatusBar value={65} showLabel label="Satisfactory" />
        </div>
        <div>
          <h3 className="text-sm font-medium text-olly-grey-300 mb-2">
            Excellent (90%)
          </h3>
          <StatusBar value={90} showLabel label="Outstanding" />
        </div>
      </div>
    </div>
  ),
};
