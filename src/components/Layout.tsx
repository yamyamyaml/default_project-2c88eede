import { useState } from 'react';
import Topbar from '@/components/Topbar';
import { useRouter } from 'next/router'

const Layout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen h-full flex flex-col bg-gray-100">
      <Topbar toggleSidebar={toggleSidebar} />

      <main className="flex-1 p-4">
        {children}
      </main>
    </div>
  );
};

export default Layout;