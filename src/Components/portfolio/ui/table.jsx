/* eslint-disable */
import React from "react";

const Table = ({ className = "", children, ...props }) => (
  <div className="relative w-full overflow-auto">
    <table
      className={`w-full caption-bottom text-sm ${className}`}
      {...props}
    >
      {children}
    </table>
  </div>
);

const TableHeader = ({ className = "", children, ...props }) => (
  <thead className={`[&_tr]:border-b ${className}`} {...props}>
    {children}
  </thead>
);

const TableBody = ({ className = "", children, ...props }) => (
  <tbody
    className={`[&_tr:last-child]:border-0 ${className}`}
    {...props}
  >
    {children}
  </tbody>
);

const TableFooter = ({ className = "", children, ...props }) => (
  <tfoot
    className={`border-t bg-gray-50 font-medium [&>tr]:last:border-b-0 ${className}`}
    {...props}
  >
    {children}
  </tfoot>
);

const TableRow = ({ className = "", children, ...props }) => (
  <tr
    className={`border-b transition-colors hover:bg-gray-50 data-[state=selected]:bg-gray-100 ${className}`}
    {...props}
  >
    {children}
  </tr>
);

const TableHead = ({ className = "", children, ...props }) => (
  <th
    className={`h-12 px-4 text-left align-middle font-medium text-gray-600 [&:has([role=checkbox])]:pr-0 ${className}`}
    {...props}
  >
    {children}
  </th>
);

const TableCell = ({ className = "", children, ...props }) => (
  <td
    className={`p-4 align-middle [&:has([role=checkbox])]:pr-0 ${className}`}
    {...props}
  >
    {children}
  </td>
);

const TableCaption = ({ className = "", children, ...props }) => (
  <caption
    className={`mt-4 text-sm text-gray-600 ${className}`}
    {...props}
  >
    {children}
  </caption>
);

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
};
