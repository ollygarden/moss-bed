import type { Meta, StoryObj } from '@storybook/react-vite';
import { MemoryRouter } from 'react-router-dom';
import Link from './index';

const meta: Meta<typeof Link> = {
  title: 'Link',
  component: Link,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    to: {
      control: 'text',
      description: 'Internal route path (React Router)',
    },
    href: {
      control: 'text',
      description: 'External URL or mailto link',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default Link
export const Default: Story = {
  args: {
    children: 'Link Text',
    to: '/dashboard',
  },
};

// External Link
export const ExternalLink: Story = {
  args: {
    children: 'Visit External Site',
    href: 'https://example.com',
  },
};

// Playground
export const Playground: Story = {
  args: {
    children: 'Link Text',
    to: '/dashboard',
  },
};
