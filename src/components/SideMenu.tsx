import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Topbar from '@/components/Topbar';
import { HiOutlineHome, HiOutlineUser, HiOutlineDocumentText, HiOutlineCalendar, HiOutlineTruck, HiOutlineChartBar, HiOutlineCog, HiOutlineBell } from 'react-icons/hi';

const SideMenu = () => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { name: 'ホーム', icon: HiOutlineHome, path: '/' },
    { name: '顧客管理', icon: HiOutlineUser, path: '/customers' },
    { name: '契約管理', icon: HiOutlineDocumentText, path: '/contracts' },
    { name: '請求管理', icon: HiOutlineDocumentText, path: '/billing' },
    { name: '発行スケジュール管理', icon: HiOutlineCalendar, path: '/schedule' },
    { name: '発送管理', icon: HiOutlineTruck, path: '/shipping' },
    { name: 'レポートとデータ出力', icon: HiOutlineChartBar, path: '/reports' },
    { name: '商品管理', icon: HiOutlineCog, path: '/products' },
    { name: 'アラート機能', icon: HiOutlineBell, path: '/alerts' },
  ];

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="min-h-screen h-full flex">
      <aside className={`bg-gray-200 text-gray-800 w-64 fixed h-full transition-transform duration-300 ease-in-out transform ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
        <div className="p-6">
          <Topbar/>
        </div>
        <nav className="p-4">
          <ul>
            {menuItems.map((item) => (
              <li key={item.name} className={`mb-4 cursor-pointer hover:bg-gray-300 p-2 rounded-md flex items-center ${router.pathname === item.path ? 'bg-gray-300 font-bold' : ''}`}>
                <Link href={item.path} className="flex items-center">
                  <item.icon size={20} className="mr-2" />
                  <span>{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
      <main className="ml-0 md:ml-64 flex-grow p-6">
        {/* コンテンツ領域 */}
      </main>
      <button className="fixed bottom-4 right-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded md:hidden" onClick={handleMenuToggle}>
        {isMenuOpen ? '閉じる' : 'メニュー'}
      </button>
    </div>
  );
};

export default SideMenu;
