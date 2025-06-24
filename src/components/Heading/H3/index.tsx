interface H3Props {
    text: string;
    className?: string;
}

export default function H3({ text, className }: H3Props) {
    return (
        <h3 className={`text-[1.1rem] ${className ? ' ' + className : ''}`}>{text}</h3>
    )
}