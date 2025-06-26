interface CardProps {
    children: React.ReactNode;
    className?: string;
    type?: string;
    onClick?: () => void;
}

export default function Card({ children, className, type, onClick }: CardProps) {
    return (
        <div
            className={`p-3.5 rounded-lg bg-secondary${type === "second" ? " border border-gray-300" : ""}${className ? ' ' + className : ''}`}
            onClick={onClick}
        >
            {children}
        </div>
    )
}