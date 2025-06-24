interface H2Props {
    text: string;
    className?: string;
}

export default function H2({ text, className }: H2Props) {
    return (
        <h2 className={`mb-3 text-[1.1rem] ${className ? ' ' + className : ''}`}>{text}</h2>
    )
}