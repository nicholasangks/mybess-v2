interface DataCellProps {
    children: React.ReactNode;
    withBgColor?: boolean;
    className?: string;
}

export default function DataCell({ children, withBgColor, className }: DataCellProps) {
    return (
        <div className={`flex items-center h-6 px-1${withBgColor ? ' bg-muted' : ''}${className ? ' ' + className : ''}`}>
            {children}
        </div>
    )
}