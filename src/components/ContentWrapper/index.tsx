'use client';

import { usePathname } from 'next/navigation';
import SideMenu from '../SideMenu';
import LastUpdateTime from "@/components/LastUpdateTime";
import H1 from '../Heading/H1';

interface ContentWrapperProps {
  title: string;
  children: React.ReactNode;
}

export default function ContentWrapper({ title, children }: ContentWrapperProps) {
  const pathname = usePathname();
  const isAuthPage = ['/login'].includes(pathname);

  // Return only children (or null) on auth pages
  if (isAuthPage) {
    return <>{children}</>; // Or return null if you truly want to skip this entirely
  }

  // Return full layout with SideMenu on other pages
  return (
    <div className="flex shrink-0 max-w-[1920px] 3xl:max-w-[1920px]">
      <SideMenu />
      <div className="grow w-[calc(100%-50px)] md:w-full md:py-8 px-4 md:px-6 xl:px-6 3xl:px-12 py-8">
        <div>
          <div className="md:flex md:justify-between mb-6">
            <H1 text={title} className="!mb-0" />
            <LastUpdateTime />
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}
