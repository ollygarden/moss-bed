import type { Meta, StoryObj } from '@storybook/react-vite';
import { EmptyState } from '.';
import { Button } from '@/components/ui/Button';
import { Typography } from '@/components/ui/Typography';

const meta: Meta<typeof EmptyState> = {
  title: 'EmptyState',
  component: EmptyState,
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'olly-dark' },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: '640px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof EmptyState>;

export const Default: Story = {
  args: {
    icon: 'search',
    title: 'No results',
    description: 'Try adjusting your search or filter to find what you need.',
  },
};

export const WithAction: Story = {
  args: {
    icon: 'lightbulb',
    title: 'Nothing here yet',
    description:
      'Items will appear here once you create your first one. Get started below.',
    action: (
      <Button variant="ghost" icon="plus" iconPosition="start" className="mt-4">
        Create your first item
      </Button>
    ),
  },
};

export const Filtered: Story = {
  args: {
    icon: 'filter',
    title: 'No matches',
    description: 'No items match your current filters.',
    action: (
      <Button variant="ghost" className="mt-4">
        Clear filters
      </Button>
    ),
  },
};

export const ErrorLoading: Story = {
  args: {
    icon: 'error',
    title: 'Couldn’t load',
    description: 'Something went wrong loading this list. Please try again.',
    action: (
      <Button variant="ghost" className="mt-4">
        Try again
      </Button>
    ),
  },
};

export const Compact: Story = {
  args: {
    icon: 'bell',
    title: 'No activity yet',
    description: 'Activity will show here as it comes in.',
    size: 'compact',
  },
};

export const AllExamples: Story = {
  parameters: { layout: 'fullscreen' },
  decorators: [],
  render: () => (
    <div className="space-y-6 p-6">
      {(
        [
          {
            label: 'No results (search)',
            props: {
              icon: 'search' as const,
              title: 'No results',
              description: 'Try adjusting your search.',
            },
          },
          {
            label: 'No matches (filter)',
            props: {
              icon: 'filter' as const,
              title: 'No matches',
              description: 'No items match your current filters.',
            },
          },
          {
            label: 'Nothing yet (with action)',
            props: {
              icon: 'lightbulb' as const,
              title: 'Nothing here yet',
              description: 'Get started by creating your first item.',
              action: (
                <Button
                  variant="ghost"
                  icon="plus"
                  iconPosition="start"
                  className="mt-4"
                >
                  Create your first item
                </Button>
              ),
            },
          },
          {
            label: 'Error loading',
            props: {
              icon: 'error' as const,
              title: 'Couldn’t load',
              description: 'Something went wrong. Please try again.',
              action: (
                <Button variant="ghost" className="mt-4">
                  Try again
                </Button>
              ),
            },
          },
          {
            label: 'Compact (inline)',
            props: {
              icon: 'bell' as const,
              title: 'No activity yet',
              description: 'Activity will show here as it comes in.',
              size: 'compact' as const,
            },
          },
        ] as const
      ).map(({ label, props }) => (
        <div key={label} className="border border-white/10 rounded-[12px] p-4">
          <Typography
            variant="footnote"
            color="muted"
            className="uppercase tracking-wide mb-2"
          >
            {label}
          </Typography>
          <EmptyState {...props} />
        </div>
      ))}
    </div>
  ),
};
