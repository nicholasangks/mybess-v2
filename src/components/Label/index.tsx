interface LabelProps {
    text: string;
    className?: string;
}

export default function Label({ text, className }: LabelProps) {
    return (
        <div className={`text-muted-foreground${className ? " " + className : ""}`}>
            {text}
        </div>
    )
}