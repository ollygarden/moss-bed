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

const PLACEHOLDER_IMAGE =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 180">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#38373A" />
          <stop offset="100%" stop-color="#1a1d20" />
        </linearGradient>
      </defs>
      <rect width="320" height="180" fill="url(#g)" />
    </svg>`
  );

const meta: Meta<typeof Card> = {
  title: 'Card',
  component: Card,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'default',
        'vertical',
        'horizontal',
        'elevated',
        'transparent',
        'insight',
        'settings',
        'glass',
      ],
      description: 'The visual variant of the card',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: 'default',
    className: 'w-80',
    children: (
      <>
        <CardHeader>
          <CardTitle>Default Card</CardTitle>
          <CardDescription>The standard card surface.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-white/80">
            Use for general content blocks on grey-800 surfaces.
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

export const Insight: Story = {
  args: {
    variant: 'insight',
    className: 'w-80',
    children: (
      <>
        <CardHeader>
          <CardTitle>Insight Card</CardTitle>
          <CardDescription>
            Elevated surface used for grouped findings.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 mb-3">
            <Tag color="green">Resolved</Tag>
            <Tag color="grey">3 items</Tag>
          </div>
          <p className="text-sm text-white/70">
            Sits on grey-900 with a soft shadow for visual hierarchy.
          </p>
        </CardContent>
      </>
    ),
  },
};

export const Settings: Story = {
  args: {
    variant: 'settings',
    className: 'w-96',
    children: (
      <>
        <CardHeader>
          <CardTitle>Settings Section</CardTitle>
          <CardDescription>
            Bordered surface for grouped form rows.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-white/80">
            Used on configuration pages to delimit related controls.
          </p>
        </CardContent>
        <CardFooter className="gap-2">
          <Button variant="ghost" size="medium">
            Cancel
          </Button>
          <Button size="medium">Save changes</Button>
        </CardFooter>
      </>
    ),
  },
};

export const Transparent: Story = {
  args: {
    variant: 'transparent',
    className: 'w-80',
    children: (
      <>
        <CardHeader>
          <CardTitle>Transparent Card</CardTitle>
          <CardDescription>
            No background, no border — useful inside other surfaces.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-white/70">
            Lets the parent background show through.
          </p>
        </CardContent>
      </>
    ),
  },
};

export const Glass: Story = {
  args: {
    variant: 'glass',
    className: 'w-80',
    children: (
      <>
        <CardHeader>
          <CardTitle>Glass Card</CardTitle>
          <CardDescription>Subtle border with grey-900 fill.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-white/70">
            Use when stacking cards over a heavier background image.
          </p>
        </CardContent>
      </>
    ),
  },
};

export const Elevated: Story = {
  args: {
    variant: 'elevated',
    className: 'w-80',
    children: (
      <>
        <CardHeader>
          <CardTitle>Elevated Card</CardTitle>
          <CardDescription>Heavier shadow for emphasis.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-white/70">
            Use sparingly to draw attention to a primary action.
          </p>
        </CardContent>
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
          src={PLACEHOLDER_IMAGE}
          alt="Placeholder"
          aspectRatio="video"
          serviceName="Example Title"
        />
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Vertical Card</CardTitle>
          <CardDescription>Image on top, content below.</CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex items-center gap-2 mb-3">
            <Tag color="green">Active</Tag>
            <Tag color="grey">Featured</Tag>
          </div>
          <p className="text-sm text-white/70">
            Use for media-led content blocks in grids.
          </p>
        </CardContent>
        <CardFooter>
          <Button size="medium" className="w-full">
            Open
          </Button>
        </CardFooter>
      </>
    ),
  },
};

export const VerticalGrid: Story = {
  parameters: { layout: 'fullscreen' },
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
      {(
        [
          { title: 'First Item', tag: 'green', tagLabel: 'Active' },
          { title: 'Second Item', tag: 'orange', tagLabel: 'Pending' },
          { title: 'Third Item', tag: 'grey', tagLabel: 'Draft' },
        ] as const
      ).map((item) => (
        <Card key={item.title} variant="vertical" className="w-full max-w-sm">
          <CardImage
            src={PLACEHOLDER_IMAGE}
            alt="Placeholder"
            aspectRatio="video"
          />
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">{item.title}</CardTitle>
            <CardDescription>Short description text.</CardDescription>
          </CardHeader>
          <CardContent className="pt-0">
            <Tag color={item.tag} className="mb-2">
              {item.tagLabel}
            </Tag>
            <p className="text-sm text-white/70">
              Vertical cards work well in a 3-column grid.
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  ),
};

export const AllVariants: Story = {
  parameters: { layout: 'fullscreen' },
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
      {(
        [
          'default',
          'insight',
          'settings',
          'elevated',
          'glass',
          'transparent',
        ] as const
      ).map((variant) => (
        <Card key={variant} variant={variant} className="w-full">
          <CardHeader>
            <CardTitle className="capitalize">{variant}</CardTitle>
            <CardDescription>variant=&quot;{variant}&quot;</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-white/70">
              The {variant} variant. Sample content to show the surface
              treatment.
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  ),
};
