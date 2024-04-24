interface ContainerProps {
    children: React.ReactNode;
    className?: string;
}

export default function Container({ children, className }: ContainerProps) {
    return (
        <div className={`px-32 py-10${className ? ' ' + className : ''}`}>
            {children}
        </div>
    )
}