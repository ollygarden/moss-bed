import type { Meta, StoryObj } from '@storybook/react-vite';
import { Skeleton } from './index';

const meta: Meta<typeof Skeleton> = {
  title: 'Skeleton',
  component: Skeleton,
  decorators: [
    (Story) => (
      <div
        style={{
          backgroundColor: '#24272a',
          padding: '40px',
          minHeight: '300px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
        }}
      >
        <div style={{ width: '600px' }}>
          <Story />
        </div>
      </div>
    ),
  ],
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['circle', 'row'],
      description: 'Shape variant of the skeleton',
    },
    width: {
      control: { type: 'text' },
      description: 'Width of the skeleton (px, %, rem, etc.)',
    },
    height: {
      control: { type: 'text' },
      description: 'Height of the skeleton (px, %, rem, etc.)',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Row skeleton - default rectangular loading placeholder
 */
export const Row: Story = {
  args: {
    variant: 'row',
    width: '100%',
  },
};

/**
 * Circle skeleton - circular loading placeholder for avatars
 */
export const Circle: Story = {
  args: {
    variant: 'circle',
    width: 64,
    height: 64,
  },
};

/**
 * Custom sizes - different sized row skeletons
 */
export const CustomSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div>
        <h4
          style={{
            color: '#FFFFFF',
            marginBottom: '8px',
            fontFamily: '"Space Grotesk"',
          }}
        >
          Small Row (Height: 12px)
        </h4>
        <Skeleton variant="row" width="100%" height={12} />
      </div>

      <div>
        <h4
          style={{
            color: '#FFFFFF',
            marginBottom: '8px',
            fontFamily: '"Space Grotesk"',
          }}
        >
          Medium Row (Height: 16px - Default)
        </h4>
        <Skeleton variant="row" width="100%" />
      </div>

      <div>
        <h4
          style={{
            color: '#FFFFFF',
            marginBottom: '8px',
            fontFamily: '"Space Grotesk"',
          }}
        >
          Large Row (Height: 24px)
        </h4>
        <Skeleton variant="row" width="100%" height={24} />
      </div>
    </div>
  ),
};

/**
 * Circle sizes - different sized circular skeletons
 */
export const CircleSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <p
          style={{
            color: '#FFFFFF',
            marginBottom: '8px',
            fontFamily: '"Space Grotesk"',
          }}
        >
          Small (32px)
        </p>
        <Skeleton variant="circle" width={32} height={32} />
      </div>
      <div style={{ textAlign: 'center' }}>
        <p
          style={{
            color: '#FFFFFF',
            marginBottom: '8px',
            fontFamily: '"Space Grotesk"',
          }}
        >
          Medium (48px)
        </p>
        <Skeleton variant="circle" width={48} height={48} />
      </div>
      <div style={{ textAlign: 'center' }}>
        <p
          style={{
            color: '#FFFFFF',
            marginBottom: '8px',
            fontFamily: '"Space Grotesk"',
          }}
        >
          Large (64px)
        </p>
        <Skeleton variant="circle" width={64} height={64} />
      </div>
      <div style={{ textAlign: 'center' }}>
        <p
          style={{
            color: '#FFFFFF',
            marginBottom: '8px',
            fontFamily: '"Space Grotesk"',
          }}
        >
          XL (80px)
        </p>
        <Skeleton variant="circle" width={80} height={80} />
      </div>
    </div>
  ),
};

/**
 * Text loading pattern - realistic text skeleton
 */
export const TextLoading: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <h4
        style={{
          color: '#FFFFFF',
          marginBottom: '8px',
          fontFamily: '"Space Grotesk"',
        }}
      >
        Text Loading Pattern
      </h4>
      <Skeleton variant="row" width="100%" height={20} />
      <Skeleton variant="row" width="85%" height={20} />
      <Skeleton variant="row" width="70%" height={20} />
      <Skeleton variant="row" width="90%" height={20} />
      <Skeleton variant="row" width="60%" height={20} />
    </div>
  ),
};

/**
 * User card loading - realistic card with avatar and text
 */
export const UserCardLoading: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        padding: '24px',
        backgroundColor: '#1a1a1a',
        borderRadius: '12px',
        width: '100%',
        maxWidth: '400px',
      }}
    >
      {/* Header with avatar and name */}
      <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
        <Skeleton variant="circle" width={48} height={48} />
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
          }}
        >
          <Skeleton variant="row" width="70%" height={18} />
          <Skeleton variant="row" width="50%" height={14} />
        </div>
      </div>

      {/* Content */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <Skeleton variant="row" width="100%" height={16} />
        <Skeleton variant="row" width="90%" height={16} />
        <Skeleton variant="row" width="75%" height={16} />
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
        <Skeleton variant="row" width="80px" height={32} />
        <Skeleton variant="row" width="100px" height={32} />
      </div>
    </div>
  ),
};

/**
 * Table loading - data table skeleton
 */
export const TableLoading: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '2px',
        backgroundColor: '#1a1a1a',
        borderRadius: '8px',
        overflow: 'hidden',
        width: '100%',
      }}
    >
      {/* Table header */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr 100px',
          gap: '16px',
          padding: '16px',
          backgroundColor: '#0f0f0f',
        }}
      >
        <Skeleton variant="row" width="80px" height={14} />
        <Skeleton variant="row" width="60px" height={14} />
        <Skeleton variant="row" width="70px" height={14} />
        <Skeleton variant="row" width="50px" height={14} />
      </div>

      {/* Table rows */}
      {Array.from({ length: 4 }, (_, i) => (
        <div
          key={i}
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr 100px',
            gap: '16px',
            padding: '16px',
            backgroundColor: i % 2 === 0 ? '#1f1f1f' : '#1a1a1a',
          }}
        >
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <Skeleton variant="circle" width={32} height={32} />
            <Skeleton variant="row" width="120px" height={16} />
          </div>
          <Skeleton variant="row" width="80px" height={16} />
          <Skeleton variant="row" width="60px" height={16} />
          <Skeleton variant="row" width="70px" height={28} />
        </div>
      ))}
    </div>
  ),
};

/**
 * Card grid loading - multiple cards loading state
 */
export const CardGridLoading: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '20px',
        width: '100%',
      }}
    >
      {Array.from({ length: 4 }, (_, i) => (
        <div
          key={i}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            padding: '16px',
            backgroundColor: '#1a1a1a',
            borderRadius: '8px',
          }}
        >
          <Skeleton variant="row" width="100%" height={120} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <Skeleton variant="row" width="90%" height={18} />
            <Skeleton variant="row" width="100%" height={14} />
            <Skeleton variant="row" width="70%" height={14} />
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Skeleton variant="row" width="60px" height={16} />
            <Skeleton variant="row" width="80px" height={32} />
          </div>
        </div>
      ))}
    </div>
  ),
};
