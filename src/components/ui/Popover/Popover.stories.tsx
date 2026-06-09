import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Popover, PopoverTrigger, PopoverContent } from './index';
import { Button } from '../Button';
import { Typography } from '../Typography';

const meta: Meta<typeof Popover> = {
  title: 'Popover',
  component: Popover,
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark' },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Popover>;

export const Default: Story = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost">Open Popover</Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="space-y-2">
          <Typography variant="subtitle2" color="white">
            Popover Title
          </Typography>
          <Typography variant="bodySmall" color="muted">
            This is a basic popover with some content inside. It supports any
            React children.
          </Typography>
        </div>
      </PopoverContent>
    </Popover>
  ),
};

export const WithForm: Story = {
  render: () => {
    const [value, setValue] = useState('');

    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="filled">Edit Name</Button>
        </PopoverTrigger>
        <PopoverContent align="start">
          <div className="space-y-3">
            <Typography variant="subtitle2" color="white">
              Update display name
            </Typography>
            <input
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Enter name"
              className="w-full rounded-md border border-olly-grey-600 bg-olly-grey-800 px-3 py-2 text-sm text-white placeholder:text-olly-grey-400"
            />
            <Button variant="filled" size="small">
              Save
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    );
  },
};
