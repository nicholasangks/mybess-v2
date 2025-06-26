interface IconWrapperProps {
    children: any;
}

export default function IconWrapper({ children }: IconWrapperProps) {
    return (
        <div className="relative flex items-center justify-center w-10 h-auto aspect-square rounded-lg mr-2 border border-border">
            {children}
            <div className="absolute w-[80%] h-auto aspect-square rounded-md bg-primary opacity-30"></div>
        </div>
    )
}