import type { Meta, StoryObj } from '@storybook/react-vite';
import { EmptyState } from '.';
import { Button } from '@/components/ui/Button';
import { Typography } from '@/components/ui/Typography';
import { action } from 'storybook/actions';

const meta: Meta<typeof EmptyState> = {
  title: 'EmptyState',
  component: EmptyState,
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark' },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: '800px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof EmptyState>;

export const InsightsFilterNoResults: Story = {
  name: 'Insights Page — Filter No Results',
  args: {
    icon: 'search',
    title: 'No Matching Insights',
    description:
      'No insights match your current filter criteria. Try adjusting your filters or clearing them to see all insights.',
    action: (
      <Button variant="ghost" className="mt-4">
        Clear Filters
      </Button>
    ),
  },
};

export const InsightsNewAccount: Story = {
  name: 'Insights Page — New Account',
  args: {
    icon: 'lightbulb',
    title: 'No Insights Yet',
    description:
      'Insights appear automatically as we analyze your telemetry data. Make sure your services are sending OpenTelemetry data to get started.',
  },
};

export const ServiceNoInsights: Story = {
  name: 'Service Detail — No Insights Yet',
  args: {
    icon: 'bolt',
    title: 'No Insights Yet',
    description:
      "This service hasn't generated any insights yet. Insights will appear as we analyze its telemetry data.",
  },
};

export const ServicesNoServices: Story = {
  name: 'Services — No Services Found',
  args: {
    icon: 'database',
    title: 'No Services Found',
    description: (
      <>
        Your organization doesn&apos;t have any services yet. To get started, go
        to{' '}
        <Typography
          variant="link"
          href="/settings?tab=apikeys"
          onClick={(e: React.MouseEvent) => {
            e.preventDefault();
            action('navigate to settings')();
          }}
        >
          settings
        </Typography>
        , create an API key, and configure your OpenTelemetry SDK to send
        telemetry data. Services will appear here automatically once data is
        received.
      </>
    ),
    action: (
      <Button variant="ghost" className="mt-4">
        Refresh
      </Button>
    ),
  },
};

export const ServicesNoResults: Story = {
  name: 'Services — No Matching Services',
  args: {
    icon: 'search',
    title: 'No Matching Services',
    description: 'No services found matching your search criteria.',
    action: (
      <Button variant="ghost" className="mt-4">
        Clear Filters
      </Button>
    ),
  },
};

export const ServicesNoInsights: Story = {
  name: 'Services — No Insights Available',
  args: {
    icon: 'bolt',
    title: 'No Insights Available',
    description:
      'Services are running but no insights have been generated yet.',
    action: (
      <Typography variant="footnote" color="muted" className="mt-4">
        Insights appear automatically as we analyze your telemetry data
      </Typography>
    ),
  },
};

export const ErrorState: Story = {
  name: 'Services — Error Loading',
  args: {
    icon: 'error-icon',
    title: 'Unable to Load Services',
    description: 'There was an error loading your services. Please try again.',
    action: (
      <Button variant="ghost" className="mt-4">
        Try Again
      </Button>
    ),
  },
};

export const SettingsNoApiKeys: Story = {
  name: 'Settings — No API Keys',
  args: {
    icon: 'key',
    title: 'No API Keys Yet',
    description:
      'API keys allow your services to securely send telemetry data to OllyGarden. Create your first key to get started.',
    action: (
      <Button variant="ghost" icon="plus" iconPosition="start" className="mt-4">
        Create Your First API Key
      </Button>
    ),
  },
};

export const SettingsNoWebhooks: Story = {
  name: 'Settings — No Webhooks',
  args: {
    icon: 'bell',
    title: 'No Webhooks Configured',
    description:
      'Webhooks let you receive real-time notifications when new insights are detected. Connect your incident management or alerting tools to stay informed.',
    action: (
      <Button variant="ghost" icon="plus" iconPosition="start" className="mt-4">
        Create Your First Webhook
      </Button>
    ),
  },
};

export const SettingsNoDeliveries: Story = {
  name: 'Settings — No Webhook Deliveries (compact)',
  args: {
    icon: 'bell',
    title: 'No Deliveries Yet',
    description:
      'Delivery history will appear here once this webhook receives its first event.',
    size: 'compact',
  },
};

export const InstrumentationNoInstallations: Story = {
  name: 'Instrumentation — No Installations (compact)',
  args: {
    icon: 'database',
    title: 'No Installations Found',
    description: 'No Rose installations found for your organization.',
    size: 'compact',
  },
};

export const ScorePerfect: Story = {
  name: 'Instrumentation — Perfect Score (compact)',
  args: {
    icon: 'success-icon',
    title: 'Perfect Score',
    description: 'No issues found — your instrumentation is in great shape!',
    size: 'compact',
  },
};

export const ScoreError: Story = {
  name: 'Instrumentation — Score Error (compact)',
  args: {
    icon: 'error-icon',
    title: 'Unable to Load Score',
    description: 'No score data available',
    size: 'compact',
  },
};

export const AllEmptyStates: Story = {
  render: () => (
    <div className="space-y-8">
      <div className="border border-white/10 rounded-[12px] p-4">
        <Typography
          variant="footnote"
          color="muted"
          className="uppercase tracking-wide mb-2"
        >
          Insights Page — Filter No Results
        </Typography>
        <EmptyState
          icon="search"
          title="No Matching Insights"
          description="No insights match your current filter criteria. Try adjusting your filters or clearing them to see all insights."
          action={
            <Button variant="ghost" className="mt-4">
              Clear Filters
            </Button>
          }
        />
      </div>

      <div className="border border-white/10 rounded-[12px] p-4">
        <Typography
          variant="footnote"
          color="muted"
          className="uppercase tracking-wide mb-2"
        >
          Insights Page — New Account
        </Typography>
        <EmptyState
          icon="lightbulb"
          title="No Insights Yet"
          description="Insights appear automatically as we analyze your telemetry data. Make sure your services are sending OpenTelemetry data to get started."
        />
      </div>

      <div className="border border-white/10 rounded-[12px] p-4">
        <Typography
          variant="footnote"
          color="muted"
          className="uppercase tracking-wide mb-2"
        >
          Service Detail — No Insights Yet
        </Typography>
        <EmptyState
          icon="bolt"
          title="No Insights Yet"
          description="This service hasn't generated any insights yet. Insights will appear as we analyze its telemetry data."
        />
      </div>

      <div className="border border-white/10 rounded-[12px] p-4">
        <Typography
          variant="footnote"
          color="muted"
          className="uppercase tracking-wide mb-2"
        >
          Services — No Services Found
        </Typography>
        <EmptyState
          icon="database"
          title="No Services Found"
          description={
            <>
              Your organization doesn&apos;t have any services yet. To get
              started, go to{' '}
              <Typography
                variant="link"
                href="/settings?tab=apikeys"
                onClick={(e: React.MouseEvent) => {
                  e.preventDefault();
                  action('navigate to settings')();
                }}
              >
                settings
              </Typography>
              , create an API key, and configure your OpenTelemetry SDK to send
              telemetry data. Services will appear here automatically once data
              is received.
            </>
          }
          action={
            <Button variant="ghost" className="mt-4">
              Refresh
            </Button>
          }
        />
      </div>

      <div className="border border-white/10 rounded-[12px] p-4">
        <Typography
          variant="footnote"
          color="muted"
          className="uppercase tracking-wide mb-2"
        >
          Services — No Matching Services
        </Typography>
        <EmptyState
          icon="search"
          title="No Matching Services"
          description="No services found matching your search criteria."
          action={
            <Button variant="ghost" className="mt-4">
              Clear Filters
            </Button>
          }
        />
      </div>

      <div className="border border-white/10 rounded-[12px] p-4">
        <Typography
          variant="footnote"
          color="muted"
          className="uppercase tracking-wide mb-2"
        >
          Services — No Insights Available
        </Typography>
        <EmptyState
          icon="bolt"
          title="No Insights Available"
          description="Services are running but no insights have been generated yet."
          action={
            <Typography variant="footnote" color="muted" className="mt-4">
              Insights appear automatically as we analyze your telemetry data
            </Typography>
          }
        />
      </div>

      <div className="border border-white/10 rounded-[12px] p-4">
        <Typography
          variant="footnote"
          color="muted"
          className="uppercase tracking-wide mb-2"
        >
          Services — Error Loading
        </Typography>
        <EmptyState
          icon="error-icon"
          title="Unable to Load Services"
          description="There was an error loading your services. Please try again."
          action={
            <Button variant="ghost" className="mt-4">
              Try Again
            </Button>
          }
        />
      </div>

      <div className="border border-white/10 rounded-[12px] p-4">
        <Typography
          variant="footnote"
          color="muted"
          className="uppercase tracking-wide mb-2"
        >
          Settings — No API Keys
        </Typography>
        <EmptyState
          icon="key"
          title="No API Keys Yet"
          description="API keys allow your services to securely send telemetry data to OllyGarden. Create your first key to get started."
          action={
            <Button
              variant="ghost"
              icon="plus"
              iconPosition="start"
              className="mt-4"
            >
              Create Your First API Key
            </Button>
          }
        />
      </div>

      <div className="border border-white/10 rounded-[12px] p-4">
        <Typography
          variant="footnote"
          color="muted"
          className="uppercase tracking-wide mb-2"
        >
          Settings — No Webhooks
        </Typography>
        <EmptyState
          icon="bell"
          title="No Webhooks Configured"
          description="Webhooks let you receive real-time notifications when new insights are detected. Connect your incident management or alerting tools to stay informed."
          action={
            <Button
              variant="ghost"
              icon="plus"
              iconPosition="start"
              className="mt-4"
            >
              Create Your First Webhook
            </Button>
          }
        />
      </div>

      <div className="border border-white/10 rounded-[12px] p-4">
        <Typography
          variant="footnote"
          color="muted"
          className="uppercase tracking-wide mb-2"
        >
          Settings — No Webhook Deliveries
        </Typography>
        <EmptyState
          icon="bell"
          title="No Deliveries Yet"
          description="Delivery history will appear here once this webhook receives its first event."
          size="compact"
        />
      </div>

      <div className="border border-white/10 rounded-[12px] p-4">
        <Typography
          variant="footnote"
          color="muted"
          className="uppercase tracking-wide mb-2"
        >
          Instrumentation — No Installations (compact)
        </Typography>
        <EmptyState
          icon="database"
          title="No Installations Found"
          description="No Rose installations found for your organization."
          size="compact"
        />
      </div>

      <div className="border border-white/10 rounded-[12px] p-4">
        <Typography
          variant="footnote"
          color="muted"
          className="uppercase tracking-wide mb-2"
        >
          Instrumentation — Perfect Score (compact)
        </Typography>
        <EmptyState
          icon="success-icon"
          title="Perfect Score"
          description="No issues found — your instrumentation is in great shape!"
          size="compact"
        />
      </div>

      <div className="border border-white/10 rounded-[12px] p-4">
        <Typography
          variant="footnote"
          color="muted"
          className="uppercase tracking-wide mb-2"
        >
          Instrumentation — Score Error (compact)
        </Typography>
        <EmptyState
          icon="error-icon"
          title="Unable to Load Score"
          description="No score data available"
          size="compact"
        />
      </div>
    </div>
  ),
};
