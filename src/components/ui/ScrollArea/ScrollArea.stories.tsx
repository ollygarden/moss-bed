import type { Meta, StoryObj } from '@storybook/react-vite';
import { ScrollArea } from './index';
import { Typography } from '../Typography';

const meta: Meta<typeof ScrollArea> = {
  title: 'ScrollArea',
  component: ScrollArea,
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark' },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ScrollArea>;

const items = Array.from({ length: 30 }, (_, i) => `Item ${i + 1}`);

export const VerticalScroll: Story = {
  render: () => (
    <ScrollArea className="h-[300px] w-[300px] rounded-lg border border-olly-grey-700 p-4">
      <div className="space-y-3">
        {items.map((item) => (
          <div key={item} className="rounded-md bg-olly-grey-800 px-3 py-2">
            <Typography variant="bodySmall" color="white">
              {item}
            </Typography>
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
};

export const HorizontalScroll: Story = {
  render: () => (
    <ScrollArea className="w-[400px] rounded-lg border border-olly-grey-700 p-4">
      <div className="flex gap-3" style={{ width: '1000px' }}>
        {Array.from({ length: 15 }, (_, i) => (
          <div
            key={i}
            className="shrink-0 rounded-md bg-olly-grey-800 px-4 py-6"
          >
            <Typography variant="bodySmall" color="white">
              Card {i + 1}
            </Typography>
          </div>
        ))}
      </div>
    </ScrollArea>
  ),
};
