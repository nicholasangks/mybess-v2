import SideMenu from "../SideMenu"

interface ContentWrapperProps {
    children: React.ReactNode
}

export default function ContentWrapper({ children }: ContentWrapperProps) {
    return (
        <div className="md:flex max-w-[1536px]">
            <SideMenu />
            <div className="grow px-4 md:px-6 xl:px-10 py-12">
                {children}
            </div>
        </div>
    )
}