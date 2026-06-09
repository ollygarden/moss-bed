import type { Meta, StoryObj } from '@storybook/react-vite';
import { action } from 'storybook/actions';
import { ErrorState } from './index';

const meta: Meta<typeof ErrorState> = {
  title: 'ErrorState',
  component: ErrorState,
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'olly-dark' },
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
    title: 'Couldn’t load this list',
  },
};

export const WithDescription: Story = {
  args: {
    title: 'Couldn’t load this list',
    description:
      'There was a problem connecting to the server. Please check your network and try again.',
  },
};

export const WithRetryButton: Story = {
  args: {
    title: 'Something went wrong',
    description: 'We hit an unexpected error. Retrying often fixes it.',
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
