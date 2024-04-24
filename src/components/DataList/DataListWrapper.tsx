interface DataListWrapperProps {
    children: React.ReactNode;
}

export default function DataListWrapper({ children }: DataListWrapperProps) {
    return (
        <div className="relative">
            {children}
        </div>
    )
}