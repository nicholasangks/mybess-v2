interface CardProps {
    children: React.ReactNode;
    className?: string;
    type?: string;
    onClick?: () => void;
}

export default function Card({ children, className, type, onClick }: CardProps) {
    return (
        <div
            className={`p-3 bg-color-primary dark:bg-color-primary-dark${type === "second" ? " border border-gray-300" : " bg-color-primary"}${className ? ' ' + className : ''}`}
            onClick={onClick}
        >
            {children}
        </div>
    )
}