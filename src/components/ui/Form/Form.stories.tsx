import type { Meta, StoryObj } from '@storybook/react-vite';
import { z } from 'zod';
import {
  Form,
  FormTextField,
  FormDropdown,
  FormTextarea,
  FormSubmitButton,
} from './index';
import { TextField } from '../TextField';
import { Dropdown } from '../Dropdown';
import { Textarea } from '../Textarea';

const meta = {
  title: 'Form',
  component: Form,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Modern Form component with React Hook Form integration and Zod validation. ' +
          'Works seamlessly with our existing component library (TextField, Dropdown, Textarea).',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Form>;

export default meta;
type Story = StoryObj<typeof meta>;

// Schema for user profile form
const userProfileSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  role: z.string().min(1, 'Please select a role'),
  bio: z.string().max(500, 'Bio must not exceed 500 characters').optional(),
});

type UserProfileForm = z.infer<typeof userProfileSchema>;

// Role options
const roleOptions = [
  { value: 'developer', label: 'Developer' },
  { value: 'designer', label: 'Designer' },
  { value: 'manager', label: 'Manager' },
  { value: 'admin', label: 'Administrator' },
];

export const BasicForm: Story = {
  args: {
    onSubmit: (data) => {
      console.log('Form submitted:', data);
      alert(`Form submitted with data: ${JSON.stringify(data, null, 2)}`);
    },
    validation: userProfileSchema,
    defaultValues: {
      name: '',
      email: '',
      role: '',
      bio: '',
    },
  },
  render: (args) => (
    <div className="w-96 space-y-6 bg-black p-6 rounded-lg">
      <Form<UserProfileForm> {...args}>
        <FormTextField<UserProfileForm>
          name="name"
          label="Full Name"
          placeholder="Enter your full name"
          required
        />

        <FormTextField<UserProfileForm>
          name="email"
          label="Email Address"
          type="email"
          placeholder="Enter your email"
          required
        />

        <FormDropdown<UserProfileForm>
          name="role"
          label="Role"
          placeholder="Select your role"
          options={roleOptions}
          required
        />

        <FormTextarea<UserProfileForm>
          name="bio"
          label="Bio"
          placeholder="Tell us about yourself (optional)"
          maxLength={500}
          showCharCount
        />

        <FormSubmitButton>Save Profile</FormSubmitButton>
      </Form>
    </div>
  ),
};

export const WithDefaultValues: Story = {
  args: {
    onSubmit: (data) => {
      console.log('Form submitted:', data);
      alert(`Form submitted with data: ${JSON.stringify(data, null, 2)}`);
    },
    validation: userProfileSchema,
    defaultValues: {
      name: 'John Doe',
      email: 'john.doe@example.com',
      role: 'developer',
      bio: 'Passionate frontend developer with 5+ years experience.',
    },
  },
  render: (args) => (
    <div className="w-96 space-y-6 bg-black p-6 rounded-lg">
      <Form<UserProfileForm> {...args}>
        <FormTextField<UserProfileForm>
          name="name"
          label="Full Name"
          placeholder="Enter your full name"
          required
        />

        <FormTextField<UserProfileForm>
          name="email"
          label="Email Address"
          type="email"
          placeholder="Enter your email"
          required
        />

        <FormDropdown<UserProfileForm>
          name="role"
          label="Role"
          placeholder="Select your role"
          options={roleOptions}
          required
        />

        <FormTextarea<UserProfileForm>
          name="bio"
          label="Bio"
          placeholder="Tell us about yourself (optional)"
          maxLength={500}
          showCharCount
        />

        <FormSubmitButton>Update Profile</FormSubmitButton>
      </Form>
    </div>
  ),
};

export const LoadingState: Story = {
  args: {
    onSubmit: async (data) => {
      console.log('Form submitted:', data);
      // Simulate async operation
      await new Promise((resolve) => setTimeout(resolve, 2000));
      alert(`Form submitted with data: ${JSON.stringify(data, null, 2)}`);
    },
    validation: userProfileSchema,
    defaultValues: {
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      role: 'designer',
      bio: '',
    },
  },
  render: (args) => (
    <div className="w-96 space-y-6 bg-black p-6 rounded-lg">
      <Form<UserProfileForm> {...args}>
        <FormTextField<UserProfileForm>
          name="name"
          label="Full Name"
          placeholder="Enter your full name"
          required
        />

        <FormTextField<UserProfileForm>
          name="email"
          label="Email Address"
          type="email"
          placeholder="Enter your email"
          required
        />

        <FormDropdown<UserProfileForm>
          name="role"
          label="Role"
          placeholder="Select your role"
          options={roleOptions}
          required
        />

        <FormTextarea<UserProfileForm>
          name="bio"
          label="Bio"
          placeholder="Tell us about yourself (optional)"
          maxLength={500}
          showCharCount
        />

        <FormSubmitButton loadingText="Saving Profile...">
          Save Profile
        </FormSubmitButton>
      </Form>
    </div>
  ),
};

