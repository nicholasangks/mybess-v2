interface TableRowProps {
    children: React.ReactNode;
    className?: string;
}

export default function TableRow({ children, className }: TableRowProps) {
    return (
        <tr className={`odd:bg-color-primary dark:odd:bg-color-primary-dark${className ? ' ' + className : ''}`}>
            {children}
        </tr>
    )
}