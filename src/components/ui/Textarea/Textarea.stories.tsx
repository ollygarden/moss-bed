import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Textarea } from './index';

const meta: Meta<typeof Textarea> = {
  title: 'Textarea',
  component: Textarea,
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
        <div style={{ width: '400px' }}>
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
    size: {
      control: { type: 'select' },
      options: ['small', 'default', 'large'],
      description: 'Size variant of the textarea',
    },
    state: {
      control: { type: 'select' },
      options: ['default', 'error', 'success', 'disabled'],
      description: 'Visual state of the textarea',
    },
    label: {
      control: { type: 'text' },
      description: 'Label text displayed above the textarea',
    },
    placeholder: {
      control: { type: 'text' },
      description: 'Placeholder text shown when textarea is empty',
    },
    helperText: {
      control: { type: 'text' },
      description: 'Helper text displayed below the textarea',
    },
    errorMessage: {
      control: { type: 'text' },
      description: 'Error message displayed when validation fails',
    },
    required: {
      control: { type: 'boolean' },
      description: 'Whether the textarea is required (shows asterisk)',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Whether the textarea is disabled',
    },
    maxLength: {
      control: { type: 'number' },
      description: 'Maximum character limit',
    },
    showCharCount: {
      control: { type: 'boolean' },
      description: 'Whether to show character count',
    },
    rows: {
      control: { type: 'number' },
      description: 'Number of visible text lines',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default textarea - basic multi-line text input
 */
export const Default: Story = {
  args: {
    label: 'Description',
    placeholder: 'Enter your description here...',
    size: 'default',
  },
};

/**
 * With helper text - provides additional context to users
 */
export const WithHelperText: Story = {
  args: {
    label: 'Comments',
    placeholder: 'Share your thoughts...',
    helperText: 'Please provide detailed feedback to help us improve.',
    size: 'default',
  },
};

/**
 * Required field - shows asterisk and validation styling
 */
export const Required: Story = {
  args: {
    label: 'Project Description',
    placeholder: 'Describe your project goals and objectives...',
    required: true,
    helperText: 'This field is required for project approval.',
    size: 'default',
  },
};

/**
 * Error state - validation failed with error message
 */
export const ErrorState: Story = {
  args: {
    label: 'Feedback',
    placeholder: 'Enter your feedback...',
    value: 'Too short',
    errorMessage: 'Description must be at least 20 characters long.',
    required: true,
    size: 'default',
  },
};

/**
 * Disabled state - non-interactive textarea
 */
export const Disabled: Story = {
  args: {
    label: 'System Notes',
    value:
      'This field is automatically populated by the system and cannot be edited.',
    disabled: true,
    size: 'default',
  },
};

/**
 * With character count - shows current character usage
 */
export const WithCharacterCount: Story = {
  render: () => {
    const [value, setValue] = useState(
      'This is a sample message with character counting enabled.'
    );

    return (
      <Textarea
        label="Message"
        placeholder="Type your message..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        showCharCount={true}
        helperText="Express yourself clearly and concisely."
      />
    );
  },
};

/**
 * With character limit - enforces maximum character count
 */
export const WithCharacterLimit: Story = {
  render: () => {
    const [value, setValue] = useState(
      'This textarea has a character limit of 200 characters.'
    );

    return (
      <Textarea
        label="Brief Summary"
        placeholder="Summarize in 200 characters or less..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        maxLength={200}
        showCharCount={true}
        helperText="Keep your summary concise and to the point."
      />
    );
  },
};

/**
 * Small size - compact textarea for short inputs
 */
export const SmallSize: Story = {
  args: {
    label: 'Quick Note',
    placeholder: 'Add a quick note...',
    size: 'small',
    helperText: 'Brief notes only.',
  },
};

/**
 * Large size - expanded textarea for longer content
 */
export const LargeSize: Story = {
  args: {
    label: 'Detailed Report',
    placeholder: 'Provide a comprehensive report...',
    size: 'large',
    helperText: 'Include all relevant details and findings.',
  },
};

/**
 * Form integration - multiple textareas in a form-like layout
 */
export const FormIntegration: Story = {
  render: () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [notes, setNotes] = useState('');

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
          width: '100%',
        }}
      >
        <Textarea
          label="Title"
          placeholder="Enter project title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          size="small"
          maxLength={100}
          showCharCount
        />

        <Textarea
          label="Description"
          placeholder="Describe the project in detail..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          size="default"
          helperText="Provide a comprehensive overview of the project scope."
          maxLength={500}
          showCharCount
        />

        <Textarea
          label="Additional Notes"
          placeholder="Any additional information..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          size="large"
          helperText="Optional: Include any extra details or considerations."
        />
      </div>
    );
  },
};

/**
 * Interactive character limit - shows warning states as limit approaches
 */
export const InteractiveCharacterLimit: Story = {
  render: () => {
    const [value, setValue] = useState('');
    const maxLength = 150;
    const currentLength = value.length;
    const warningThreshold = maxLength * 0.8;

    let helperText = 'Share your thoughts and ideas.';
    if (currentLength >= maxLength) {
      helperText = 'Character limit reached. Please shorten your message.';
    } else if (currentLength >= warningThreshold) {
      helperText = `Approaching character limit. ${maxLength - currentLength} characters remaining.`;
    }

    const errorMessage =
      currentLength >= maxLength ? 'Message is too long' : undefined;
    return (
      <Textarea
        label="Feedback"
        placeholder="What do you think about our service?"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        maxLength={maxLength}
        showCharCount
        helperText={helperText}
        {...(errorMessage ? { errorMessage } : {})}
      />
    );
  },
};

/**
 * All sizes showcase - comparison of different textarea sizes
 */
export const AllSizes: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '32px',
        width: '100%',
      }}
    >
      <div>
        <h3
          style={{
            color: '#FFFFFF',
            marginBottom: '16px',
            fontFamily: '"Space Grotesk"',
          }}
        >
          Small Size
        </h3>
        <Textarea
          label="Quick Input"
          placeholder="Small textarea for brief content..."
          size="small"
          helperText="Compact size for short inputs."
        />
      </div>

      <div>
        <h3
          style={{
            color: '#FFFFFF',
            marginBottom: '16px',
            fontFamily: '"Space Grotesk"',
          }}
        >
          Default Size
        </h3>
        <Textarea
          label="Standard Input"
          placeholder="Default textarea for regular content..."
          size="default"
          helperText="Standard size for most use cases."
        />
      </div>

      <div>
        <h3
          style={{
            color: '#FFFFFF',
            marginBottom: '16px',
            fontFamily: '"Space Grotesk"',
          }}
        >
          Large Size
        </h3>
        <Textarea
          label="Extended Input"
          placeholder="Large textarea for extensive content..."
          size="large"
          helperText="Large size for longer text content."
        />
      </div>
    </div>
  ),
};