// Schema for standalone components demonstration
const standaloneSchema = z.object({
  query: z.string().min(1, 'Search query is required'),
  category: z.string().min(1, 'Please select a category'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
});

type StandaloneForm = z.infer<typeof standaloneSchema>;

const categoryOptions = [
  { value: 'bugs', label: 'Bug Reports' },
  { value: 'features', label: 'Feature Requests' },
  { value: 'support', label: 'Support' },
  { value: 'feedback', label: 'General Feedback' },
];

export const StandaloneComponents: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Shows how TextField, Dropdown, and Textarea automatically integrate with form context when used with a name prop.',
      },
    },
  },
  args: {
    onSubmit: (data) => {
      console.log('Form submitted:', data);
      alert(`Form submitted with data: ${JSON.stringify(data, null, 2)}`);
    },
    validation: standaloneSchema,
    defaultValues: {
      query: '',
      category: '',
      description: '',
    },
  },
  render: (args) => (
    <div className="w-96 space-y-6 bg-black p-6 rounded-lg">
      <Form<StandaloneForm> {...args}>
        <TextField
          name="query"
          label="Search Query"
          variant="search"
          placeholder="Search for issues..."
          required
        />

        <Dropdown
          name="category"
          label="Category"
          placeholder="Select a category"
          options={categoryOptions}
          required
        />

        <Textarea
          name="description"
          label="Description"
          placeholder="Provide detailed information..."
          required
          maxLength={1000}
          showCharCount
        />

        <FormSubmitButton>Submit Request</FormSubmitButton>
      </Form>
    </div>
  ),
};

// Validation modes demonstration
export const ValidationModes: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Demonstrates different validation modes: onSubmit (default), onChange, onBlur.',
      },
    },
  },
  args: {
    onSubmit: (data) => {
      console.log('Form submitted:', data);
      alert(`Form submitted with data: ${JSON.stringify(data, null, 2)}`);
    },
    validation: userProfileSchema,
    mode: 'onChange', // Live validation
    defaultValues: {
      name: '',
      email: '',
      role: '',
      bio: '',
    },
  },
  render: (args) => (
    <div className="w-96 space-y-6 bg-black p-6 rounded-lg">
      <div className="text-center mb-4">
        <p className="text-olly-grey-300 text-sm">
          Live validation mode (onChange) - errors appear as you type
        </p>
      </div>

      <Form<UserProfileForm> {...args}>
        <FormTextField<UserProfileForm>
          name="name"
          label="Full Name"
          placeholder="Enter your full name"
          required
        />

        <FormTextField<UserProfileForm>
          name="email"
          label="Email Address"
          type="email"
          placeholder="Enter your email"
          required
        />

        <FormDropdown<UserProfileForm>
          name="role"
          label="Role"
          placeholder="Select your role"
          options={roleOptions}
          required
        />

        <FormTextarea<UserProfileForm>
          name="bio"
          label="Bio"
          placeholder="Tell us about yourself (optional)"
          maxLength={500}
          showCharCount
        />

        <FormSubmitButton>Save Profile</FormSubmitButton>
      </Form>
    </div>
  ),
};

// Mixed component usage
export const MixedComponents: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Shows mixing FormTextField/FormDropdown components with standalone TextField/Dropdown components in the same form.',
      },
    },
  },
  args: {
    onSubmit: (data) => {
      console.log('Form submitted:', data);
      alert(`Form submitted with data: ${JSON.stringify(data, null, 2)}`);
    },
    validation: userProfileSchema,
    defaultValues: {
      name: '',
      email: '',
      role: '',
      bio: '',
    },
  },
  render: (args) => (
    <div className="w-96 space-y-6 bg-black p-6 rounded-lg">
      <div className="text-center mb-4">
        <p className="text-olly-grey-300 text-sm">
          Mixing Form components with standalone components
        </p>
      </div>

      <Form<UserProfileForm> {...args}>
        {/* Using Form components */}
        <FormTextField<UserProfileForm>
          name="name"
          label="Full Name (FormTextField)"
          placeholder="Enter your full name"
          required
        />

        {/* Using standalone components with name prop */}
        <TextField
          name="email"
          label="Email Address (TextField with name)"
          type="email"
          placeholder="Enter your email"
          required
        />

        <FormDropdown<UserProfileForm>
          name="role"
          label="Role (FormDropdown)"
          placeholder="Select your role"
          options={roleOptions}
          required
        />

        <Textarea
          name="bio"
          label="Bio (Textarea with name)"
          placeholder="Tell us about yourself (optional)"
          maxLength={500}
          showCharCount
        />

        <FormSubmitButton>Save Profile</FormSubmitButton>
      </Form>
    </div>
  ),
};

// Chip variant dropdown
const chipFormSchema = z.object({
  status: z.string().min(1, 'Please select a status'),
  priority: z.string().min(1, 'Please select a priority'),
});

type ChipForm = z.infer<typeof chipFormSchema>;

const statusOptions = [
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
  { value: 'pending', label: 'Pending' },
];

const priorityOptions = [
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
  { value: 'urgent', label: 'Urgent' },
];

export const ChipDropdowns: Story = {
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates Dropdown components with chip variant in forms.',
      },
    },
  },
  args: {
    onSubmit: (data) => {
      console.log('Form submitted:', data);
      alert(`Form submitted with data: ${JSON.stringify(data, null, 2)}`);
    },
    validation: chipFormSchema,
    defaultValues: {
      status: 'active',
      priority: 'medium',
    },
  },
  render: (args) => (
    <div className="w-96 space-y-6 bg-black p-6 rounded-lg">
      <div className="text-center mb-4">
        <p className="text-olly-grey-300 text-sm">Chip variant dropdowns</p>
      </div>

      <Form<ChipForm> {...args}>
        <div className="flex gap-4 items-end">
          <Dropdown
            name="status"
            label="Status"
            options={statusOptions}
            variant="chip"
            required
          />

          <Dropdown
            name="priority"
            label="Priority"
            options={priorityOptions}
            variant="chip"
            required
          />
        </div>

        <FormSubmitButton>Update</FormSubmitButton>
      </Form>
    </div>
  ),
};
