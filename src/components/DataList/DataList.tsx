interface DataListProps {
    children: React.ReactNode;
    cols: number;
}


export default function DataList({ children, cols }: DataListProps) {
    return (
        <div className={`grid grid-cols-${cols} gap-0.5 my-1`}>
            {children}
        </div>
    )
}