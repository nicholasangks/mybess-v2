interface TableCellProps {
    children?: React.ReactNode;
    className?: string;
}

export default function TableCell({ children, className }: TableCellProps) {
    return (
        <td className={`h-8 my-2 px-2 py-1 border-2 border-color-background dark:border-color-background-dark${className ? ' ' + className : ''}`}>
            {children}
        </td>
    )
}