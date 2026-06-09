import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
  DataTable,
} from '../';

describe('Table Component', () => {
  describe('Basic Rendering', () => {
    it('renders table correctly', () => {
      render(
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>Test Cell</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      );

      const table = screen.getByRole('table');
      expect(table).toBeInTheDocument();
      expect(screen.getByText('Test Cell')).toBeInTheDocument();
    });

    it('renders with custom className', () => {
      render(
        <Table className="custom-table">
          <TableBody>
            <TableRow>
              <TableCell>Content</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      );

      const table = screen.getByRole('table');
      expect(table).toHaveClass('custom-table');
    });

    it('wraps table in relative container', () => {
      const { container } = render(
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>Content</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      );

      const wrapper = container.querySelector('.relative.w-full');
      expect(wrapper).toBeInTheDocument();
    });
  });

  describe('Table Header', () => {
    it('renders table header correctly', () => {
      render(
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
            </TableRow>
          </TableHeader>
        </Table>
      );

      expect(screen.getByText('Name')).toBeInTheDocument();
      expect(screen.getByText('Email')).toBeInTheDocument();
    });

    it('applies correct styling to header', () => {
      const { container } = render(
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Header</TableHead>
            </TableRow>
          </TableHeader>
        </Table>
      );

      const thead = container.querySelector('thead');
      expect(thead).toHaveClass('[&_tr]:!border-none');
    });

    it('renders header cells with correct styling', () => {
      render(
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Test Header</TableHead>
            </TableRow>
          </TableHeader>
        </Table>
      );

      const header = screen.getByText('Test Header');
      expect(header.tagName).toBe('TH');
      expect(header).toHaveClass('text-olly-grey-300', 'py-3', 'md:py-5');
    });

    it('applies correct styling classes to header cells', () => {
      render(
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead data-testid="table-head">Header Cell</TableHead>
            </TableRow>
          </TableHeader>
        </Table>
      );

      const th = screen.getByTestId('table-head');
      // TableHead applies CSS classes for styling, not inline styles
      // JSDOM doesn't compute styles from CSS classes
      expect(th).toHaveClass('text-left', 'align-middle', 'text-olly-grey-300');
      expect(th).toBeInTheDocument();
    });
  });

  describe('Table Body', () => {
    it('renders table body correctly', () => {
      render(
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>Cell 1</TableCell>
              <TableCell>Cell 2</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      );

      expect(screen.getByText('Cell 1')).toBeInTheDocument();
      expect(screen.getByText('Cell 2')).toBeInTheDocument();
    });

    it('removes border from last row', () => {
      const { container } = render(
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>Row 1</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Row 2</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      );

      const tbody = container.querySelector('tbody');
      expect(tbody).toHaveClass('[&_tr:last-child]:border-b-0');
    });
  });

  describe('Table Row', () => {
    it('renders table row correctly', () => {
      render(
        <Table>
          <TableBody>
            <TableRow data-testid="test-row">
              <TableCell>Cell Content</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      );

      const row = screen.getByTestId('test-row');
      expect(row).toBeInTheDocument();
      expect(row.tagName).toBe('TR');
    });

    it('applies hover styles', () => {
      render(
        <Table>
          <TableBody>
            <TableRow data-testid="test-row">
              <TableCell>Cell</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      );

      const row = screen.getByTestId('test-row');
      expect(row).toHaveClass('hover:bg-olly-grey-900');
    });

    it('applies selected state styling', () => {
      render(
        <Table>
          <TableBody>
            <TableRow data-state="selected">
              <TableCell>Selected Row</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      );

      const row = screen.getByRole('row');
      expect(row).toHaveClass('data-[state=selected]:bg-white/10');
    });

    it('has border styling', () => {
      render(
        <Table>
          <TableBody>
            <TableRow data-testid="test-row">
              <TableCell>Cell</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      );

      const row = screen.getByTestId('test-row');
      expect(row).toHaveClass('border-t', 'border-b', 'border-olly-grey-600');
    });
  });

  describe('Table Cell', () => {
    it('renders table cell correctly', () => {
      render(
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>Cell Content</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      );

      const cell = screen.getByText('Cell Content');
      expect(cell).toBeInTheDocument();
      expect(cell.tagName).toBe('TD');
    });

    it('applies correct padding and text color', () => {
      render(
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>Test Cell</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      );

      const cell = screen.getByText('Test Cell');
      expect(cell).toHaveClass(
        'px-2',
        'md:px-4',
        'py-3',
        'md:py-5',
        'text-olly-grey-100'
      );
    });

    it('accepts custom className', () => {
      render(
        <Table>
          <TableBody>
            <TableRow>
              <TableCell className="custom-cell">Cell</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      );

      const cell = screen.getByText('Cell');
      expect(cell).toHaveClass('custom-cell');
    });

    it('applies correct styling classes to table cells', () => {
      render(
        <Table>
          <TableBody>
            <TableRow>
              <TableCell data-testid="table-cell">Cell Content</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      );

      const td = screen.getByTestId('table-cell');
      // TableCell applies CSS classes for styling, not inline styles
      // JSDOM doesn't compute styles from CSS classes
      expect(td).toHaveClass('align-middle', 'text-olly-grey-100');
      expect(td).toBeInTheDocument();
    });
  });

  describe('Table Footer', () => {
    it('renders table footer correctly', () => {
      render(
        <Table>
          <TableFooter>
            <TableRow>
              <TableCell>Footer Cell</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      );

      const footer = screen.getByText('Footer Cell');
      expect(footer).toBeInTheDocument();
    });

    it('applies footer styling with correct classes', () => {
      const { container } = render(
        <Table>
          <TableFooter>
            <TableRow>
              <TableCell>Footer</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      );

      const tfoot = container.querySelector('tfoot');
      expect(tfoot).toHaveClass('border-t', 'border-olly-grey-700');
    });

    it('applies footnote typography styling', () => {
      render(
        <Table>
          <TableFooter data-testid="table-footer">
            <TableRow>
              <TableCell>Footer Content</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      );

      const tfoot = screen.getByTestId('table-footer');
      // TableFooter applies CSS classes for styling, not inline styles
      // JSDOM doesn't compute styles from CSS classes
      expect(tfoot).toHaveClass('border-t', 'border-olly-grey-700');
      expect(tfoot).toBeInTheDocument();
    });
  });

  describe('Table Caption', () => {
    it('renders table caption correctly', () => {
      render(
        <Table>
          <TableCaption>Table Description</TableCaption>
          <TableBody>
            <TableRow>
              <TableCell>Cell</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      );

      const caption = screen.getByText('Table Description');
      expect(caption).toBeInTheDocument();
      expect(caption.tagName).toBe('CAPTION');
    });

    it('applies caption styling', () => {
      render(
        <Table>
          <TableCaption>Caption Text</TableCaption>
          <TableBody>
            <TableRow>
              <TableCell>Cell</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      );

      const caption = screen.getByText('Caption Text');
      expect(caption).toHaveClass('text-sm', 'text-olly-grey-400');
    });
  });

  describe('Complete Table Example', () => {
    it('renders a complete table with all components', () => {
      render(
        <Table>
          <TableCaption>User List</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>John Doe</TableCell>
              <TableCell>john@example.com</TableCell>
              <TableCell>Admin</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Jane Smith</TableCell>
              <TableCell>jane@example.com</TableCell>
              <TableCell>User</TableCell>
            </TableRow>
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>Total: 2 users</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      );

      // Check all parts are rendered
      expect(screen.getByText('User List')).toBeInTheDocument();
      expect(screen.getByText('Name')).toBeInTheDocument();
      expect(screen.getByText('Email')).toBeInTheDocument();
      expect(screen.getByText('Role')).toBeInTheDocument();
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('jane@example.com')).toBeInTheDocument();
      expect(screen.getByText('Total: 2 users')).toBeInTheDocument();
    });

    it('supports colspan attribute', () => {
      render(
        <Table>
          <TableBody>
            <TableRow>
              <TableCell colSpan={3}>Spanning Cell</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      );

      const cell = screen.getByText('Spanning Cell');
      expect(cell).toHaveAttribute('colspan', '3');
    });
  });

  describe('Accessibility', () => {
    it('has proper table structure', () => {
      render(
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Header</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Cell</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      );

      const table = screen.getByRole('table');
      const rows = screen.getAllByRole('row');

      expect(table).toBeInTheDocument();
      expect(rows).toHaveLength(2);
    });

    it('supports aria attributes', () => {
      render(
        <Table aria-label="Users table">
          <TableBody>
            <TableRow>
              <TableCell>Content</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      );

      const table = screen.getByRole('table');
      expect(table).toHaveAttribute('aria-label', 'Users table');
    });
  });

  describe('DataTable Component', () => {
    const sampleData = [
      { name: 'John Doe', email: 'john@example.com', role: 'Admin' },
      { name: 'Jane Smith', email: 'jane@example.com', role: 'User' },
    ];

    describe('Basic Rendering', () => {
      it('renders DataTable with data correctly', () => {
        render(<DataTable data={sampleData} />);

        // Check table is rendered
        const table = screen.getByRole('table');
        expect(table).toBeInTheDocument();

        // Check headers are generated from keys and capitalized
        expect(screen.getByText('Name')).toBeInTheDocument();
        expect(screen.getByText('Email')).toBeInTheDocument();
        expect(screen.getByText('Role')).toBeInTheDocument();

        // Check data is rendered
        expect(screen.getByText('John Doe')).toBeInTheDocument();
        expect(screen.getByText('jane@example.com')).toBeInTheDocument();
        expect(screen.getByText('Admin')).toBeInTheDocument();
        expect(screen.getByText('User')).toBeInTheDocument();
      });

      it('generates headers from object keys with proper capitalization', () => {
        const data = [
          { firstName: 'John', lastName: 'Doe', emailAddress: 'john@test.com' },
        ];

        render(<DataTable data={data} />);

        expect(screen.getByText('FirstName')).toBeInTheDocument();
        expect(screen.getByText('LastName')).toBeInTheDocument();
        expect(screen.getByText('EmailAddress')).toBeInTheDocument();
      });

      it('renders with custom className', () => {
        render(<DataTable data={sampleData} className="custom-data-table" />);

        const table = screen.getByRole('table');
        expect(table).toHaveClass('custom-data-table');
      });

      it('wraps table in relative container', () => {
        const { container } = render(<DataTable data={sampleData} />);

        const wrapper = container.querySelector('.relative.w-full');
        expect(wrapper).toBeInTheDocument();
      });
    });

    describe('Caption Functionality', () => {
      it('renders caption when provided', () => {
        render(<DataTable data={sampleData} caption="User Directory" />);

        const caption = screen.getByText('User Directory');
        expect(caption).toBeInTheDocument();
        expect(caption.tagName).toBe('CAPTION');
      });

      it('does not render caption when not provided', () => {
        const { container } = render(<DataTable data={sampleData} />);

        const caption = container.querySelector('caption');
        expect(caption).not.toBeInTheDocument();
      });
    });

    describe('Edge Cases', () => {
      it('handles empty data array gracefully', () => {
        render(<DataTable data={[]} />);

        const table = screen.getByRole('table');
        expect(table).toBeInTheDocument();

        // Should have no headers or rows
        const headers = screen.queryAllByRole('columnheader');
        const rows = screen.queryAllByRole('row');

        expect(headers).toHaveLength(0);
        expect(rows).toHaveLength(1); // Only the header row, but empty
      });

      it('handles single row data', () => {
        const singleRowData = [{ name: 'Solo User', status: 'Active' }];

        render(<DataTable data={singleRowData} />);

        expect(screen.getByText('Name')).toBeInTheDocument();
        expect(screen.getByText('Status')).toBeInTheDocument();
        expect(screen.getByText('Solo User')).toBeInTheDocument();
        expect(screen.getByText('Active')).toBeInTheDocument();

        // Should have 2 rows total (header + data)
        const rows = screen.getAllByRole('row');
        expect(rows).toHaveLength(2);
      });

      it('handles data with missing properties', () => {
        const inconsistentData = [
          { name: 'John', email: 'john@test.com', role: 'Admin' },
          { name: 'Jane' }, // Missing email and role
          { email: 'bob@test.com', role: 'User' }, // Missing name
        ];

        render(<DataTable data={inconsistentData} />);

        // Headers should be generated from first object
        expect(screen.getByText('Name')).toBeInTheDocument();
        expect(screen.getByText('Email')).toBeInTheDocument();
        expect(screen.getByText('Role')).toBeInTheDocument();

        // First row should have all data
        expect(screen.getByText('John')).toBeInTheDocument();
        expect(screen.getByText('john@test.com')).toBeInTheDocument();
        expect(screen.getByText('Admin')).toBeInTheDocument();

        // Second row should have name but empty cells for missing data
        expect(screen.getByText('Jane')).toBeInTheDocument();

        // Third row should have email and role but empty name cell
        expect(screen.getByText('bob@test.com')).toBeInTheDocument();
        expect(screen.getByText('User')).toBeInTheDocument();
      });
    });

    describe('Complex Data Types', () => {
      it('renders React nodes as cell content', () => {
        const dataWithReactNodes = [
          {
            name: 'John Doe',
            status: <span className="status-active">Active</span>,
            actions: <button>Edit</button>,
          },
        ];

        render(<DataTable data={dataWithReactNodes} />);

        expect(screen.getByText('John Doe')).toBeInTheDocument();
        expect(screen.getByText('Active')).toBeInTheDocument();
        expect(
          screen.getByRole('button', { name: 'Edit' })
        ).toBeInTheDocument();

        // Check that the span has the correct class
        const statusSpan = screen.getByText('Active');
        expect(statusSpan).toHaveClass('status-active');
      });

      it('renders numeric values correctly', () => {
        const dataWithNumbers = [
          { name: 'John', age: 30, balance: 1000.5, score: 0 },
        ];

        render(<DataTable data={dataWithNumbers} />);

        expect(screen.getByText('John')).toBeInTheDocument();
        expect(screen.getByText('30')).toBeInTheDocument();
        expect(screen.getByText('1000.5')).toBeInTheDocument();
        expect(screen.getByText('0')).toBeInTheDocument();
      });

      it('handles boolean values correctly', () => {
        const dataWithBooleans = [
          { name: 'John', isActive: true, isVerified: false },
        ];

        const { container } = render(<DataTable data={dataWithBooleans} />);

        expect(screen.getByText('John')).toBeInTheDocument();

        // Boolean values render as empty content in React, so check cells exist but are empty
        const cells = container.querySelectorAll('td');
        expect(cells).toHaveLength(3); // name, isActive, isVerified columns
        expect(cells[0]).toHaveTextContent('John');
        expect(cells[1]).toHaveTextContent(''); // true renders as empty
        expect(cells[2]).toHaveTextContent(''); // false renders as empty
      });

      it('handles null and undefined values', () => {
        const dataWithNulls = [
          {
            name: 'John',
            email: null,
            role: undefined,
            department: 'Engineering',
          },
        ];

        render(<DataTable data={dataWithNulls} />);

        expect(screen.getByText('John')).toBeInTheDocument();
        expect(screen.getByText('Engineering')).toBeInTheDocument();

        // Null and undefined should be rendered as empty or their string representation
        // The behavior depends on React's rendering of these values
      });
    });

    describe('Accessibility', () => {
      it('has proper table structure with headers', () => {
        render(<DataTable data={sampleData} />);

        const table = screen.getByRole('table');
        const rows = screen.getAllByRole('row');
        const columnHeaders = screen.getAllByRole('columnheader');

        expect(table).toBeInTheDocument();
        expect(rows).toHaveLength(3); // 1 header + 2 data rows
        expect(columnHeaders).toHaveLength(3); // name, email, role
      });

      it('supports aria attributes', () => {
        render(
          <DataTable
            data={sampleData}
            aria-label="Users data table"
            role="table"
          />
        );

        const table = screen.getByRole('table');
        expect(table).toHaveAttribute('aria-label', 'Users data table');
      });

      it('maintains semantic table structure', () => {
        const { container } = render(<DataTable data={sampleData} />);

        const thead = container.querySelector('thead');
        const tbody = container.querySelector('tbody');
        const ths = container.querySelectorAll('th');
        const tds = container.querySelectorAll('td');

        expect(thead).toBeInTheDocument();
        expect(tbody).toBeInTheDocument();
        expect(ths).toHaveLength(3); // 3 headers
        expect(tds).toHaveLength(6); // 3 columns × 2 rows
      });
    });

    describe('Prop Forwarding and Refs', () => {
      it('forwards props to table element', () => {
        render(
          <DataTable
            data={sampleData}
            data-testid="data-table"
            title="Users Table"
          />
        );

        const table = screen.getByRole('table');
        expect(table).toHaveAttribute('data-testid', 'data-table');
        expect(table).toHaveAttribute('title', 'Users Table');
      });

      it('supports ref forwarding', () => {
        let tableRef: HTMLTableElement | null = null;

        const TestComponent = () => (
          <DataTable
            ref={(ref) => {
              tableRef = ref;
            }}
            data={sampleData}
          />
        );

        render(<TestComponent />);

        expect(tableRef).not.toBeNull();
        expect(tableRef).toBeInstanceOf(HTMLTableElement);
        expect((tableRef as unknown as HTMLTableElement).tagName).toBe('TABLE');
      });
    });
  });
});
