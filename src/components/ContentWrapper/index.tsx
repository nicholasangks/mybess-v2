import SideMenu from "../SideMenu"

interface ContentWrapperProps {
    children: React.ReactNode
}

export default function ContentWrapper({ children }: ContentWrapperProps) {
    return (
        <div className="flex shrink-0 max-w-[1536px]">
            <SideMenu />
            <div className="grow w-[calc(100%-50px)] md:w-full px-4 md:px-6 xl:px-10 py-8 md:py-12">
                {children}
            </div>
        </div>
    )
}