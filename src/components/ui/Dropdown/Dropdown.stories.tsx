import type { Meta, StoryObj } from '@storybook/react-vite';
import { Dropdown } from './index';
import { useState } from 'react';

const sampleOptions = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue.js' },
  { value: 'angular', label: 'Angular' },
  { value: 'svelte', label: 'Svelte' },
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
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default dropdown with red background for testing
 */
export const Default: Story = {
  render: () => {
    const [value, setValue] = useState<string>('');

    return (
      <Dropdown
        options={sampleOptions}
        value={value}
        onChange={setValue}
        placeholder="Select a framework"
      />
    );
  },
};

/**
 * Dropdown with pre-selected value
 */
export const WithSelectedValue: Story = {
  render: () => {
    const [value, setValue] = useState<string>('react');

    return (
      <Dropdown
        options={sampleOptions}
        value={value}
        onChange={setValue}
        placeholder="Select a framework"
      />
    );
  },
};

/**
 * Disabled dropdown
 */
export const Disabled: Story = {
  render: () => {
    const [value, setValue] = useState<string>('');

    return (
      <Dropdown
        options={sampleOptions}
        value={value}
        onChange={setValue}
        placeholder="Select a framework"
        disabled={true}
      />
    );
  },
};

/**
 * Error state dropdown
 */
export const ErrorState: Story = {
  render: () => {
    const [value, setValue] = useState<string>('');

    return (
      <Dropdown
        options={sampleOptions}
        value={value}
        onChange={setValue}
        placeholder="Select a framework"
        error={true}
      />
    );
  },
};

/**
 * Chip variant dropdown - styled like a pill button
 */
export const ChipVariant: Story = {
  render: () => {
    const [value, setValue] = useState<string>('');

    return (
      <Dropdown
        options={sampleOptions}
        value={value}
        onChange={setValue}
        placeholder="Sort by..."
        variant="chip"
      />
    );
  },
};

/**
 * Chip variant with selected value
 */
export const ChipWithValue: Story = {
  render: () => {
    const [value, setValue] = useState<string>('react');

    return (
      <Dropdown
        options={sampleOptions}
        value={value}
        onChange={setValue}
        placeholder="Sort by..."
        variant="chip"
      />
    );
  },
};

/**
 * Chip variant disabled
 */
export const ChipDisabled: Story = {
  render: () => {
    const [value, setValue] = useState<string>('vue');

    return (
      <Dropdown
        options={sampleOptions}
        value={value}
        onChange={setValue}
        placeholder="Sort by..."
        variant="chip"
        disabled={true}
      />
    );
  },
};
