import * as React from 'react';
import { cn } from '@/lib/utils';

// Table Root Component
export type TableProps = React.HTMLAttributes<HTMLTableElement>;

export const Table = React.forwardRef<HTMLTableElement, TableProps>(
  ({ className, ...props }, ref) => (
    <div className="relative w-full bg-olly-grey-900 rounded-lg overflow-x-auto md:overflow-hidden">
      <table
        ref={ref}
        className={cn('w-full caption-bottom text-sm', className)}
        {...props}
      />
    </div>
  )
);
Table.displayName = 'Table';

// Table Header Component
export type TableHeaderProps = React.HTMLAttributes<HTMLTableSectionElement>;

export const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  TableHeaderProps
>(({ className, ...props }, ref) => (
  <thead
    ref={ref}
    className={cn('[&_tr]:!border-none', className)}
    {...props}
  />
));
TableHeader.displayName = 'TableHeader';

// Table Body Component
export type TableBodyProps = React.HTMLAttributes<HTMLTableSectionElement>;

export const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  TableBodyProps
>(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={cn(
      '[&_tr]:border-t [&_tr]:border-b [&_tr]:border-olly-grey-600 [&_tr:last-child]:border-b-0',
      className
    )}
    {...props}
  />
));
TableBody.displayName = 'TableBody';

// Table Footer Component
export type TableFooterProps = React.HTMLAttributes<HTMLTableSectionElement>;

export const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  TableFooterProps
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn('border-t border-olly-grey-700', className)}
    {...props}
  />
));
TableFooter.displayName = 'TableFooter';

// Table Row Component
export type TableRowProps = React.HTMLAttributes<HTMLTableRowElement>;

export const TableRow = React.forwardRef<HTMLTableRowElement, TableRowProps>(
  ({ className, ...props }, ref) => (
    <tr
      ref={ref}
      className={cn(
        'border-t border-b border-olly-grey-600 transition-colors hover:bg-olly-grey-900 data-[state=selected]:bg-white/10',
        className
      )}
      {...props}
    />
  )
);
TableRow.displayName = 'TableRow';

// Table Head Cell Component
export type TableHeadProps = React.ThHTMLAttributes<HTMLTableCellElement>;

export const TableHead = React.forwardRef<HTMLTableCellElement, TableHeadProps>(
  ({ className, ...props }, ref) => (
    <th
      ref={ref}
      className={cn(
        'h-12 px-2 md:px-4 py-3 md:py-5 text-left align-middle text-olly-grey-300',
        className
      )}
      {...props}
    />
  )
);
TableHead.displayName = 'TableHead';

// Table Cell Component
export type TableCellProps = React.TdHTMLAttributes<HTMLTableCellElement>;

export const TableCell = React.forwardRef<HTMLTableCellElement, TableCellProps>(
  ({ className, ...props }, ref) => (
    <td
      ref={ref}
      className={cn(
        'px-2 md:px-4 py-3 md:py-5 align-middle text-olly-grey-100',
        className
      )}
      {...props}
    />
  )
);
TableCell.displayName = 'TableCell';

// Table Caption Component
export type TableCaptionProps = React.HTMLAttributes<HTMLTableCaptionElement>;

export const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  TableCaptionProps
>(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn('mt-4 text-sm text-olly-grey-400', className)}
    {...props}
  />
));
TableCaption.displayName = 'TableCaption';

// Data-driven Table Component
export interface DataTableProps extends React.HTMLAttributes<HTMLTableElement> {
  data: Record<string, React.ReactNode>[];
  caption?: string;
}

export const DataTable = React.forwardRef<HTMLTableElement, DataTableProps>(
  ({ data, caption, className, ...props }, ref) => {
    // Get headers from the first data item
    const headers = data.length > 0 && data[0] ? Object.keys(data[0]) : [];

    return (
      <div className="relative w-full">
        <table
          ref={ref}
          className={cn('w-full caption-bottom text-sm', className)}
          {...props}
        >
          {caption && <TableCaption>{caption}</TableCaption>}
          <TableHeader>
            <TableRow>
              {headers.map((header) => (
                <TableHead key={header}>
                  {header.charAt(0).toUpperCase() + header.slice(1)}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row, index) => (
              <TableRow key={index}>
                {headers.map((header) => (
                  <TableCell key={header}>{row[header]}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </table>
      </div>
    );
  }
);
DataTable.displayName = 'DataTable';
