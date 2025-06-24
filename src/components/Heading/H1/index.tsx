interface H1Props {
    text: string;
    className?: string;
}

export default function H1({ text, className }: H1Props) {
    return (
        <h1 className={`mb-8 text-[1.3rem] font-normal${className ? ' ' + className : ''}`}>{text}</h1>
    )
}