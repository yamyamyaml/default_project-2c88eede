import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { supabase } from '@/supabase';
import { BsFillFileEarmarkTextFill } from "react-icons/bs";
import { FaMoneyBillAlt } from "react-icons/fa";
import { RiHistoryLine } from "react-icons/ri";

const BillingMenu: React.FC = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen h-full bg-gray-100 flex">
      <aside className="w-64 bg-gray-800 text-white p-4">
        <div className="text-xl font-bold mb-4">請求管理</div>
        <ul>
          <li className="mb-2">
            <button onClick={() => router.push('/BillingList')} className="flex items-center text-white hover:bg-gray-700 px-4 py-2 rounded">
             <BsFillFileEarmarkTextFill className="mr-2 text-lg" />
              請求対象一覧
            </button>
          </li>
          <li className="mb-2">
            <button onClick={() => router.push('/UnpaidList')} className="flex items-center text-white hover:bg-gray-700 px-4 py-2 rounded">
              <FaMoneyBillAlt className="mr-2 text-lg" />
              未入金一覧
            </button>
          </li>
          <li className="mb-2">
            <button onClick={() => router.push('/BillingHistory')} className="flex items-center text-white hover:bg-gray-700 px-4 py-2 rounded">
              <RiHistoryLine className="mr-2 text-lg" />
              請求履歴一覧
            </button>
          </li>
        </ul>
      </aside>
      <main className="flex-1 p-4">
        <h1 className="text-3xl font-bold mb-4">請求担当者メニュー</h1>
      </main>
    </div>
  );
};

export default BillingMenu;
