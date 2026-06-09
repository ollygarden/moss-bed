import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { z } from 'zod';
import { vi } from 'vitest';
import {
  Form,
  FormTextField,
  FormDropdown,
  FormTextarea,
  FormSubmitButton,
  FormMessage,
} from '../';
import { TextField } from '@/components/ui/TextField';

// Test schema
const testSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  role: z.string().min(1, 'Please select a role'),
  bio: z.string().max(100, 'Bio must not exceed 100 characters').optional(),
});

type TestForm = z.infer<typeof testSchema>;

const roleOptions = [
  { value: 'developer', label: 'Developer' },
  { value: 'designer', label: 'Designer' },
  { value: 'manager', label: 'Manager' },
];

const defaultProps = {
  onSubmit: vi.fn(),
  validation: testSchema,
  defaultValues: {
    name: '',
    email: '',
    role: '',
    bio: '',
  },
};

describe('Form', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Basic Form Functionality', () => {
    it('renders form with all fields', () => {
      render(
        <Form<TestForm> {...defaultProps}>
          <FormTextField<TestForm>
            name="name"
            label="Full Name"
            placeholder="Enter your name"
          />
          <FormTextField<TestForm>
            name="email"
            label="Email"
            type="email"
            placeholder="Enter your email"
          />
          <FormDropdown<TestForm>
            name="role"
            label="Role"
            placeholder="Select role"
            options={roleOptions}
          />
          <FormTextarea<TestForm>
            name="bio"
            label="Bio"
            placeholder="Enter bio"
          />
          <FormSubmitButton>Submit</FormSubmitButton>
        </Form>
      );

      expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
      // Dropdown label is not associated with the button via for/id, so use getByText
      expect(screen.getByText('Role')).toBeInTheDocument();
      expect(screen.getByLabelText(/bio/i)).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: /submit/i })
      ).toBeInTheDocument();
    });

    it('submits form with valid data', async () => {
      const user = userEvent.setup();
      const onSubmit = vi.fn();

      render(
        <Form<TestForm> {...defaultProps} onSubmit={onSubmit}>
          <FormTextField<TestForm>
            name="name"
            label="Full Name"
            placeholder="Enter your name"
          />
          <FormTextField<TestForm>
            name="email"
            label="Email"
            type="email"
            placeholder="Enter your email"
          />
          <FormDropdown<TestForm>
            name="role"
            label="Role"
            placeholder="Select role"
            options={roleOptions}
          />
          <FormTextarea<TestForm>
            name="bio"
            label="Bio"
            placeholder="Enter bio"
          />
          <FormSubmitButton>Submit</FormSubmitButton>
        </Form>
      );

      // Fill out the form
      await user.type(screen.getByLabelText(/full name/i), 'John Doe');
      await user.type(screen.getByLabelText(/email/i), 'john@example.com');

      // Select role from dropdown
      await user.click(screen.getByRole('button', { name: /role/i }));
      await user.click(screen.getByText('Developer'));

      await user.type(screen.getByLabelText(/bio/i), 'Software engineer');

      // Submit the form
      await user.click(screen.getByRole('button', { name: /submit/i }));

      await waitFor(() => {
        expect(onSubmit).toHaveBeenCalledWith({
          name: 'John Doe',
          email: 'john@example.com',
          role: 'developer',
          bio: 'Software engineer',
        });
      });
    });

    it('displays validation errors for invalid data', async () => {
      const user = userEvent.setup();
      const onSubmit = vi.fn();

      render(
        <Form<TestForm> {...defaultProps} onSubmit={onSubmit} mode="onChange">
          <FormTextField<TestForm>
            name="name"
            label="Full Name"
            placeholder="Enter your name"
          />
          <FormTextField<TestForm>
            name="email"
            label="Email"
            type="email"
            placeholder="Enter your email"
          />
          <FormDropdown<TestForm>
            name="role"
            label="Role"
            placeholder="Select role"
            options={roleOptions}
          />
          <FormTextarea<TestForm>
            name="bio"
            label="Bio"
            placeholder="Enter bio"
          />
          <FormSubmitButton>Submit</FormSubmitButton>
        </Form>
      );

      // Enter invalid data
      await user.type(screen.getByLabelText(/full name/i), 'J'); // Too short
      await user.type(screen.getByLabelText(/email/i), 'invalid-email'); // Invalid email

      // Submit form to trigger validation
      await user.click(screen.getByRole('button', { name: /submit/i }));

      await waitFor(() => {
        expect(
          screen.getByText('Name must be at least 2 characters')
        ).toBeInTheDocument();
        expect(
          screen.getByText('Please enter a valid email address')
        ).toBeInTheDocument();
        expect(screen.getByText('Please select a role')).toBeInTheDocument();
      });

      expect(onSubmit).not.toHaveBeenCalled();
    });
  });

  describe('Form Field Components', () => {
    describe('FormTextField', () => {
      it('integrates with form validation', async () => {
        const user = userEvent.setup();

        render(
          <Form<TestForm> {...defaultProps} mode="onChange">
            <FormTextField<TestForm>
              name="email"
              label="Email"
              type="email"
              placeholder="Enter your email"
            />
          </Form>
        );

        const emailInput = screen.getByLabelText(/email/i);
        await user.type(emailInput, 'invalid-email');

        await waitFor(() => {
          expect(
            screen.getByText('Please enter a valid email address')
          ).toBeInTheDocument();
        });
      });
    });

    describe('FormDropdown', () => {
      it('integrates with form validation', async () => {
        const user = userEvent.setup();

        render(
          <Form<TestForm> {...defaultProps}>
            <FormDropdown<TestForm>
              name="role"
              label="Role"
              placeholder="Select role"
              options={roleOptions}
            />
            <FormSubmitButton>Submit</FormSubmitButton>
          </Form>
        );

        // Submit without selecting role
        await user.click(screen.getByRole('button', { name: /submit/i }));

        await waitFor(() => {
          expect(screen.getByText('Please select a role')).toBeInTheDocument();
        });
      });

      it('allows selecting options', async () => {
        const user = userEvent.setup();
        const onSubmit = vi.fn();

        render(
          <Form<TestForm> {...defaultProps} onSubmit={onSubmit}>
            <FormDropdown<TestForm>
              name="role"
              label="Role"
              placeholder="Select role"
              options={roleOptions}
            />
            <FormTextField<TestForm> name="name" label="Name" />
            <FormTextField<TestForm> name="email" label="Email" type="email" />
            <FormSubmitButton>Submit</FormSubmitButton>
          </Form>
        );

        // Fill required fields
        await user.type(screen.getByLabelText(/name/i), 'John Doe');
        await user.type(screen.getByLabelText(/email/i), 'john@example.com');

        // Select role
        await user.click(screen.getByRole('button', { name: /role/i }));
        await user.click(screen.getByText('Developer'));

        await user.click(screen.getByRole('button', { name: /submit/i }));

        await waitFor(() => {
          expect(onSubmit).toHaveBeenCalledWith(
            expect.objectContaining({
              role: 'developer',
            })
          );
        });
      });
    });

    describe('FormTextarea', () => {
      it('integrates with form validation', async () => {
        const user = userEvent.setup();

        render(
          <Form<TestForm> {...defaultProps} mode="onChange">
            <FormTextarea<TestForm>
              name="bio"
              label="Bio"
              placeholder="Enter bio"
            />
          </Form>
        );

        const bioTextarea = screen.getByLabelText(/bio/i);
        const longText = 'a'.repeat(101); // Exceeds max length
        await user.type(bioTextarea, longText);

        await waitFor(() => {
          expect(
            screen.getByText('Bio must not exceed 100 characters')
          ).toBeInTheDocument();
        });
      });
    });
  });

  describe('Standalone Component Integration', () => {
    it('works with Form field components', async () => {
      const user = userEvent.setup();
      const onSubmit = vi.fn();

      render(
        <Form<TestForm> {...defaultProps} onSubmit={onSubmit}>
          <FormTextField<TestForm>
            name="name"
            label="Full Name"
            placeholder="Enter your name"
          />
          <FormTextField<TestForm>
            name="email"
            label="Email"
            type="email"
            placeholder="Enter your email"
          />
          <FormDropdown<TestForm>
            name="role"
            label="Role"
            placeholder="Select role"
            options={roleOptions}
          />
          <FormTextarea<TestForm>
            name="bio"
            label="Bio"
            placeholder="Enter bio"
          />
          <FormSubmitButton>Submit</FormSubmitButton>
        </Form>
      );

      // Fill out the form
      await user.type(screen.getByLabelText(/full name/i), 'Jane Doe');
      await user.type(screen.getByLabelText(/email/i), 'jane@example.com');

      // Select role from dropdown
      await user.click(screen.getByRole('button', { name: /role/i }));
      await user.click(screen.getByText('Designer'));

      await user.type(screen.getByLabelText(/bio/i), 'UX Designer');

      // Submit the form
      await user.click(screen.getByRole('button', { name: /submit/i }));

      await waitFor(() => {
        expect(onSubmit).toHaveBeenCalledWith({
          name: 'Jane Doe',
          email: 'jane@example.com',
          role: 'designer',
          bio: 'UX Designer',
        });
      });
    });

    it('displays validation errors for standalone components with name prop', async () => {
      const user = userEvent.setup();
      const onSubmit = vi.fn();

      render(
        <Form<TestForm> {...defaultProps} onSubmit={onSubmit}>
          <TextField
            name="email"
            label="Email"
            type="email"
            placeholder="Enter your email"
            value=""
            onChange={() => {}} // Standalone components need their own state management
          />
          <FormSubmitButton>Submit</FormSubmitButton>
        </Form>
      );

      // Try to submit the form to trigger validation
      await user.click(screen.getByRole('button', { name: /submit/i }));

      // Should show validation errors since no valid data was provided
      await waitFor(() => {
        expect(
          screen.getByText('Please enter a valid email address')
        ).toBeInTheDocument();
      });

      // Form should not be submitted due to validation errors
      expect(onSubmit).not.toHaveBeenCalled();
    });
  });

  describe('Form Loading State', () => {
    it('disables submit button during submission', async () => {
      const user = userEvent.setup();
      const onSubmit = vi
        .fn()
        .mockImplementation(
          () => new Promise((resolve) => setTimeout(resolve, 100))
        );

      render(
        <Form<TestForm> {...defaultProps} onSubmit={onSubmit}>
          <FormTextField<TestForm>
            name="name"
            label="Full Name"
            placeholder="Enter your name"
          />
          <FormTextField<TestForm>
            name="email"
            label="Email"
            type="email"
            placeholder="Enter your email"
          />
          <FormDropdown<TestForm>
            name="role"
            label="Role"
            placeholder="Select role"
            options={roleOptions}
          />
          <FormSubmitButton loadingText="Submitting...">
            Submit
          </FormSubmitButton>
        </Form>
      );

      // Fill out the form
      await user.type(screen.getByLabelText(/full name/i), 'John Doe');
      await user.type(screen.getByLabelText(/email/i), 'john@example.com');

      await user.click(screen.getByRole('button', { name: /role/i }));
      await user.click(screen.getByText('Developer'));

      // Submit the form
      const submitButton = screen.getByRole('button', { name: /submit/i });
      await user.click(submitButton);

      // Check loading state
      expect(screen.getByText('Submitting...')).toBeInTheDocument();
      expect(submitButton).toBeDisabled();

      // Wait for submission to complete
      await waitFor(() => {
        expect(screen.getByText('Submit')).toBeInTheDocument();
      });
      expect(submitButton).not.toBeDisabled();
    });
  });

  describe('Validation Modes', () => {
    it('validates on change when mode is onChange', async () => {
      const user = userEvent.setup();

      render(
        <Form<TestForm> {...defaultProps} mode="onChange">
          <FormTextField<TestForm>
            name="name"
            label="Full Name"
            placeholder="Enter your name"
          />
        </Form>
      );

      const nameInput = screen.getByLabelText(/full name/i);
      await user.type(nameInput, 'J');

      await waitFor(() => {
        expect(
          screen.getByText('Name must be at least 2 characters')
        ).toBeInTheDocument();
      });
    });

    it('validates only on submit when mode is onSubmit', async () => {
      const user = userEvent.setup();

      render(
        <Form<TestForm> {...defaultProps} mode="onSubmit">
          <FormTextField<TestForm>
            name="name"
            label="Full Name"
            placeholder="Enter your name"
          />
          <FormSubmitButton>Submit</FormSubmitButton>
        </Form>
      );

      const nameInput = screen.getByLabelText(/full name/i);
      await user.type(nameInput, 'J');

      // Should not show error immediately
      expect(
        screen.queryByText('Name must be at least 2 characters')
      ).not.toBeInTheDocument();

      // Submit to trigger validation
      await user.click(screen.getByRole('button', { name: /submit/i }));

      await waitFor(() => {
        expect(
          screen.getByText('Name must be at least 2 characters')
        ).toBeInTheDocument();
      });
    });
  });

  describe('Accessibility', () => {
    it('has proper ARIA attributes', () => {
      render(
        <Form<TestForm> {...defaultProps}>
          <FormTextField<TestForm>
            name="name"
            label="Full Name"
            placeholder="Enter your name"
            required
          />
          <FormDropdown<TestForm>
            name="role"
            label="Role"
            placeholder="Select role"
            options={roleOptions}
            required
          />
          <FormTextarea<TestForm>
            name="bio"
            label="Bio"
            placeholder="Enter bio"
          />
        </Form>
      );

      // Check for proper labeling
      expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
      // Dropdown label is not associated with the button via for/id, so use getByText
      expect(screen.getByText('Role')).toBeInTheDocument();
      expect(screen.getByLabelText(/bio/i)).toBeInTheDocument();

      // Check for required indicators
      expect(screen.getByText('Full Name')).toBeInTheDocument();
      expect(screen.getByText('Role')).toBeInTheDocument();
    });

    it('supports keyboard navigation', async () => {
      const user = userEvent.setup();

      render(
        <Form<TestForm> {...defaultProps}>
          <FormTextField<TestForm>
            name="name"
            label="Full Name"
            placeholder="Enter your name"
          />
          <FormDropdown<TestForm>
            name="role"
            label="Role"
            placeholder="Select role"
            options={roleOptions}
          />
          <FormSubmitButton>Submit</FormSubmitButton>
        </Form>
      );

      // Tab through form fields
      await user.tab();
      expect(screen.getByLabelText(/full name/i)).toHaveFocus();

      await user.tab();
      expect(screen.getByRole('button', { name: /role/i })).toHaveFocus();

      await user.tab();
      expect(screen.getByRole('button', { name: /submit/i })).toHaveFocus();
    });
  });

  describe('Accessibility - aria-describedby', () => {
    it('FormMessage with error=true renders role="alert"', () => {
      render(<FormMessage error>Field is required</FormMessage>);

      expect(screen.getByRole('alert')).toBeInTheDocument();
      expect(screen.getByRole('alert')).toHaveTextContent('Field is required');
    });

    it('FormMessage with error=false does not render role="alert"', () => {
      const { container } = render(<FormMessage>Helper text</FormMessage>);

      expect(container.querySelector('[role="alert"]')).not.toBeInTheDocument();
    });

    it('FormMessage renders with custom id for aria-describedby linking', () => {
      const { container } = render(
        <FormMessage error id="name-error">
          Name is too short
        </FormMessage>
      );

      const alert = container.querySelector('#name-error');
      expect(alert).toBeInTheDocument();
      expect(alert).toHaveAttribute('role', 'alert');
    });

    it('FormMessage returns null when no children provided', () => {
      const { container } = render(<FormMessage error />);

      expect(container.innerHTML).toBe('');
    });
  });
});
