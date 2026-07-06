import * as React from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"
import { CaretDown, CaretUp } from "@phosphor-icons/react"

export interface DataTableProps<TData> extends React.HTMLAttributes<HTMLDivElement> {
  columns: {
    header: string | React.ReactNode
    accessor?: keyof TData | string
    cell?: (row: TData) => React.ReactNode
    className?: string
    sortable?: boolean
  }[]
  data: TData[]
  emptyMessage?: string
  onRowClick?: (row: TData) => void
  pagination?: boolean
  rowClassName?: string
  entityName?: string
}

export function DataTable<TData>({
  columns,
  data,
  emptyMessage = "No results found.",
  onRowClick,
  pagination = false,
  rowClassName,
  className,
  entityName = "Items",
  ...props
}: DataTableProps<TData>) {
  return (
    <div className={cn("rounded-md border border-border/50 bg-card overflow-hidden", className)} {...props}>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-[#FAFBFD] border-b border-[#E8EDF5]">
            <TableRow className="hover:bg-transparent border-0">
              {columns.map((col, index) => (
                <TableHead
                  key={index}
                  className={cn("h-[48px] px-6 text-[11px] font-medium uppercase tracking-[0.08em] text-[#94A3B8]", col.className)}
                >
                  <div className="flex items-center gap-2">
                    {col.header}
                    {col.sortable && (
                      <div className="flex flex-col">
                        <CaretUp weight="bold" className="h-2 w-2 -mb-0.5 text-muted-foreground/50 hover:text-foreground cursor-pointer" />
                        <CaretDown weight="bold" className="h-2 w-2 text-muted-foreground/50 hover:text-foreground cursor-pointer" />
                      </div>
                    )}
                  </div>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.length > 0 ? (
              data.map((row, rowIndex) => (
                <TableRow
                  key={rowIndex}
                  onClick={() => onRowClick && onRowClick(row)}
                  className={cn(
                    "group h-[56px] transition-all duration-150 border-border/50",
                    onRowClick && "cursor-pointer hover:bg-muted/30",
                    rowClassName
                  )}
                >
                  {columns.map((col, colIndex) => (
                    <TableCell
                      key={colIndex}
                      className={cn("px-6 align-middle text-[13px] font-medium text-[#111827]", col.className)}
                    >
                      {col.cell
                        ? col.cell(row)
                        : col.accessor
                        ? String((row as any)[col.accessor])
                        : null}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center text-sm font-medium text-muted-foreground"
                >
                  {emptyMessage}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      
      {pagination && (
        <div className="flex items-center justify-between border-t border-[#EEF2F7] px-6 py-4 bg-white">
          <div className="text-[13px] font-medium text-muted-foreground">
            Showing 1–{data.length} of {data.length} {entityName}
          </div>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1.5 text-[13px] font-semibold text-muted-foreground hover:text-[#0F172A] hover:bg-black/5 rounded-full transition-colors disabled:opacity-50">
              Previous
            </button>
            <button className="h-8 w-8 flex items-center justify-center text-[13px] font-bold text-white bg-[#0F62FE] rounded-full transition-colors shadow-sm">
              1
            </button>
            <button className="h-8 w-8 flex items-center justify-center text-[13px] font-semibold text-muted-foreground hover:text-[#0F172A] hover:bg-black/5 rounded-full transition-colors">
              2
            </button>
            <button className="h-8 w-8 flex items-center justify-center text-[13px] font-semibold text-muted-foreground hover:text-[#0F172A] hover:bg-black/5 rounded-full transition-colors">
              3
            </button>
            <button className="px-3 py-1.5 text-[13px] font-semibold text-muted-foreground hover:text-[#0F172A] hover:bg-black/5 rounded-full transition-colors">
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
