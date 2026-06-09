import type { Meta, StoryObj } from '@storybook/react-vite';
import { Dropdown } from './index';
import { useState } from 'react';

const sortOptions = [
  { value: 'recent', label: 'Most recent' },
  { value: 'oldest', label: 'Oldest first' },
  { value: 'alphabetical', label: 'Alphabetical (A–Z)' },
  { value: 'impact', label: 'Highest impact' },
];

const statusOptions = [
  { value: 'all', label: 'All statuses' },
  { value: 'active', label: 'Active' },
  { value: 'paused', label: 'Paused' },
  { value: 'archived', label: 'Archived' },
];

const meta: Meta<typeof Dropdown> = {
  title: 'Dropdown',
  component: Dropdown,
  decorators: [
    (Story) => (
      <div
        style={{
          backgroundColor: '#24272a',
          padding: '20px',
          minHeight: '300px',
          width: '400px',
        }}
      >
        <Story />
      </div>
    ),
  ],
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState<string>('');

    return (
      <Dropdown
        options={sortOptions}
        value={value}
        onChange={setValue}
        placeholder="Sort by…"
      />
    );
  },
};

export const WithSelectedValue: Story = {
  render: () => {
    const [value, setValue] = useState<string>('recent');

    return (
      <Dropdown
        options={sortOptions}
        value={value}
        onChange={setValue}
        placeholder="Sort by…"
      />
    );
  },
};

export const Disabled: Story = {
  render: () => {
    const [value, setValue] = useState<string>('');

    return (
      <Dropdown
        options={sortOptions}
        value={value}
        onChange={setValue}
        placeholder="Sort by…"
        disabled
      />
    );
  },
};

export const ErrorState: Story = {
  render: () => {
    const [value, setValue] = useState<string>('');

    return (
      <Dropdown
        options={statusOptions}
        value={value}
        onChange={setValue}
        placeholder="Filter by status"
        error
      />
    );
  },
};

export const ChipVariant: Story = {
  render: () => {
    const [value, setValue] = useState<string>('');

    return (
      <Dropdown
        options={sortOptions}
        value={value}
        onChange={setValue}
        placeholder="Sort by…"
        variant="chip"
      />
    );
  },
};

export const ChipWithValue: Story = {
  render: () => {
    const [value, setValue] = useState<string>('impact');

    return (
      <Dropdown
        options={sortOptions}
        value={value}
        onChange={setValue}
        placeholder="Sort by…"
        variant="chip"
      />
    );
  },
};

export const ChipDisabled: Story = {
  render: () => {
    const [value, setValue] = useState<string>('recent');

    return (
      <Dropdown
        options={sortOptions}
        value={value}
        onChange={setValue}
        placeholder="Sort by…"
        variant="chip"
        disabled
      />
    );
  },
};
