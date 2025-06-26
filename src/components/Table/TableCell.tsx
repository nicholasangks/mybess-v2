interface TableCellProps {
    children?: React.ReactNode;
    className?: string;
}

export default function TableCell({ children, className }: TableCellProps) {
    return (
        <td className={`h-8 my-2 px-2 py-1 border-2 border-background${className ? ' ' + className : ''}`}>
            {children}
        </td>
    )
}