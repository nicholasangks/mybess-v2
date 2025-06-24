'use client';

import { usePathname } from 'next/navigation';
import SideMenu from '../SideMenu';

interface ContentWrapperProps {
  children: React.ReactNode;
}

export default function ContentWrapper({ children }: ContentWrapperProps) {
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
        {children}
      </div>
    </div>
  );
}
