import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { z } from 'zod';
import { vi } from 'vitest';
import { Form, FormDropdown } from '../index';

const testSchema = z.object({
  role: z.string().min(1, 'Please select a role'),
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
  defaultValues: { role: '' },
};

describe('FormDropdown', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders with label and options', () => {
    render(
      <Form<TestForm> {...defaultProps}>
        <FormDropdown<TestForm>
          name="role"
          label="Role"
          placeholder="Select role"
          options={roleOptions}
        />
      </Form>
    );

    // Dropdown label is not associated with the button via for/id, so use getByText
    expect(screen.getByText('Role')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /role/i })).toBeInTheDocument();
  });

  it('displays options when clicked', async () => {
    const user = userEvent.setup();

    render(
      <Form<TestForm> {...defaultProps}>
        <FormDropdown<TestForm>
          name="role"
          label="Role"
          placeholder="Select role"
          options={roleOptions}
        />
      </Form>
    );

    await user.click(screen.getByRole('button', { name: /role/i }));

    expect(screen.getByText('Developer')).toBeInTheDocument();
    expect(screen.getByText('Designer')).toBeInTheDocument();
    expect(screen.getByText('Manager')).toBeInTheDocument();
  });

  it('selects option and updates form value', async () => {
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
        <button type="submit">Submit</button>
      </Form>
    );

    await user.click(screen.getByRole('button', { name: /role/i }));
    await user.click(screen.getByText('Developer'));

    expect(screen.getByText('Developer')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({ role: 'developer' });
    });
  });

  it('shows validation error', async () => {
    const user = userEvent.setup();

    render(
      <Form<TestForm> {...defaultProps}>
        <FormDropdown<TestForm>
          name="role"
          label="Role"
          placeholder="Select role"
          options={roleOptions}
        />
        <button type="submit">Submit</button>
      </Form>
    );

    await user.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => {
      expect(screen.getByText('Please select a role')).toBeInTheDocument();
    });
  });

  it('supports required prop', () => {
    render(
      <Form<TestForm> {...defaultProps}>
        <FormDropdown<TestForm>
          name="role"
          label="Role"
          placeholder="Select role"
          options={roleOptions}
          required
        />
      </Form>
    );

    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('supports helper text', () => {
    render(
      <Form<TestForm> {...defaultProps}>
        <FormDropdown<TestForm>
          name="role"
          label="Role"
          placeholder="Select role"
          options={roleOptions}
          helperText="Choose your primary role"
        />
      </Form>
    );

    expect(screen.getByText('Choose your primary role')).toBeInTheDocument();
  });

  it('supports chip variant', async () => {
    const user = userEvent.setup();

    render(
      <Form<TestForm> {...defaultProps}>
        <FormDropdown<TestForm>
          name="role"
          label="Role"
          placeholder="Select role"
          options={roleOptions}
          variant="chip"
        />
      </Form>
    );

    const button = screen.getByRole('button', { name: /role/i });
    expect(button).toHaveClass('rounded-[20px]');

    await user.click(button);
    expect(screen.getByText('Developer')).toBeInTheDocument();
  });

  it('supports disabled state', () => {
    render(
      <Form<TestForm> {...defaultProps}>
        <FormDropdown<TestForm>
          name="role"
          label="Role"
          placeholder="Select role"
          options={roleOptions}
          disabled
        />
      </Form>
    );

    const button = screen.getByRole('button', { name: /role/i });
    expect(button).toBeDisabled();
  });

  it('shows pre-selected value', () => {
    render(
      <Form<TestForm> {...defaultProps} defaultValues={{ role: 'developer' }}>
        <FormDropdown<TestForm>
          name="role"
          label="Role"
          placeholder="Select role"
          options={roleOptions}
        />
      </Form>
    );

    expect(screen.getByText('Developer')).toBeInTheDocument();
  });

  it('closes dropdown when clicking outside', async () => {
    const user = userEvent.setup();

    render(
      <div>
        <Form<TestForm> {...defaultProps}>
          <FormDropdown<TestForm>
            name="role"
            label="Role"
            placeholder="Select role"
            options={roleOptions}
          />
        </Form>
        <div>Outside element</div>
      </div>
    );

    // Open dropdown
    await user.click(screen.getByRole('button', { name: /role/i }));
    expect(screen.getByText('Developer')).toBeInTheDocument();

    // Click outside
    await user.click(screen.getByText('Outside element'));

    await waitFor(() => {
      expect(screen.queryByText('Developer')).not.toBeInTheDocument();
    });
  });

  it('supports keyboard navigation', async () => {
    const user = userEvent.setup();

    render(
      <Form<TestForm> {...defaultProps}>
        <FormDropdown<TestForm>
          name="role"
          label="Role"
          placeholder="Select role"
          options={roleOptions}
        />
      </Form>
    );

    const button = screen.getByRole('button', { name: /role/i });

    // Focus the dropdown
    button.focus();
    expect(button).toHaveFocus();

    // Open with Enter key
    await user.keyboard('{Enter}');
    expect(screen.getByText('Developer')).toBeInTheDocument();

    // Close with Escape key
    await user.keyboard('{Escape}');
    await waitFor(() => {
      expect(screen.queryByText('Developer')).not.toBeInTheDocument();
    });
  });

  it('has proper accessibility attributes', () => {
    render(
      <Form<TestForm> {...defaultProps}>
        <FormDropdown<TestForm>
          name="role"
          label="Role"
          placeholder="Select role"
          options={roleOptions}
          helperText="Choose your role"
        />
      </Form>
    );

    const button = screen.getByRole('button', { name: /role/i });

    expect(button).toHaveAttribute('aria-haspopup', 'listbox');
    expect(button).toHaveAttribute('aria-expanded', 'false');
  });
});
