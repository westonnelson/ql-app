'use client'

import { useState } from "react"
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  type ColumnDef,
  type SortingState,
} from "@tanstack/react-table"
import { formatPhoneNumber, formatCurrency } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

// Define the Lead type based on our Supabase schema
interface Lead {
  id: string
  created_at: string
  first_name: string
  last_name: string
  email: string
  phone: string
  coverage_amount: number
  insurance_type: string
  status: string
  lead_score: number
  source: string
}

const columns: ColumnDef<Lead>[] = [
  {
    accessorKey: "created_at",
    header: "Date",
    cell: ({ row }) => {
      const date = new Date(row.getValue("created_at"))
      return date.toLocaleDateString()
    },
  },
  {
    accessorKey: "first_name",
    header: "First Name",
  },
  {
    accessorKey: "last_name",
    header: "Last Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "phone",
    header: "Phone",
    cell: ({ row }) => formatPhoneNumber(row.getValue("phone")),
  },
  {
    accessorKey: "coverage_amount",
    header: "Coverage",
    cell: ({ row }) => formatCurrency(row.getValue("coverage_amount")),
  },
  {
    accessorKey: "insurance_type",
    header: "Type",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div className="flex items-center">
        <div
          className={`h-2.5 w-2.5 rounded-full mr-2 ${
            row.getValue("status") === "NEW"
              ? "bg-green-500"
              : row.getValue("status") === "CONTACTED"
              ? "bg-yellow-500"
              : row.getValue("status") === "QUALIFIED"
              ? "bg-blue-500"
              : row.getValue("status") === "CONVERTED"
              ? "bg-purple-500"
              : "bg-red-500"
          }`}
        />
        {row.getValue("status")}
      </div>
    ),
  },
  {
    accessorKey: "lead_score",
    header: "Score",
    cell: ({ row }) => (
      <div className="flex items-center">
        <div
          className={`px-2 py-1 rounded text-white text-xs ${
            row.getValue("lead_score") >= 80
              ? "bg-green-500"
              : row.getValue("lead_score") >= 60
              ? "bg-yellow-500"
              : "bg-red-500"
          }`}
        >
          {row.getValue("lead_score")}
        </div>
      </div>
    ),
  },
  {
    accessorKey: "source",
    header: "Source",
  },
]

interface LeadsTableProps {
  leads: Lead[]
}

export function LeadsTable({ leads }: LeadsTableProps) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [globalFilter, setGlobalFilter] = useState("")

  const table = useReactTable({
    data: leads,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    state: {
      sorting,
      globalFilter,
    },
  })

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Input
          placeholder="Search leads..."
          value={globalFilter ?? ""}
          onChange={(event) => setGlobalFilter(event.target.value)}
          className="max-w-sm"
        />
      </div>
      <div className="rounded-md border">
        <table className="w-full">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="border-b px-4 py-2 text-left text-sm font-medium text-gray-500"
                  >
                    {header.isPlaceholder
                      ? null
                      : header.column.columnDef.header}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="border-b px-4 py-2 text-sm"
                  >
                    {cell.column.columnDef.cell
                      ? cell.column.columnDef.cell({ row })
                      : cell.getValue() as string}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
        <div className="text-sm text-gray-500">
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </div>
      </div>
    </div>
  )
} 