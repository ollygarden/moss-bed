import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  CardImage,
} from '.';
import { Button } from '../Button';
import { Tag } from '../Tag';

const meta: Meta<typeof Card> = {
  title: 'Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'vertical', 'horizontal', 'elevated'],
      description: 'The layout variant of the card',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Using default background-numbers.png image from public folder

export const Default: Story = {
  args: {
    variant: 'default',
    children: (
      <>
        <CardHeader>
          <CardTitle>Default Card</CardTitle>
          <CardDescription>
            Standard card with olly-grey-800 background
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-white/80">
            This is the default card variant with the correct background color
            olly-grey-800.
          </p>
        </CardContent>
        <CardFooter>
          <Button variant="ghost" size="medium">
            Action
          </Button>
        </CardFooter>
      </>
    ),
  },
};

export const Vertical: Story = {
  args: {
    variant: 'vertical',
    className: 'w-80',
    children: (
      <>
        <CardImage
          src="/background-numbers.png"
          alt="Service visualization"
          aspectRatio="video"
        />
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Service Monitor</CardTitle>
          <CardDescription>Real-time observability insight</CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex items-center gap-2 mb-3">
            <Tag color="green">Active</Tag>
            <Tag color="default">Trace</Tag>
          </div>
          <p className="text-sm text-white/70">
            Monitor your service performance with real-time metrics and
            distributed tracing.
          </p>
        </CardContent>
        <CardFooter>
          <Button size="medium" className="w-full">
            View Details
          </Button>
        </CardFooter>
      </>
    ),
  },
};

export const Horizontal: Story = {
  args: {
    variant: 'horizontal',
    className: 'cursor-pointer hover:bg-[#3a393c] transition-colors',
    image: '/background-numbers.png',
    imageAlt: 'Dashboard preview',
    title: 'Solve Critical Log Insights',
    description: 'Fix high-severity log insights to improve reliability',
    showChevron: true,
  },
};

export const Elevated: Story = {
  args: {
    variant: 'elevated',
    children: (
      <>
        <CardHeader>
          <CardTitle>Elevated Car</CardTitle>
          <CardDescription>Enhanced with shadow for prominenc</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-white/80">Instrumentation Score</span>
              <span className="text-2xl font-bold text-olly-accent">87</span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-2">
              <div
                className="bg-olly-accent h-2 rounded-full"
                style={{ width: '87%' }}
              ></div>
            </div>
            <p className="text-sm text-white/70">
              Your services are well instrumented with room for improvement.
            </p>
          </div>
        </CardContent>
      </>
    ),
  },
};

export const HorizontalVariations: Story = {
  render: () => (
    <div className="space-y-4">
      <Card
        variant="horizontal"
        className="cursor-pointer hover:bg-[#3a393c] transition-colors"
        image="/BackgroundImage1.png"
        imageAlt="Service icon"
        title="User Service"
        description="Authentication and user management service"
        showChevron={true}
      />

      <Card
        variant="horizontal"
        className="cursor-pointer hover:bg-[#3a393c] transition-colors"
        image="/BackgroundImage2.png"
        imageAlt="Metrics icon"
        title="Payment Service"
        description="Payment processing with high reliability and security"
        showChevron={true}
      />

      <Card
        variant="horizontal"
        className="cursor-pointer hover:bg-[#3a393c] transition-colors"
        image="/BackgroundImage3.png"
        imageAlt="Dashboard icon"
        title="Notification Service"
        description="Real-time notifications and email delivery system"
        showChevron={true}
      />
    </div>
  ),
};

export const VerticalGrid: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card variant="vertical" className="w-full max-w-sm">
        <CardImage
          src="/BackgroundImage1.png"
          alt="Service"
          aspectRatio="video"
        />
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">API Gatewa</CardTitle>
          <CardDescription>Central entry poin</CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          <Tag color="green" className="mb-2">
            Healthy
          </Tag>
          <p className="text-sm text-white/70">
            Managing 1.2M requests/day with 99.9% uptime
          </p>
        </CardContent>
      </Card>

      <Card variant="vertical" className="w-full max-w-sm">
        <CardImage
          src="/BackgroundImage2.png"
          alt="Dashboard"
          aspectRatio="video"
        />
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Data Pipelin</CardTitle>
          <CardDescription>Stream processin</CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          <Tag color="orange" className="mb-2">
            Warning
          </Tag>
          <p className="text-sm text-white/70">
            Processing 500MB/hour with minor latency issues
          </p>
        </CardContent>
      </Card>

      <Card variant="vertical" className="w-full max-w-sm">
        <CardImage
          src="/BackgroundImage3.png"
          alt="Metrics"
          aspectRatio="video"
        />
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Cache Laye</CardTitle>
          <CardDescription>Redis cluste</CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          <Tag color="red" className="mb-2">
            Critical
          </Tag>
          <p className="text-sm text-white/70">
            Memory usage at 85%, immediate attention required
          </p>
        </CardContent>
      </Card>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-8 p-6">
      <div>
        <h3 className="text-white text-lg font-semibold mb-4">Default Card</h3>
        <Card variant="default" className="max-w-md">
          <CardHeader>
            <CardTitle className="text-lg">Standard Layou</CardTitle>
            <CardDescription>
              Basic card with olly-grey-800 background
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-white/70">
              Content area for general information and data display.
            </p>
          </CardContent>
        </Card>
      </div>

      <div>
        <h3 className="text-white text-lg font-semibold mb-4">Vertical Card</h3>
        <Card variant="vertical" className="max-w-sm">
          <CardImage
            src="/background-numbers.png"
            alt="Feature image"
            aspectRatio="video"
          />
          <CardHeader>
            <CardTitle className="text-lg">Image on To</CardTitle>
            <CardDescription>
              Content flows vertically below image
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-white/70">
              Perfect for showcasing features with visual elements.
            </p>
          </CardContent>
        </Card>
      </div>

      <div>
        <h3 className="text-white text-lg font-semibold mb-4">
          Horizontal Card
        </h3>
        <Card
          variant="horizontal"
          className="cursor-pointer hover:bg-[#3a393c] transition-colors"
          image="/BackgroundImage1.png"
          imageAlt="Service icon"
          title="Quick Action Item"
          description="Image on left, content in middle, chevron on right for navigation"
        />
      </div>

      <div>
        <h3 className="text-white text-lg font-semibold mb-4">Elevated Card</h3>
        <Card variant="elevated" className="max-w-md">
          <CardHeader>
            <CardTitle className="text-lg">Enhanced Shado</CardTitle>
            <CardDescription>
              Elevated appearance for important content
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-white/70">
              Use for highlighting important information or primary actions.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
  },
};
