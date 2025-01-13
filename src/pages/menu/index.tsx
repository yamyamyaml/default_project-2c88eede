import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { supabase } from '@/supabase';
import { MdOutlineDashboard, MdOutlinePeople, MdOutlineArticle, MdOutlineLocalShipping, MdOutlineQueryStats, MdOutlineSettings, MdOutlineNotifications } from 'react-icons/md';

const Menu = () => {
  const router = useRouter();

  const menuItems = [
    { name: 'ダッシュボード', icon: MdOutlineDashboard, path: '/dashboard' },
    { name: '顧客管理', icon: MdOutlinePeople, path: '/customer/list' },
    { name: '契約管理', icon: MdOutlineArticle, path: '/contract/list' },
    { name: '発送管理', icon: MdOutlineLocalShipping, path: '/shipping/main' },
    { name: 'レポートとデータ出力', icon: MdOutlineQueryStats, path: '/report/output' },
    { name: '商品管理', icon: MdOutlineSettings, path: '/product/list' },
    { name: 'アラート機能', icon: MdOutlineNotifications, path: '/alert/list' },
  ];

  return (
    <div className="min-h-screen h-full bg-gray-100 flex">
      <div className="w-64 bg-white shadow-md">
        <div className="p-4 border-b">
          <h2 className="text-lg font-bold">システムメニュー</h2>
        </div>
        <ul>
          {menuItems.map((item) => (
            <li key={item.name} className="hover:bg-gray-200 p-4 cursor-pointer">
              <Link href={item.path} className="flex items-center">
                <item.icon className="mr-2" size={20} />
                <span>{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex-1 p-4">
        <h1 className="text-2xl font-bold mb-4">メニュー画面</h1>
        <p>各機能へのリンクボタンをクリックして、該当画面へ遷移する。</p>
      </div>
    </div>
  );
};

export default Menu;
