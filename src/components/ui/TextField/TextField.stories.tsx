import type { Meta, StoryObj } from '@storybook/react-vite';
import { TextField } from './index';

const meta: Meta<typeof TextField> = {
  title: 'TextField',
  component: TextField,
  decorators: [
    (Story) => (
      <div
        style={{
          backgroundColor: '#38373A',
          padding: '20px',
          minHeight: '200px',
        }}
      >
        <Story />
      </div>
    ),
  ],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A flexible text input field component with black background, white text, no borders, and support for labels, helper text, error states, and search variant.',
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'search'],
      description: 'Visual variant of the text field',
    },
    state: {
      control: 'select',
      options: ['default', 'error', 'success', 'disabled'],
      description: 'Visual state of the text field',
    },
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'url', 'tel'],
      description: 'HTML input type',
    },
    label: {
      control: 'text',
      description: 'Label text displayed above the input',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text shown when input is empty',
    },
    helperText: {
      control: 'text',
      description: 'Helper text displayed below the input',
    },
    errorMessage: {
      control: 'text',
      description:
        'Error message displayed below the input (overrides helperText)',
    },
    required: {
      control: 'boolean',
      description: 'Whether the field is required (adds asterisk to label)',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the input is disabled',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic Examples
export const Default: Story = {
  args: {
    placeholder: 'Enter text here...',
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Full Name',
    placeholder: 'John Doe',
  },
};

export const Required: Story = {
  args: {
    label: 'Email Address',
    placeholder: 'john@example.com',
    type: 'email',
    required: true,
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Username',
    placeholder: 'johndoe',
    helperText: 'Choose a unique username that will be visible to other users',
  },
};

// State Variants
export const States: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <TextField
        label="Default State"
        placeholder="Default text field"
        helperText="This is a normal text field"
      />
      <TextField
        label="Success State"
        placeholder="Valid input"
        helperText="Great! This looks good"
        state="success"
        defaultValue="valid@email.com"
      />
      <TextField
        label="Error State"
        placeholder="Invalid input"
        errorMessage="Please enter a valid email address"
        defaultValue="invalid-email"
      />
      <TextField
        label="Disabled State"
        placeholder="Cannot edit this field"
        helperText="This field is not editable"
        disabled
        defaultValue="Disabled value"
      />
    </div>
  ),
};

// Input Types
export const InputTypes: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <TextField type="text" label="Text" placeholder="Regular text input" />
      <TextField type="email" label="Email" placeholder="john@example.com" />
      <TextField
        type="password"
        label="Password"
        placeholder="Enter password"
      />
      <TextField type="number" label="Number" placeholder="123" />
      <TextField type="url" label="URL" placeholder="https://example.com" />
      <TextField type="tel" label="Phone" placeholder="(555) 123-4567" />
    </div>
  ),
};

// Real-world Examples
export const LoginForm: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <TextField
        type="email"
        label="Email"
        placeholder="Enter your email"
        required
      />
      <TextField
        type="password"
        label="Password"
        placeholder="Enter your password"
        required
      />
    </div>
  ),
};

export const ContactForm: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <TextField label="First Name" placeholder="John" required />
      <TextField label="Last Name" placeholder="Doe" required />
      <TextField
        type="email"
        label="Email"
        placeholder="john.doe@example.com"
        helperText="We'll never share your email with anyone else"
        required
      />
      <TextField
        type="tel"
        label="Phone"
        placeholder="(555) 123-4567"
        helperText="Optional: For urgent notifications only"
      />
    </div>
  ),
};

export const ValidationExample: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <TextField
        label="Valid Email"
        type="email"
        defaultValue="user@example.com"
        state="success"
        helperText="Email format is correct"
      />
      <TextField
        label="Invalid Email"
        type="email"
        defaultValue="invalid-email"
        errorMessage="Please enter a valid email address"
      />
      <TextField
        label="Username"
        defaultValue="user123"
        state="success"
        helperText="Username is available"
      />
      <TextField
        label="Username Taken"
        defaultValue="admin"
        errorMessage="This username is already taken"
      />
    </div>
  ),
};

// Edge Cases
export const EdgeCases: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <TextField
        label="Very Long Label That Might Wrap To Multiple Lines In Some Cases"
        placeholder="Input with long label"
        helperText="This demonstrates how the component handles longer text content"
      />
      <TextField
        label="Long Error Message"
        placeholder="Input with long error"
        errorMessage="This is a very long error message that explains in detail what went wrong and how the user can fix the issue"
      />
      <TextField label="No Placeholder" />
      <TextField
        placeholder="No Label, Just Placeholder"
        helperText="This field has no label"
      />
    </div>
  ),
};

export const InteractiveDemo: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <TextField
        label="Try typing here"
        placeholder="Interactive text field"
        helperText="This field responds to your input"
      />
      <TextField
        label="Required field"
        placeholder="Must be filled"
        required
        helperText="This field is required"
      />
    </div>
  ),
};

// Search Variant Examples
export const SearchField: Story = {
  args: {
    variant: 'search',
    placeholder: 'Search...',
  },
};

export const SearchWithValue: Story = {
  args: {
    variant: 'search',
    placeholder: 'Search...',
    defaultValue: 'test search text',
    label: 'Search with text to clear',
  },
};

export const SearchWithLabel: Story = {
  args: {
    variant: 'search',
    label: 'Search Products',
    placeholder: 'Type to search products...',
  },
};

export const SearchStates: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <TextField
        variant="search"
        placeholder="Default search field"
        helperText="Type to search"
      />
      <TextField
        variant="search"
        placeholder="Search with value"
        defaultValue="React components"
      />
      <TextField
        variant="search"
        placeholder="Disabled search"
        disabled
        helperText="Search is temporarily unavailable"
      />
      <TextField
        variant="search"
        placeholder="Search with error"
        errorMessage="No results found for your search"
        defaultValue="xyz123"
      />
    </div>
  ),
};

export const RealWorldSearch: Story = {
  render: () => (
    <div className="space-y-6">
      <div className="w-80">
        <TextField
          variant="search"
          placeholder="Search users..."
          label="User Search"
          helperText="Search by name, email, or username"
        />
      </div>
      <div className="w-80">
        <TextField
          variant="search"
          placeholder="Find services..."
          label="Service Discovery"
          helperText="Search across all registered services"
        />
      </div>
      <div className="w-80">
        <TextField
          variant="search"
          placeholder="Search documentation..."
          label="Documentation"
        />
      </div>
    </div>
  ),
};

export const SearchWithResults: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <TextField
        variant="search"
        placeholder="Search insights..."
        defaultValue="performance"
        state="success"
        helperText="Found 12 results"
      />
      <TextField
        variant="search"
        placeholder="Search logs..."
        defaultValue="error 500"
        helperText="Searching in 1.2M log entries"
      />
      <TextField
        variant="search"
        placeholder="Search metrics..."
        defaultValue="cpu_usage"
        errorMessage="No metrics found matching 'cpu_usage'"
      />
    </div>
  ),
};
