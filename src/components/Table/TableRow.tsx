interface TableRowProps {
    children: React.ReactNode;
    className?: string;
}

export default function TableRow({ children, className }: TableRowProps) {
    return (
        <tr className={`odd:bg-primary odd:bg-primary${className ? ' ' + className : ''}`}>
            {children}
        </tr>
    )
}