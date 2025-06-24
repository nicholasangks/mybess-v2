interface LabelProps {
    text: string;
    className?: string;
}

export default function Label({ text, className }: LabelProps) {
    return (
        <div className={`text-color-foreground-light dark:text-color-foreground-light-dark${className ? " " + className : ""}`}>
            {text}
        </div>
    )
}