import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Topbar from '@/components/Topbar';
import { HiOutlineHome, HiOutlineUser, HiOutlineCog, HiOutlineDocumentReport, HiOutlineTruck, HiOutlineExclamationCircle } from 'react-icons/hi';
import { IoMdNotificationsOutline } from 'react-icons/io';

const Sidebar = () => {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const menuItems = [
    { name: 'ホーム', icon: HiOutlineHome, path: '/menu' },
    { name: '顧客管理', icon: HiOutlineUser, path: '/customers/list' },
    { name: '契約管理', icon: HiOutlineCog, path: '/contracts/list' },
    { name: '請求管理', icon: HiOutlineDocumentReport, path: '/billing/unpaid_list' },
    { name: '発行スケジュール管理', icon: IoMdNotificationsOutline, path: '/schedule/index' },
    { name: '発送管理', icon: HiOutlineTruck, path: '/shipping/index' },
    { name: 'レポートとデータ出力', icon: HiOutlineDocumentReport, path: '/report/index' },
    { name: '商品管理', icon: HiOutlineCog, path: '/products/list'},
    { name: 'アラート機能', icon: HiOutlineExclamationCircle, path: '/alerts/list' },
  ];

  return (
    <div className="min-h-screen h-full flex">
      {/* Sidebar */}
      <aside className={`${isSidebarOpen ? 'w-64' : 'w-20'} bg-gray-200  duration-300 h-full flex-shrink-0`}>
        <div className="px-4 py-6 flex flex-col h-full">
            <Topbar />
          <div className="mt-6 flex-grow">
            {menuItems.map((item) => (
              <Link href={item.path} key={item.name}>
                <a className={`flex items-center py-3 px-4 rounded hover:bg-gray-300 ${router.pathname === item.path ? 'bg-gray-300' : ''} text-gray-800`}>
                  <item.icon className="mr-3 text-xl" />
                  <span className={`${isSidebarOpen ? 'block' : 'hidden'} text-lg font-medium`}>{item.name}</span>
                </a>
              </Link>
            ))}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-100 overflow-y-auto">
        <div className="px-6 py-8">
          {/* Your content goes here */}
          {/* Example: */}
          <h1 className="text-2xl font-bold mb-4">ダッシュボード</h1>
          <p>コンテンツ...</p>
        </div>
      </main>
    </div>
  );
};

export default Sidebar;
