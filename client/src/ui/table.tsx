import {
	Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from '@/ui/shadcn/table';
import {
	ColumnDef, flexRender, getCoreRowModel, getPaginationRowModel, useReactTable
} from '@tanstack/react-table';
import { Button } from '@/ui/index';

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[],
	data: TData[]
}

export default function DataTable<TData, TValue>({ columns, data }: DataTableProps<TData, TValue>) {
	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel()
	});
	
	return (
		<div>
			<Table>
				<TableHeader>
					{table.getHeaderGroups().map((headerGroup) => (
						<TableRow
							key={headerGroup.id}
							className={'bg-gray-100'}
						>
							{headerGroup.headers.map((header) => (
								<TableHead key={header.id}>
									{header.isPlaceholder
										? null
										: flexRender(
											header.column.columnDef.header,
		                  header.getContext()
										)}
								</TableHead>
							))}
						</TableRow>
					))}
				</TableHeader>
				<TableBody>
					{table.getRowModel().rows.length ? (
						table.getRowModel().rows.map((row) => (
							<TableRow
								key={row.id}
								data-state={row.getIsSelected() && 'selected'}
							>
								{row.getVisibleCells().map((cell) => (
									<TableCell key={cell.id}>
										{flexRender(
		                  cell.column.columnDef.cell,
		                  cell.getContext(),
		                )}
									</TableCell>
								))}
							</TableRow>
						))
					) : (
						<TableRow>
		          <TableCell
		            colSpan={columns.length}
		            className={'h-24 text-center'}
		          >
		            No results found.
		          </TableCell>
		        </TableRow>
					)}
				</TableBody>
			</Table>
			<div className={'flex items-center justify-end space-x-2 py-2'}>
				<Button
					variant={'outline'}
					size={'sm'}
					onClick={() => table.previousPage()}
					disabled={!table.getCanPreviousPage()}
				>
					Previous
				</Button>
				<Button
					variant={'outline'}
					size={'sm'}
					onClick={() => table.nextPage()}
					disabled={!table.getCanNextPage()}
				>
					Next
				</Button>
			</div>
		</div>
	);
}