import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  DataTable,
} from './index';
import { Tag } from '../Tag';

// Types for the data-driven approach
interface DataTableArgs {
  tableWidth: number;
  data: Record<string, React.ReactNode>[];
  caption?: string;
}

const meta: Meta<typeof DataTable> = {
  title: 'Table',
  component: DataTable,
  decorators: [
    (Story) => (
      <div
        style={{
          backgroundColor: 'transparent',
          padding: '20px',
          minHeight: '400px',
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
          'A flexible table component with two usage patterns: data-driven (DataTable) for automatic rendering, and manual (Table + components) for custom layouts.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default data-driven approach using DataTable component.
 *
 * Simply pass an array of objects - headers are automatically generated from object keys.
 * Each cell value can be text, components, or any React node.
 */
export const DataDriven: StoryObj<DataTableArgs> = {
  args: {
    tableWidth: 800,
    caption: 'User Management',
    data: [
      {
        name: 'John Doe',
        email: 'john@example.com',
        role: 'Admin',
        status: 'Active',
      },
      {
        name: 'Jane Smith',
        email: 'jane@example.com',
        role: 'User',
        status: 'Pending',
      },
      {
        name: 'Bob Johnson',
        email: 'bob@example.com',
        role: 'User',
        status: 'Inactive',
      },
      {
        name: 'Alice Cooper',
        email: 'alice@example.com',
        role: 'Manager',
        status: 'Review',
      },
    ],
  },
  argTypes: {
    tableWidth: {
      control: { type: 'number', min: 400, max: 1200, step: 50 },
      description: 'Overall width of the table in pixels',
    },
    caption: {
      control: { type: 'text' },
      description: 'Optional table caption',
    },
    data: {
      control: { type: 'object' },
      description:
        'Array of objects where keys become headers and values become cell content',
    },
  },
  render: (args) => {
    const { tableWidth, data, caption } = args;
    return (
      <div style={{ width: `${tableWidth}px`, margin: '0 auto' }}>
        <DataTable data={data} {...(caption ? { caption } : {})} />
      </div>
    );
  },
};

/**
 * Custom manual approach using individual Table components.
 *
 * Import Table, TableHeader, TableBody, TableRow, TableHead, TableCell individually.
 * Build your table structure manually with full control over each cell.
 */
export const CustomManual: Story = {
  render: () => (
    <div style={{ width: '800px', margin: '0 auto' }}>
      <Table>
        <TableCaption>Custom Built Table</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Project</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead>Progress</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">Website Redesign</TableCell>
            <TableCell>
              <Tag color="green">In Progress</Tag>
            </TableCell>
            <TableCell>
              <Tag color="red">High</Tag>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <div className="w-20 bg-olly-grey-700 rounded-full h-2">
                  <div
                    className="bg-olly-green-1 h-2 rounded-full"
                    style={{ width: '75%' }}
                  ></div>
                </div>
                <span className="text-sm">75%</span>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex gap-1">
                <button className="px-2 py-1 text-xs bg-olly-grey-600 rounded">
                  Edit
                </button>
                <button className="px-2 py-1 text-xs bg-olly-grey-600 rounded">
                  View
                </button>
              </div>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Mobile App</TableCell>
            <TableCell>
              <Tag color="blue">Planning</Tag>
            </TableCell>
            <TableCell>
              <Tag color="orange">Medium</Tag>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <div className="w-20 bg-olly-grey-700 rounded-full h-2">
                  <div
                    className="bg-olly-blue-200 h-2 rounded-full"
                    style={{ width: '25%' }}
                  ></div>
                </div>
                <span className="text-sm">25%</span>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex gap-1">
                <button className="px-2 py-1 text-xs bg-olly-grey-600 rounded">
                  Edit
                </button>
                <button className="px-2 py-1 text-xs bg-olly-grey-600 rounded">
                  View
                </button>
              </div>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">API Documentation</TableCell>
            <TableCell>
              <Tag color="grey">On Hold</Tag>
            </TableCell>
            <TableCell>
              <Tag color="grey">Low</Tag>
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <div className="w-20 bg-olly-grey-700 rounded-full h-2">
                  <div
                    className="bg-olly-grey-500 h-2 rounded-full"
                    style={{ width: '10%' }}
                  ></div>
                </div>
                <span className="text-sm">10%</span>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex gap-1">
                <button className="px-2 py-1 text-xs bg-olly-grey-600 rounded">
                  Edit
                </button>
                <button className="px-2 py-1 text-xs bg-olly-grey-600 rounded">
                  View
                </button>
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  ),
};

/**
 * Empty state example showing how to handle no data scenarios.
 */
export const EmptyState: Story = {
  render: () => (
    <div style={{ width: '600px', margin: '0 auto' }}>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Service</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Last Check</TableHead>
            <TableHead>Health</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell
              colSpan={4}
              className="text-center text-olly-grey-400 py-8"
            >
              No services found
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  ),
};
