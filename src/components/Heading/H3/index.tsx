interface H3Props {
    text: string;
    className?: string;
}

export default function H1({ text, className }: H3Props) {
    return (
        <h3 className={`mb-3 font-medium${className ? ' ' + className : ''}`}>{text}</h3>
    )
}