import type { Meta, StoryObj } from '@storybook/react-vite';
import { action } from 'storybook/actions';
import { ErrorState } from './index';

const meta: Meta<typeof ErrorState> = {
  title: 'ErrorState',
  component: ErrorState,
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark' },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: '500px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ErrorState>;

export const Default: Story = {};

export const WithCustomTitle: Story = {
  args: {
    title: 'Unable to load services',
  },
};

export const WithDescription: Story = {
  args: {
    title: 'Unable to load services',
    description:
      'There was a problem connecting to the server. Please check your network connection.',
  },
};

export const WithRetryButton: Story = {
  args: {
    title: 'Failed to fetch data',
    description: 'An unexpected error occurred while loading your insights.',
    onRetry: action('retry-clicked'),
  },
};

export const Transparent: Story = {
  args: {
    title: 'Something went wrong',
    description: 'Please try again later.',
    onRetry: action('retry-clicked'),
    transparent: true,
  },
};
