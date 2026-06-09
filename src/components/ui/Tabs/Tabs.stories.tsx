import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './index';

const meta: Meta<typeof Tabs> = {
  title: 'Tabs',
  component: Tabs,
  decorators: [
    (Story) => (
      <div
        style={{
          backgroundColor: '#24272a',
          padding: '40px',
          minHeight: '400px',
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
    value: {
      control: { type: 'text' },
      description: 'Controlled active tab value',
    },
    defaultValue: {
      control: { type: 'text' },
      description: 'Default active tab for uncontrolled usage',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default tabs - standard segmented control style with sliding animation
 */
export const Default: Story = {
  args: {
    defaultValue: 'overview',
  },
  render: (args) => (
    <Tabs {...args}>
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="analytics">Analytics</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>

      <TabsContent value="overview">
        <div
          style={{
            padding: '24px',
            backgroundColor: '#1a1a1a',
            borderRadius: '8px',
            color: '#FFFFFF',
            fontFamily: '"Space Grotesk"',
          }}
        >
          <h3 style={{ marginBottom: '16px', fontSize: '20px' }}>Overview</h3>
          <p>
            Welcome to the overview section. Here you can see general
            information and key metrics.
          </p>
        </div>
      </TabsContent>

      <TabsContent value="analytics">
        <div
          style={{
            padding: '24px',
            backgroundColor: '#1a1a1a',
            borderRadius: '8px',
            color: '#FFFFFF',
            fontFamily: '"Space Grotesk"',
          }}
        >
          <h3 style={{ marginBottom: '16px', fontSize: '20px' }}>Analytics</h3>
          <p>Detailed analytics and reporting data would be displayed here.</p>
        </div>
      </TabsContent>

      <TabsContent value="settings">
        <div
          style={{
            padding: '24px',
            backgroundColor: '#1a1a1a',
            borderRadius: '8px',
            color: '#FFFFFF',
            fontFamily: '"Space Grotesk"',
          }}
        >
          <h3 style={{ marginBottom: '16px', fontSize: '20px' }}>Settings</h3>
          <p>Configure your preferences and application settings.</p>
        </div>
      </TabsContent>
    </Tabs>
  ),
};

/**
 * Controlled tabs - demonstrates controlled state management
 */
export const Controlled: Story = {
  render: () => {
    const [activeTab, setActiveTab] = useState('home');

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div
          style={{
            padding: '16px',
            backgroundColor: '#1a1a1a',
            borderRadius: '8px',
            fontFamily: '"Space Grotesk"',
            color: '#FFFFFF',
          }}
        >
          <strong>Current Tab:</strong> {activeTab}
          <div style={{ marginTop: '8px', display: 'flex', gap: '8px' }}>
            <button
              onClick={() => setActiveTab('home')}
              style={{
                padding: '4px 12px',
                backgroundColor: activeTab === 'home' ? '#e2e735' : '#38373A',
                color: activeTab === 'home' ? '#000' : '#FFFFFF',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontFamily: '"Space Grotesk"',
              }}
            >
              Go to Home
            </button>
            <button
              onClick={() => setActiveTab('about')}
              style={{
                padding: '4px 12px',
                backgroundColor: activeTab === 'about' ? '#e2e735' : '#38373A',
                color: activeTab === 'about' ? '#000' : '#FFFFFF',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontFamily: '"Space Grotesk"',
              }}
            >
              Go to About
            </button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="home">Home</TabsTrigger>
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="contact">Contact</TabsTrigger>
          </TabsList>

          <TabsContent value="home">
            <div
              style={{
                padding: '24px',
                backgroundColor: '#1a1a1a',
                borderRadius: '8px',
                color: '#FFFFFF',
                fontFamily: '"Space Grotesk"',
              }}
            >
              <h3 style={{ marginBottom: '16px', fontSize: '20px' }}>Home</h3>
              <p>
                Welcome to the home page! This tab is controlled externally.
              </p>
            </div>
          </TabsContent>

          <TabsContent value="about">
            <div
              style={{
                padding: '24px',
                backgroundColor: '#1a1a1a',
                borderRadius: '8px',
                color: '#FFFFFF',
                fontFamily: '"Space Grotesk"',
              }}
            >
              <h3 style={{ marginBottom: '16px', fontSize: '20px' }}>About</h3>
              <p>Learn more about us and our mission.</p>
            </div>
          </TabsContent>

          <TabsContent value="contact">
            <div
              style={{
                padding: '24px',
                backgroundColor: '#1a1a1a',
                borderRadius: '8px',
                color: '#FFFFFF',
                fontFamily: '"Space Grotesk"',
              }}
            >
              <h3 style={{ marginBottom: '16px', fontSize: '20px' }}>
                Contact
              </h3>
              <p>Get in touch with us through various channels.</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    );
  },
};

/**
 * With disabled tab - shows how disabled tabs work
 */
export const WithDisabledTab: Story = {
  args: {
    defaultValue: 'general',
  },
  render: (args) => (
    <Tabs {...args}>
      <TabsList>
        <TabsTrigger value="general">General</TabsTrigger>
        <TabsTrigger value="security">Security</TabsTrigger>
        <TabsTrigger value="advanced" disabled>
          Advanced
        </TabsTrigger>
        <TabsTrigger value="help">Help</TabsTrigger>
      </TabsList>

      <TabsContent value="general">
        <div
          style={{
            padding: '24px',
            backgroundColor: '#1a1a1a',
            borderRadius: '8px',
            color: '#FFFFFF',
            fontFamily: '"Space Grotesk"',
          }}
        >
          <h3 style={{ marginBottom: '16px', fontSize: '20px' }}>
            General Settings
          </h3>
          <p>Basic application settings and preferences.</p>
        </div>
      </TabsContent>

      <TabsContent value="security">
        <div
          style={{
            padding: '24px',
            backgroundColor: '#1a1a1a',
            borderRadius: '8px',
            color: '#FFFFFF',
            fontFamily: '"Space Grotesk"',
          }}
        >
          <h3 style={{ marginBottom: '16px', fontSize: '20px' }}>
            Security Settings
          </h3>
          <p>Manage your security preferences and two-factor authentication.</p>
        </div>
      </TabsContent>

      <TabsContent value="help">
        <div
          style={{
            padding: '24px',
            backgroundColor: '#1a1a1a',
            borderRadius: '8px',
            color: '#FFFFFF',
            fontFamily: '"Space Grotesk"',
          }}
        >
          <h3 style={{ marginBottom: '16px', fontSize: '20px' }}>
            Help & Support
          </h3>
          <p>Find help articles, contact support, and access documentation.</p>
        </div>
      </TabsContent>
    </Tabs>
  ),
};

/**
 * Complex content - tabs with rich content and animations
 */
export const ComplexContent: Story = {
  args: {
    defaultValue: 'metrics',
  },
  render: (args) => (
    <Tabs {...args}>
      <TabsList>
        <TabsTrigger value="metrics">Metrics</TabsTrigger>
        <TabsTrigger value="users">Users</TabsTrigger>
        <TabsTrigger value="revenue">Revenue</TabsTrigger>
      </TabsList>

      <TabsContent value="metrics">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '16px',
          }}
        >
          {[
            { label: 'Total Views', value: '2.1M', change: '+12%' },
            { label: 'Unique Visitors', value: '842K', change: '+8%' },
            { label: 'Bounce Rate', value: '24.3%', change: '-3%' },
            { label: 'Avg. Session', value: '4m 32s', change: '+15%' },
          ].map((metric, i) => (
            <div
              key={i}
              style={{
                padding: '20px',
                backgroundColor: '#1a1a1a',
                borderRadius: '8px',
                color: '#FFFFFF',
                fontFamily: '"Space Grotesk"',
              }}
            >
              <div
                style={{
                  fontSize: '14px',
                  color: '#919394',
                  marginBottom: '8px',
                }}
              >
                {metric.label}
              </div>
              <div
                style={{
                  fontSize: '24px',
                  fontWeight: 'bold',
                  marginBottom: '4px',
                }}
              >
                {metric.value}
              </div>
              <div
                style={{
                  fontSize: '12px',
                  color: metric.change.startsWith('+') ? '#8EFF9B' : '#F39A9B',
                }}
              >
                {metric.change} vs last month
              </div>
            </div>
          ))}
        </div>
      </TabsContent>

      <TabsContent value="users">
        <div
          style={{
            padding: '24px',
            backgroundColor: '#1a1a1a',
            borderRadius: '8px',
            color: '#FFFFFF',
            fontFamily: '"Space Grotesk"',
          }}
        >
          <h3 style={{ marginBottom: '16px', fontSize: '20px' }}>
            User Analytics
          </h3>
          <div
            style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>New Users</span>
              <span style={{ color: '#8EFF9B' }}>+1,234</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Returning Users</span>
              <span style={{ color: '#e2e735' }}>4,567</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Total Active</span>
              <span style={{ color: '#FFFFFF' }}>5,801</span>
            </div>
          </div>
        </div>
      </TabsContent>

      <TabsContent value="revenue">
        <div
          style={{
            padding: '24px',
            backgroundColor: '#1a1a1a',
            borderRadius: '8px',
            color: '#FFFFFF',
            fontFamily: '"Space Grotesk"',
          }}
        >
          <h3 style={{ marginBottom: '16px', fontSize: '20px' }}>
            Revenue Overview
          </h3>
          <div
            style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
          >
            <div>
              <div
                style={{
                  fontSize: '32px',
                  fontWeight: 'bold',
                  color: '#8EFF9B',
                }}
              >
                $24,589
              </div>
              <div style={{ fontSize: '14px', color: '#919394' }}>
                Total revenue this month
              </div>
            </div>
            <div style={{ height: '1px', backgroundColor: '#38373A' }}></div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: '18px', fontWeight: 'bold' }}>
                  $18,234
                </div>
                <div style={{ fontSize: '12px', color: '#919394' }}>
                  Subscriptions
                </div>
              </div>
              <div>
                <div style={{ fontSize: '18px', fontWeight: 'bold' }}>
                  $6,355
                </div>
                <div style={{ fontSize: '12px', color: '#919394' }}>
                  One-time
                </div>
              </div>
            </div>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  ),
};
