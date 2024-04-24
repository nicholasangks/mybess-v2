
interface TableTheadProps {
    children: React.ReactNode;
}

export default function TableThead({ children }: TableTheadProps) {
    return (
        <thead className="font-[400]">
            {children}
        </thead>
    )
}